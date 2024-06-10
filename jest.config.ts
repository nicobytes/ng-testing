import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testMatch: [ "**/?(*.)+(spec).[jt]s?(x)" ]
};

export default config;