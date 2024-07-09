import type {Config} from 'jest';

const config: Config = {
  verbose: true,
  testMatch: [ "**/?(*.)+(spec).[jt]s?(x)" ],
  coverageReporters: ['html'],
  moduleNameMapper: {
    "@services/(.*)": "<rootDir>/src/app/services/$1",
    "@guards/(.*)": "<rootDir>/src/app/guards/$1",
    "@models/(.*)": "<rootDir>/src/app/models/$1",
    "@modules/(.*)": "<rootDir>/src/app/modules/$1",
    "@utils/(.*)": "<rootDir>/src/app/utils/$1",
    "@env/(.*)": "<rootDir>/src/environments/$1",
    "@testing/(.*)": "<rootDir>/src/testing/$1",
  },
};

export default config;