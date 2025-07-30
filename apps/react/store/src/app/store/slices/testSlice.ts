import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';

// Define the test state interface
interface TestState {
  logged: boolean;
}

// Initial state
const initialState: TestState = {
  logged: false,
};

// Create the test slice with explicit typing
const testSlice = createSlice({
  name: 'test',
  initialState,
  reducers: {
    logIn: (state: TestState) => {
      state.logged = true;
    },
    logOut: (state: TestState) => {
      state.logged = false;
    },
  },
});

// Export the slice type for use in store configuration
export type TestSlice = typeof testSlice;

// Export actions
export const { logIn, logOut } = testSlice.actions;

// Selector
export const isUserLoggedIn = (state: RootState) => state?.test?.logged;

export default testSlice;

// Export the state type for use elsewhere
export type { TestState };
