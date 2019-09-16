module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  testPathIgnorePatterns: ['node_modules', 'build'],
  moduleNameMapper: { '@ds/(.*)': '<rootDir>/src/datastructure/$1' },
}
