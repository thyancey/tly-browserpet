// slightly evolving from create-react-app example
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ActiveInteractionStatus, PingPayload, SavedPetState } from '../../types';
import { RootState } from '../store';

export type UiSlice = {
  lastRendered: number,
  lastSaved: number,
  interactions: ActiveInteractionStatus[],
  savedPets: SavedPetState[]
}

const initialState: UiSlice = {
  lastRendered: new Date().getTime(),
  lastSaved: new Date().getTime(),
  interactions: [],
  savedPets: []
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pingStore: (state: UiSlice, action: PayloadAction<PingPayload>) => {
      const nowTime = action.payload.time;

      state.lastRendered = nowTime;
      if(action.payload.doSave){
        state.lastSaved = nowTime;

      }
    },
  }
});

export const { pingStore } = uiSlice.actions;

export const selectLastRendered = (state: RootState): number => state.ui.lastRendered;
export const selectLastSaved = (state: RootState): number => state.ui.lastSaved;

export default uiSlice.reducer;
