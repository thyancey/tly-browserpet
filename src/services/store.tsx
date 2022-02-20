import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { LocalStorageState } from '../types';
import petStoreReducer from './petstore';
import uiReducer from './ui';

export const store = configureStore({
  reducer: {
    petStore: petStoreReducer,
    ui: uiReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;

export const defaultLocalStorageState: LocalStorageState = {
  config:{},
  pets:[]
}
