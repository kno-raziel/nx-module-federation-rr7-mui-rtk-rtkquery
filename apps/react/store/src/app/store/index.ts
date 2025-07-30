import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './slices';

const setupStore = (preloadedState?: Partial<RootState>) =>
  configureStore({
    reducer: rootReducer,
    preloadedState: preloadedState,
  });

export type RootState = ReturnType<typeof rootReducer>;
export type Store = ReturnType<typeof setupStore>;
export type AppDispatch = Store['dispatch'];

export default setupStore;
