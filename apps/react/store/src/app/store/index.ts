import { rootReducer } from './slices';
import StoreManager from './StoreManager';

/**
 * Redux Store Module - Central Configuration for Module Federation
 *
 * This module provides the main store instance and type definitions for the
 * Redux store in a module federation environment. It uses a singleton pattern
 * to ensure a single global store instance is shared across all microfrontends.
 */

/**
 * Singleton store manager instance for global access.
 *
 * This provides a centralized way to access the Redux store across the entire
 * application and its federated modules. The singleton pattern ensures that:
 * - Only one store instance exists globally
 * - All microfrontends share the same store state
 * - Dynamic slice injection works consistently
 * - No prop drilling is needed for store access
 */
export const storeManager = StoreManager.getInstance();

/**
 * Root state type derived from the initial root reducer.
 * Use this type for typing selectors and state access throughout the application.
 *
 * Note: This represents the base state shape. Dynamically injected slices
 * will extend this type at runtime through the async slice injection mechanism.
 */
export type RootState = ReturnType<typeof rootReducer>;

/**
 * Store type derived from the store manager's getStore method.
 * Use this type when you need to reference the complete store instance.
 */
export type Store = ReturnType<typeof storeManager.getStore>;

/**
 * App dispatch type for strongly typed dispatch calls.
 * Use this type with useDispatch hook for proper TypeScript support:
 *
 * @example
 * ```tsx
 * import { useDispatch } from 'react-redux';
 * import type { AppDispatch } from './store';
 *
 * const dispatch = useDispatch<AppDispatch>();
 * ```
 */
export type AppDispatch = Store['dispatch'];
