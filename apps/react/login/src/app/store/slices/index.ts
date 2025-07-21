import { combineSlices } from '@reduxjs/toolkit';

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
export interface LazyLoadedSlices {}

export const rootReducer = combineSlices(
  {}
).withLazyLoadedSlices<LazyLoadedSlices>();

export type RootReducer = typeof rootReducer;
