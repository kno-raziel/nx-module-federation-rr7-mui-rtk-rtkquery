import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '..';
import { WithSlice } from '@reduxjs/toolkit';

// Define the auth state interface
interface AuthState {
  logged: boolean;
}

// Initial state
const initialState = () => {
  const token = localStorage.getItem('token');

  return {
    logged: Boolean(token),
  };
};

// Create the auth slice with explicit typing
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logIn: (state: AuthState) => {
      state.logged = true;
    },
    logOut: (state: AuthState) => {
      state.logged = false;
    },
  },
});

// Export the slice type for use in store configuration
export type AuthSlice = typeof authSlice;
export { authSlice };

declare module './index' {
  // WithSlice utility assumes reducer is under slice.reducerPath
  // eslint-disable-next-line @typescript-eslint/no-empty-interface, @typescript-eslint/no-empty-object-type
  export interface LazyLoadedSlices extends WithSlice<AuthSlice> {}
}

// Export actions
export const { logIn, logOut } = authSlice.actions;

// Selector
export const isUserLoggedIn = (state: RootState) => state?.auth?.logged;

// Export reducer
export default authSlice.reducer;

// Export the state type for use elsewhere
export type { AuthState };
