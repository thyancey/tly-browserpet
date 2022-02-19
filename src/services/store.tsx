import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
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

// export type LocalStorageState = {
//   config: any,
//   pets: any[]
// }
// export const defaultLocalStorageState: LocalStorageState = {
//   config:{},
//   pets:[]
// }

export const defaultLocalStorageState: string = '';