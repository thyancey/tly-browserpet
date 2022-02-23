// slightly evolving from create-react-app example
import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveInteractionStatus, ActiveStatEffect, PetInteractionDefinition } from '../../types';
import { RootState } from '../store';

export type UiSlice = {
  pingIdx: number,
  lastSaved: number,
  interactions: ActiveInteractionStatus[],
  statEffects: ActiveStatEffect[]
}

const initialState: UiSlice = {
  pingIdx: 0,
  lastSaved: -1,
  interactions: [],
  statEffects: []
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pingStore: (state: UiSlice) => {
      const nowTime = new Date().getTime();

      state.interactions = state.interactions.filter(interaction => interaction.endAt > nowTime);
      state.statEffects = state.statEffects.filter(statEffect => statEffect.endAt > nowTime).map(sE => ({
        ...sE,
        isActive: nowTime > sE.startAt
      }));
      state.pingIdx++;
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
      state.pingIdx++;
    },
  }
});

export const { pingStore, addInteractionEvent } = uiSlice.actions;

export const selectPingIdx = (state: RootState): number => {
  return state.ui.pingIdx;
};
export const selectLastSaved = (state: RootState): number => {
  return state.ui.lastSaved;
};

export const getActiveInteractions = (state: RootState): ActiveInteractionStatus[] => state.ui.interactions;
export const getActiveStatEffects = (state: RootState): ActiveStatEffect[] => state.ui.statEffects;

export const selectActiveInteractionStatus = createSelector(
  [getActiveInteractions],
  (activeInteractions:ActiveInteractionStatus[]) => activeInteractions
);
export const selectActiveStatEffects = createSelector(
  [getActiveStatEffects],
  (activeStatEffect:ActiveStatEffect[]) => activeStatEffect
);

export default uiSlice.reducer;
