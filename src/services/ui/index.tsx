// slightly evolving from create-react-app example
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveInteractionStatus, PetInteractionDefinition, PingPayload } from '../../types';
import { RootState } from '../store';

export type UiSlice = {
  lastRendered: number,
  lastSaved: number,
  interactions: ActiveInteractionStatus[]
}

const initialState: UiSlice = {
  lastRendered: 0,
  lastSaved: 0,
  interactions: []
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pingStore: (state: UiSlice, action: PayloadAction<PingPayload>) => {
      const nowTime = action.payload.time;

      state.lastRendered = nowTime;
      if(action.payload.doSave){
        state.interactions = state.interactions.filter(interaction => interaction.endAt > nowTime);
        state.lastSaved = nowTime;
      }
    },
    addInteractionEvent: (state: UiSlice, action: PayloadAction<any>) => {
      const nowTime = new Date().getTime();
      const intDefinition = action.payload as PetInteractionDefinition;
      
      // // these are added by a user interaction
      if(!state.interactions.find(iE => iE.id === intDefinition.id)){
        console.log('addInteraction', intDefinition)
        state.interactions.push({
          id: intDefinition.id,
          startAt: nowTime,
          endAt: nowTime + (intDefinition.cooldown || 0)
        });
      }

      // go on and do a save/rerender
      state.lastRendered = nowTime;
      state.lastSaved = nowTime;
    },
  }
});

export const { pingStore, addInteractionEvent } = uiSlice.actions;

export const selectLastRendered = (state: RootState): number => state.ui.lastRendered;
export const selectLastSaved = (state: RootState): number => state.ui.lastSaved;

export const getActiveInteractions = (state: RootState): ActiveInteractionStatus[] => state.ui.interactions;

export const selectActiveInteractionStatus = createSelector(
  [getActiveInteractions], 
  (activeInteractions:ActiveInteractionStatus[]) => activeInteractions
);

export default uiSlice.reducer;
