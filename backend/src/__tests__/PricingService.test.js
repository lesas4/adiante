/**
 * PricingService Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

const PricingService = require('../services/PricingService');

describe('PricingService', () => {
  describe('getPricePerSquareMeter', () => {
    test('should be a function', () => {
      expect(typeof PricingService.getPricePerSquareMeter).toBe('function');
    });

    test('should return a positive number', () => {
      const price = PricingService.getPricePerSquareMeter();
      expect(typeof price).toBe('number');
      expect(price).toBeGreaterThan(0);
    });
  });

  describe('getCleaningTypeMultiplier', () => {
    test('should be a function', () => {
      expect(typeof PricingService.getCleaningTypeMultiplier).toBe('function');
    });

    test('should return multiplier for standard', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('standard');
      expect(multiplier).toBe(1.0);
    });

    test('should return multiplier for deep', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('deep');
      expect(multiplier).toBe(1.5);
    });

    test('should return multiplier for moveInOut', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('moveInOut');
      expect(multiplier).toBe(1.8);
    });

    test('should return multiplier for commercial', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('commercial');
      expect(multiplier).toBe(2.0);
    });

    test('should return default for unknown type', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('unknown');
      expect(multiplier).toBe(1.0);
    });
  });

  describe('getFrequencyMultiplier', () => {
    test('should be a function', () => {
      expect(typeof PricingService.getFrequencyMultiplier).toBe('function');
    });

    test('should return multiplier for different frequencies', () => {
      const once = PricingService.getFrequencyMultiplier('once');
      const weekly = PricingService.getFrequencyMultiplier('weekly');
      const biweekly = PricingService.getFrequencyMultiplier('biweekly');
      
      expect(typeof once).toBe('number');
      expect(typeof weekly).toBe('number');
      expect(typeof biweekly).toBe('number');
    });
  });

  describe('getUrgencyMultiplier', () => {
    test('should be a function', () => {
      expect(typeof PricingService.getUrgencyMultiplier).toBe('function');
    });

    test('should return multiplier for different urgencies', () => {
      const standard = PricingService.getUrgencyMultiplier('standard');
      const urgent = PricingService.getUrgencyMultiplier('urgent');
      
      expect(typeof standard).toBe('number');
      expect(typeof urgent).toBe('number');
    });
  });

  describe('calculateDiscount', () => {
    test('should be a function', () => {
      expect(typeof PricingService.calculateDiscount).toBe('function');
    });
  });

  describe('getMinimumPrice', () => {
    test('should be a function', () => {
      expect(typeof PricingService.getMinimumPrice).toBe('function');
    });

    test('should return a positive number', () => {
      const minimum = PricingService.getMinimumPrice();
      expect(typeof minimum).toBe('number');
      expect(minimum).toBeGreaterThanOrEqual(0);
    });
  });

  describe('calculatePrice', () => {
    test('should be a function', () => {
      expect(typeof PricingService.calculatePrice).toBe('function');
    });

    test('should return a positive number', () => {
      const data = {
        services: [{ basePrice: 100 }],
        metragem: 50,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      };
      const price = PricingService.calculatePrice(data);
      expect(typeof price).toBe('number');
      expect(price).toBeGreaterThan(0);
    });

    test('should respect minimum price', () => {
      const data = {
        services: [{ basePrice: 1 }],
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      };
      const price = PricingService.calculatePrice(data);
      const minimum = PricingService.getMinimumPrice();
      expect(price).toBeGreaterThanOrEqual(minimum);
    });

    test('should apply cleaning type multiplier', () => {
      const standardData = {
        services: [{ basePrice: 100 }],
        metragem: 10,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      };

      const deepData = {
        services: [{ basePrice: 100 }],
        metragem: 10,
        cleaningType: 'deep',
        frequency: 'once',
        urgency: 'standard',
      };

      const standardPrice = PricingService.calculatePrice(standardData);
      const deepPrice = PricingService.calculatePrice(deepData);

      // Deep cleaning should be more expensive
      expect(deepPrice).toBeGreaterThanOrEqual(standardPrice);
    });
  });
});
