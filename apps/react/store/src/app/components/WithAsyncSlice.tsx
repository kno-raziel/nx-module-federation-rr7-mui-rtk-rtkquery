import { Slice } from '@reduxjs/toolkit';
import { PropsWithChildren, use } from 'react';
import { Provider } from 'react-redux';
import useInjectAsyncReducer from '../hooks/useInjectAsyncReducer';
import { storeManager } from '../store';

// Provide the updated store to all child components
// Get the store from the singleton and provide it to all child components
const store = storeManager.getStore();

/**
 * Props for the WithAsyncSlice component
 */
interface WithAsyncSliceProps {
  /** The Redux Toolkit slice to be dynamically added to the store */
  slices: Slice[];
}

/**
 * A React component that dynamically adds Redux slices to the global store before rendering its children.
 *
 * This component is useful in module federation scenarios where different microfrontends
 * need to register their own Redux slices dynamically at runtime. It ensures that:
 * 1. The slices are added to the global store before the children components render
 * 2. The slices are only added once, even if the component re-renders
 * 3. The children have access to the updated store via React-Redux Provider
 *
 * No need to pass the store as a prop anymore - it uses the singleton instance!
 *
 * @param children - Child components that will have access to the updated store
 * @param slices - The Redux Toolkit slices to add to the store
 */
const WithAsyncSlice = ({
  children,
  slices,
}: PropsWithChildren<WithAsyncSliceProps>) => {
  // Use the hook to get a promise that resolves when the slices are injected
  // This leverages the shared caching mechanism to prevent duplicate registrations
  const promise = useInjectAsyncReducer(slices);

  // Use React's `use` hook to suspend rendering until the slices are added
  // This ensures the store is properly configured before children render
  use(promise);

  return <Provider store={store}>{children}</Provider>;
};

export default WithAsyncSlice;
