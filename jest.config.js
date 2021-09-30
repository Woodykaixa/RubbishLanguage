/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  roots: ['<rootDir>/src'],
  testRegex: 'src/(.+)\\.test\\.(js|ts)$',
  transform: {
    '^.+\\.ts$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  testEnvironment: 'node',
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
  },
};
