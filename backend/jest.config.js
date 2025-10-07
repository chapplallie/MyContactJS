module.exports = {
    preset: 'jest',
    testEnvironment: 'node',
    testMatch: ['**/__tests__/**/*.test.js'],
    setupFiles: ['dotenv/config'],
    testTimeout: 10000,
};