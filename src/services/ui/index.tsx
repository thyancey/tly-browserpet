// slightly evolving from create-react-app example
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveInteractionStatus, ActiveStatEffect, PetInteractionDefinition, PingPayload } from '../../types';
import { RootState } from '../store';

export type UiSlice = {
  time: number,
  lastSaved: number,
  interactions: ActiveInteractionStatus[],
  statEffects: ActiveStatEffect[]
}

const initialState: UiSlice = {
  time: 0,
  lastSaved: 0,
  interactions: [],
  statEffects: []
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pingStore: (state: UiSlice, action: PayloadAction<PingPayload>) => {
      const nowTime = action.payload.time;

      state.interactions = state.interactions.filter(interaction => interaction.endAt > nowTime);
      state.statEffects = state.statEffects.filter(statEffect => statEffect.endAt > nowTime).map(sE => ({
        ...sE,
        isActive: nowTime > sE.startAt
      }));
      state.time = nowTime;
      if(action.payload.doSave){
        state.lastSaved = nowTime;
      }
    },
    addInteractionEvent: (state: UiSlice, action: PayloadAction<any>) => {
      
      console.log('addInteractionEvent', action.payload);
      const intDefinition = action.payload as PetInteractionDefinition;
      const nowTime = new Date().getTime();
      
      // these are added by a user interaction, but removed via the pinger 
      if(!state.interactions.find(iE => iE.id === intDefinition.id)){
        state.interactions.push({
          id: intDefinition.id,
          startAt: nowTime,
          endAt: nowTime + (intDefinition.cooldown || 0)
        });
        console.log('new interactions', {
          id: intDefinition.id,
          startAt: nowTime,
          endAt: nowTime + (intDefinition.cooldown || 0)
        })

        state.statEffects = [
          ...state.statEffects,
          ...intDefinition.statEffects.map(sE => ({
            from: intDefinition.id,
            statId: sE.statId,
            startDelayAt: nowTime,
            startAt: nowTime + (sE.delay || 0),
            endAt: nowTime + (sE.delay || 0) + (sE.duration || 0),
            perSecond: sE.perSecond,
            isActive: !!sE.delay ? false : true
          } as ActiveStatEffect))
        ];
      }
      state.time = nowTime;
    },
  }
});

export const { pingStore, addInteractionEvent } = uiSlice.actions;

export const selectTime = (state: RootState): number => state.ui.time;
export const selectLastSaved = (state: RootState): number => state.ui.lastSaved;

export const getActiveInteractions = (state: RootState): ActiveInteractionStatus[] => state.ui.interactions;
export const getActiveStatEffects = (state: RootState): ActiveStatEffect[] => state.ui.statEffects;

export const selectActiveInteractionStatus = createSelector(
  [getActiveInteractions],
  (activeInteractions:ActiveInteractionStatus[]) => activeInteractions
);
export const selectActiveStatEffects = createSelector(
  [getActiveStatEffects], (activeStatEffects:ActiveStatEffect[]) => activeStatEffects
);

export default uiSlice.reducer;
