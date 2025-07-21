import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'login',
  exposes: {
    './Module': './src/remote-entry.ts',
    './ProtectedRoutes': './src/app/components/ProtectedRoutes.tsx',
  },
  remotes: [],
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
