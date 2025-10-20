module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@testing-library|@reduxjs|immer|react-redux)/)',
  ],
  setupFilesAfterEnv: ['<rootDir>/jest.setup.js'],
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  testEnvironment: 'node',
  transform: {
    '^.+\\.(js|jsx|ts|tsx)$': 'babel-jest',
  },
};
