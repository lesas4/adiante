/**
 * Health Check Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

jest.mock('../db/sqlite', () => ({
  getDb: jest.fn(() => Promise.resolve({
    get: jest.fn().mockResolvedValue({ version: 'test' }),
  })),
}));

const healthCheck = require('../utils/health');

describe('Health Check', () => {
  describe('checkDatabase', () => {
    test('should be a function', () => {
      expect(typeof healthCheck.checkDatabase).toBe('function');
    });
  });

  describe('checkRedis', () => {
    test('should be a function', () => {
      expect(typeof healthCheck.checkRedis).toBe('function');
    });
  });

  describe('getHealth', () => {
    test('should be a function', () => {
      expect(typeof healthCheck.getHealth).toBe('function');
    });

    test('should return an object', async () => {
      const health = await healthCheck.getHealth();
      expect(typeof health).toBe('object');
    });
  });
});
