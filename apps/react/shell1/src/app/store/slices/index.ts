import { combineSlices } from '@reduxjs/toolkit';
import testSlice from './testSlice';

// eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
export interface LazyLoadedSlices {}

export const rootReducer = combineSlices({
  test: testSlice,
}).withLazyLoadedSlices<LazyLoadedSlices>();
