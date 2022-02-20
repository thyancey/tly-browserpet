// slightly evolving from create-react-app example
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../store';

export type UiSlice = {
  pingIdx: number,
  lastSaved: number,
}

const initialState: UiSlice = {
  pingIdx: 0,
  lastSaved: -1
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    pingStore: (state: UiSlice) => {
      state.pingIdx++;
    },
  }
});

export const { pingStore } = uiSlice.actions;

export const selectPingIdx = (state: RootState): number => {
  return state.ui.pingIdx;
};
export const selectLastSaved = (state: RootState): number => {
  return state.ui.lastSaved;
};

export default uiSlice.reducer;
