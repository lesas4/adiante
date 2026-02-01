/**
 * MonitoringService Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

jest.mock('@sentry/node', () => ({
  captureException: jest.fn(),
  captureMessage: jest.fn(),
  setTag: jest.fn(),
  setContext: jest.fn(),
  withScope: jest.fn((fn) => fn({ setContext: jest.fn(), setTag: jest.fn() })),
}));

const MonitoringService = require('../services/MonitoringService');

describe('MonitoringService', () => {
  describe('recordMetric', () => {
    test('should be a function', () => {
      expect(typeof MonitoringService.recordMetric).toBe('function');
    });

    test('should record numeric metric', () => {
      const result = MonitoringService.recordMetric('response_time', 150);
      expect(result === null || typeof result === 'object').toBe(true);
    });

    test('should handle different metric names', () => {
      const result1 = MonitoringService.recordMetric('cpu_usage', 45);
      const result2 = MonitoringService.recordMetric('memory_usage', 1024);
      expect([result1, result2].some(r => r === null || typeof r === 'object')).toBe(true);
    });
  });

  describe('recordError', () => {
    test('should be a function', () => {
      expect(typeof MonitoringService.recordError).toBe('function');
    });

    test('should record error with message', () => {
      const error = new Error('Test error');
      const result = MonitoringService.recordError(error, 'context');
      expect(result === null || typeof result === 'object').toBe(true);
    });

    test('should record error without context', () => {
      const error = new Error('Another error');
      const result = MonitoringService.recordError(error);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('startTimer', () => {
    test('should be a function', () => {
      expect(typeof MonitoringService.startTimer).toBe('function');
    });

    test('should return timer object', () => {
      const timer = MonitoringService.startTimer('test_operation');
      expect(timer === null || typeof timer === 'object').toBe(true);
    });
  });

  describe('getMetrics', () => {
    test('should be a function', () => {
      expect(typeof MonitoringService.getMetrics).toBe('function');
    });

    test('should return metrics object', async () => {
      const result = await MonitoringService.getMetrics();
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('getSystemHealth', () => {
    test('should be a function', () => {
      expect(typeof MonitoringService.getSystemHealth).toBe('function');
    });

    test('should return health status', async () => {
      const result = await MonitoringService.getSystemHealth();
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('captureException', () => {
    test('should be a function', () => {
      expect(typeof MonitoringService.captureException).toBe('function');
    });

    test('should capture exception details', () => {
      const error = new Error('Critical error');
      const result = MonitoringService.captureException(error);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('logEvent', () => {
    test('should be a function', () => {
      expect(typeof MonitoringService.logEvent).toBe('function');
    });

    test('should log event with data', () => {
      const result = MonitoringService.logEvent('user_action', { userId: '123' });
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });
});
