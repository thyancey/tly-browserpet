import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import petStoreReducer from './petstore/petstore-slice';

export const store = configureStore({
  reducer: {
    petStore: petStoreReducer
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
