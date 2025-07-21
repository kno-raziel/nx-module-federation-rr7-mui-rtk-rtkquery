import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { WithSlice } from '@reduxjs/toolkit';

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
export { testSlice };

declare module './index' {
  // WithSlice utility assumes reducer is under slice.reducerPath
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
  export interface LazyLoadedSlices extends WithSlice<TestSlice> {}
}

// Export actions
export const { logIn, logOut } = testSlice.actions;

// Selector
export const isUserLoggedIn = (state: RootState) => state?.test?.logged;

// Export reducer
export default testSlice.reducer;

// Export the state type for use elsewhere
export type { TestState };
