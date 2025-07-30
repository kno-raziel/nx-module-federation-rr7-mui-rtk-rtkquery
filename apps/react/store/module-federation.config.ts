import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'store',
  exposes: {
    './Hooks': './src/app/store/hooks.ts',
    './Store': './src/app/store/index.ts',
    './WithAsyncSlice': './src/app/components/WithAsyncSlice.tsx',
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
