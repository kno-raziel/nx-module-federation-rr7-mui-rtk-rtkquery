import { combineSlices, Middleware, Slice } from '@reduxjs/toolkit';
import { useMemo } from 'react';
import { storeManager } from '../store';
import { STATIC_SLICES } from '../store/slices';

/**
 * Type guard interface to detect API slices (created by RTK Query's createApi).
 * API slices have additional properties and methods that regular slices don't have,
 * particularly the middleware property needed for async operations.
 */
interface ApiSlice extends Slice {
  injectEndpoints: () => void;
  enhanceEndpoints: () => void;
  middleware: Middleware;
}

/**
 * Type guard function to check if a slice is an API slice (RTK Query).
 * This is used to determine if we need to register middleware for the slice.
 *
 * @param slice - The slice to check
 * @returns True if the slice is an API slice, false otherwise
 */
const ApiSliceGuard = (slice: Slice): slice is ApiSlice => {
  return (slice as ApiSlice).injectEndpoints !== undefined;
};

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
 * Storage for API slice middlewares that need to be registered with the store.
 * This map maintains middlewares from RTK Query API slices separately so they
 * can be added to the dynamic middleware manager when slices are injected.
 *
 * Key: slice reducerPath
 * Value: the middleware instance from the API slice
 */
const API_MIDDLEWARES = new Map<string, Middleware>();

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
 * This function handles both regular slices and API slices (RTK Query), ensuring
 * that middlewares are properly registered for API slices.
 *
 * @param slices - The slices to be added to the store
 * @returns Promise that resolves when the slices have been added
 */
const cacheAddAsyncSlice = async (slices: Slice[]) => {
  const store = storeManager.getStore();
  const dynamicMiddleware = storeManager.getDynamicMiddleware();
  const promiseCacheArray = [];

  for (const slice of slices) {
    promiseCacheArray.push(slice.reducerPath);

    // Check if this slice is already being added or has been added
    if (!ASYNC_SLICES.has(slice.reducerPath)) {
      // Store the slice in our async slices collection
      // This ensures it will be included in future root reducer recreations
      ASYNC_SLICES.set(slice.reducerPath, slice);

      // If this is an API slice (RTK Query), store its middleware separately
      // for registration with the dynamic middleware manager
      if (ApiSliceGuard(slice)) {
        API_MIDDLEWARES.set(slice.reducerPath, slice.middleware);
      }
    }
  }
  // Create a unique cache key from all slice reducer paths
  // This allows caching based on the combination of slices being added
  const promiseCacheKey = promiseCacheArray.length
    ? promiseCacheArray.join('|')
    : 'undefined';

  if (!PROMISE_CACHE.has(promiseCacheKey)) {
    // Create a new promise for adding this slice
    const promise = new Promise<void>((resolve) => {
      // Defer the store update to avoid updating during render
      setTimeout(() => {
        // Replace the store's reducer with a new one that includes
        // all static slices PLUS all async slices (including this new one)
        store.replaceReducer(createNewRootReducer());

        // Add all collected API middlewares to the dynamic middleware manager
        // This ensures RTK Query slices work properly with their async operations
        dynamicMiddleware.addMiddleware(...API_MIDDLEWARES.values());
        resolve();
      }, 0);
    });

    // Cache the promise to prevent duplicate additions
    PROMISE_CACHE.set(promiseCacheKey, promise);
  }

  // Return the cached promise (either new or existing)
  return PROMISE_CACHE.get(promiseCacheKey);
};

/**
 * A React hook that returns a promise for dynamically injecting Redux slices into the global store.
 *
 * This hook is useful in module federation scenarios where different microfrontends
 * need to register their own Redux slices at runtime. It handles both regular slices
 * and RTK Query API slices, ensuring proper middleware registration. The hook uses
 * the singleton store manager to access the global store instance, eliminating the
 * need for prop drilling.
 *
 * Key features:
 * - Prevents duplicate slice registrations through caching
 * - Handles RTK Query API slices with proper middleware setup
 * - Preserves all previously injected slices when adding new ones
 * - Uses React Suspense pattern with promises for better UX
 *
 * @param slices - The Redux Toolkit slices to be injected (supports both regular and API slices)
 * @returns Promise that resolves when the slices have been successfully added to the store
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const injectionPromise = useInjectAsyncReducer([mySlice, myApiSlice]);
 *
 *   // Use with React's use() hook for suspense
 *   use(injectionPromise);
 *
 *   return <div>Component content</div>;
 * }
 * ```
 */
const useInjectAsyncReducer = (slices: Slice[]) => {
  // Memoize the promise to prevent unnecessary re-executions
  // Only recreate if slice references change
  const promise = useMemo(() => cacheAddAsyncSlice(slices), [slices]);

  return promise;
};

export default useInjectAsyncReducer;
