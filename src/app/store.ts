import { configureStore, ThunkAction, PayloadAction } from '@reduxjs/toolkit';
// import postListSliceReducer from '@features/postList/slice';
import { apiSlice } from '@app/api/apiSlice';

export const store = configureStore({
  reducer: {
    // postListSlice: postListSliceReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(apiSlice.middleware),
  devTools: process.env.NODE_ENV !== 'production',
});

export type RootState = ReturnType<typeof store.getState>;

export type AppAction<R> = ThunkAction<R, RootState, unknown, PayloadAction>;

export type Dispatch = typeof store.dispatch;
