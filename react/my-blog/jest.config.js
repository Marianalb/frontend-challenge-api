module.exports = {
    moduleDirectories: [
      'node_modules'
    ],
    transform: {
      "\\.jsx?$": "babel-jest",
    },
    globals: {
      "ts-jest": {
        "tsConfig": '<rootDir>/tsconfig.json'
      }
    },
    transformIgnorePatterns: [
      "[/\\\\]node_modules[/\\\\](?!lodash-es/).+\\.js$"
    ],
    moduleNameMapper: {
      '\\.(css|less)$': '<rootDir>/mocks/styleMock.js',
    },
    testEnvironment: 'jsdom',
  }