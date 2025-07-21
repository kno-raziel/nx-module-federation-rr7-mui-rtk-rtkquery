import { configureStore, Store } from '@reduxjs/toolkit';
import { RootReducer, rootReducer } from './slices';
import { useDispatch, useSelector } from 'react-redux';
import { authSlice } from './slices/authSlice';

export const store = configureStore({
  reducer: rootReducer,
});

// Extend the Window interface to include store
declare global {
  interface Window {
    store2: Store<RootState>;
  }
}
// window.store2 = store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type LoginStore = Store<RootState>;

export const createStore = ({
  shellStore,
  shellRootReducer,
}: {
  shellStore?: LoginStore;
  shellRootReducer?: RootReducer;
}) => {
  if (shellRootReducer && shellStore) {
    console.log(
      'shellStore',
      shellStore.getState(),
      authSlice.getInitialState()
    );
    const test = authSlice.injectInto(shellRootReducer);
    shellStore.dispatch({ type: '' });
    console.log('shellStore after inject', test);
  }

  return shellStore || store;
};

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();
