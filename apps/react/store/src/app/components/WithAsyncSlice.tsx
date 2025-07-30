import { Slice, Store } from '@reduxjs/toolkit';
import { PropsWithChildren, use } from 'react';
import { Provider } from 'react-redux';
import useInjectAsyncReducer from '../hooks/useInjectAsyncReducer';

/**
 * Props for the WithAsyncSlice component
 */
interface WithAsyncSliceProps {
  /** The Redux Toolkit slice to be dynamically added to the store */
  slice: Slice;
  /** The Redux store instance where the slice will be added */
  store: Store;
}

/**
 * A React component that dynamically adds a Redux slice to a store before rendering its children.
 *
 * This component is useful in module federation scenarios where different microfrontends
 * need to register their own Redux slices dynamically at runtime. It ensures that:
 * 1. The slice is added to the store before the children components render
 * 2. The slice is only added once, even if the component re-renders
 * 3. The children have access to the updated store via React-Redux Provider
 *
 * @param children - Child components that will have access to the updated store
 * @param slice - The Redux Toolkit slice to add to the store
 * @param store - The Redux store instance to modify
 */
const WithAsyncSlice = ({
  children,
  slice,
  store,
}: PropsWithChildren<WithAsyncSliceProps>) => {
  // Use the hook to get a promise that resolves when the slice is injected
  // This leverages the shared caching mechanism to prevent duplicate registrations
  // and provides a memoized promise that only changes when store or slice references change
  const promise = useInjectAsyncReducer(store, slice);

  // Use React's `use` hook to suspend rendering until the slice is added
  // This ensures the store is properly configured before children render
  use(promise);

  // Provide the updated store to all child components
  return <Provider store={store}>{children}</Provider>;
};

export default WithAsyncSlice;
