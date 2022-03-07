// slightly evolving from create-react-app example
import { createSlice } from '@reduxjs/toolkit';

export type UiSlice = {
}

const initialState: UiSlice = {
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
  }
});

export const { } = uiSlice.actions;

export default uiSlice.reducer;
