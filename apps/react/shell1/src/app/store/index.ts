import { configureStore, Store } from '@reduxjs/toolkit';
import { rootReducer } from './slices';

export const store = configureStore({
  reducer: rootReducer,
});

// Extend the Window interface to include store
declare global {
  interface Window {
    store: Store<RootState>;
  }
}
window.store = store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

export type LoginStore = Store<RootState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
