import { configureStore, Store } from '@reduxjs/toolkit';
import { rootReducer } from './slices';
import { createDynamicMiddleware } from '@reduxjs/toolkit/react';
import { RootState } from './index';

class StoreManager {
  private static instance: StoreManager;
  private store: Store | null = null;
  private dynamicMiddleware = createDynamicMiddleware();

  private constructor() {
    // Private constructor to prevent direct instantiation
  }

  /**
   * Get the singleton instance of StoreManager
   */
  public static getInstance(): StoreManager {
    if (!StoreManager.instance) {
      StoreManager.instance = new StoreManager();
    }
    return StoreManager.instance;
  }

  /**
   * Initialize the store with optional preloaded state
   * Should be called once in the shell app
   */
  public initializeStore(preloadedState?: Partial<RootState>): Store {
    if (this.store) {
      console.warn('Store already initialized. Returning existing instance.');
      return this.store;
    }

    this.store = configureStore({
      reducer: rootReducer,
      preloadedState: preloadedState,
      middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().prepend(this.dynamicMiddleware.middleware),
    });

    return this.store;
  }

  /**
   * Get the current store instance
   * Throws error if store hasn't been initialized
   */
  public getStore(): Store {
    if (!this.store) {
      throw new Error(
        'Store not initialized. Call initializeStore() first in your shell app.'
      );
    }
    return this.store;
  }

  /**
   * Check if store has been initialized
   */
  public isInitialized(): boolean {
    return this.store !== null;
  }

  /**
   * Get the dynamic middleware instance
   * Useful for accessing middleware methods if needed
   */
  public getDynamicMiddleware() {
    return this.dynamicMiddleware;
  }

  /**
   * Reset the store instance (useful for testing)
   */
  public reset(): void {
    this.store = null;
    this.dynamicMiddleware = createDynamicMiddleware();
  }
}

export default StoreManager;
