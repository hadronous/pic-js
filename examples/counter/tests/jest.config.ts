import type { Config } from 'jest';

const config: Config = {
  verbose: true,
  detectOpenHandles: true,
  detectLeaks: true,
  watch: false,
  preset: 'ts-jest/presets/js-with-ts',
  testEnvironment: 'node',
};

export default config;
