import { combineSlices } from '@reduxjs/toolkit';
import testSlice from './testSlice';

export const STATIC_SLICES = [testSlice];

export const rootReducer = combineSlices(...STATIC_SLICES);
