import { combineSlices, Slice, Store } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { STATIC_SLICES } from '../store/slices';

/**
 * Cache to store promises for async slice additions.
 * This prevents duplicate slice registrations and ensures each slice
 * is only added to the store once, even if the component re-renders.
 *
 * Key: slice name
 * Value: Promise that resolves when the slice has been successfully added
 */
const PROMISE_CACHE = new Map<string, Promise<void>>();

/**
 * Storage for dynamically injected slices.
 * This map maintains all async slices that have been injected into the store,
 * ensuring that when replaceReducer is called, all previously injected slices
 * are preserved along with the new one.
 *
 * Key: slice name
 * Value: the actual Slice instance
 */
const ASYNC_SLICES = new Map<string, Slice>();

/**
 * Creates a new root reducer that combines all static and async slices.
 * This ensures that all previously injected async slices are preserved
 * when a new slice is added to the store.
 *
 * @returns Combined reducer that includes all static and async slices
 */
const createNewRootReducer = () => {
  return combineSlices(...ASYNC_SLICES.values(), ...STATIC_SLICES);
};

/**
 * Caches the async slice addition process to prevent duplicate registrations.
 *
 * @param store - The Redux store instance
 * @param slice - The slice to be added to the store
 * @returns Promise that resolves when the slice has been added
 */
const cacheAddAsyncSlice = async (store: Store, slice: Slice) => {
  // Use slice name as cache key to identify unique slices
  const cacheKey = `${slice.name}`;

  // Check if this slice is already being added or has been added
  if (!PROMISE_CACHE.has(cacheKey)) {
    // Store the slice in our async slices collection
    // This ensures it will be included in future root reducer recreations
    ASYNC_SLICES.set(cacheKey, slice);

    // Create a new promise for adding this slice
    const promise = new Promise<void>((resolve) => {
      // Replace the store's reducer with a new one that includes
      // all static slices PLUS all async slices (including this new one)
      store.replaceReducer(createNewRootReducer());
      resolve();
    });
    // Cache the promise to prevent duplicate additions
    PROMISE_CACHE.set(cacheKey, promise);
  }

  // Return the cached promise (either new or existing)
  return PROMISE_CACHE.get(cacheKey);
};

/**
 * A React hook that returns a promise for dynamically injecting a Redux slice into a store.
 *
 * This hook is useful in module federation scenarios where different microfrontends
 * need to register their own Redux slices at runtime. It provides a lower-level
 * alternative to the WithAsyncSlice component when you need more control over
 * when and how the slice injection occurs.
 *
 * @param store - The Redux store instance where the slice will be added
 * @param slice - The Redux Toolkit slice to be injected
 * @returns Promise that resolves when the slice has been successfully added to the store
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const injectionPromise = useInjectAsyncReducer(store, mySlice);
 *
 *   // Use with React's use() hook for suspense
 *   use(injectionPromise);
 *
 *   return <div>Component content</div>;
 * }
 * ```
 */
const useInjectAsyncReducer = (store: Store, slice: Slice) => {
  // Memoize the promise to prevent unnecessary re-executions
  // Only recreate if store or slice references change
  const promise = useMemo(
    () => cacheAddAsyncSlice(store, slice),
    [store, slice]
  );

  return promise;
};

export default useInjectAsyncReducer;
