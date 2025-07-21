import { ModuleFederationConfig } from '@nx/module-federation';

const config: ModuleFederationConfig = {
  name: 'theme',
  exposes: {
    './Module': './src/remote-entry.ts',
    './Theme': '../../../apps/libs/theme/src/index.ts',
  },
};

/**
 * Nx requires a default export of the config to allow correct resolution of the module federation graph.
 **/
export default config;
