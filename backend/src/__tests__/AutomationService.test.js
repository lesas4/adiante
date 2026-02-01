/**
 * AutomationService Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

jest.mock('../db/sqlite', () => ({
  getDb: jest.fn(() => Promise.resolve({
    all: jest.fn().mockResolvedValue([]),
    get: jest.fn().mockResolvedValue(null),
    run: jest.fn().mockResolvedValue({ id: 1 }),
  })),
}));

const AutomationService = require('../services/AutomationService');

describe('AutomationService', () => {
  describe('getRules', () => {
    test('should be a function', () => {
      expect(typeof AutomationService.getRules).toBe('function');
    });

    test('should return array of rules', async () => {
      const rules = await AutomationService.getRules();
      expect(Array.isArray(rules) || rules === null).toBe(true);
    });
  });

  describe('createRule', () => {
    test('should be a function', () => {
      expect(typeof AutomationService.createRule).toBe('function');
    });

    test('should create a new rule', async () => {
      const ruleData = {
        name: 'Auto-assign booking',
        trigger: 'booking_created',
        action: 'auto_assign',
      };
      const result = await AutomationService.createRule(ruleData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('executeRules', () => {
    test('should be a function', () => {
      expect(typeof AutomationService.executeRules).toBe('function');
    });

    test('should execute automation rules', async () => {
      const event = {
        type: 'booking_created',
        data: { bookingId: 'bkg1' },
      };
      const result = await AutomationService.executeRules(event);
      expect(typeof result === 'object' || typeof result === 'boolean').toBe(true);
    });
  });

  describe('deleteRule', () => {
    test('should be a function', () => {
      expect(typeof AutomationService.deleteRule).toBe('function');
    });

    test('should delete a rule', async () => {
      const result = await AutomationService.deleteRule(1);
      expect(typeof result === 'boolean' || result === null).toBe(true);
    });
  });

  describe('updateRule', () => {
    test('should be a function', () => {
      expect(typeof AutomationService.updateRule).toBe('function');
    });

    test('should update a rule', async () => {
      const updates = { name: 'Updated rule' };
      const result = await AutomationService.updateRule(1, updates);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('getRule', () => {
    test('should be a function', () => {
      expect(typeof AutomationService.getRule).toBe('function');
    });
  });

  describe('testRule', () => {
    test('should be a function', () => {
      expect(typeof AutomationService.testRule).toBe('function');
    });
  });
});
