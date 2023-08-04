import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import msgReducer from './msgSlice';
export const store = configureStore({
  // all reducers
  reducer: {
    auth: authReducer,
    msg: msgReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
