import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  transform: {
    '\\.ts$': ['babel-jest', { configFile: './babel.config.testing.js' }],
  },
};

export default config;
