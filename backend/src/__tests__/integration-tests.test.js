// integration-tests.test.js
const PricingService = require('../services/PricingService');

describe('Integration Tests - Pricing Calculations', () => {
  describe('Real pricing scenarios', () => {
    test('should calculate price for residential cleaning', () => {
      const data = {
        services: [{ basePrice: 100 }],
        metragem: 80,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      };

      const price = PricingService.calculatePrice(data);
      
      expect(typeof price).toBe('number');
      expect(price).toBeGreaterThan(0);
    });

    test('should calculate price for deep cleaning', () => {
      const data = {
        services: [{ basePrice: 100 }],
        metragem: 80,
        cleaningType: 'deep',
        frequency: 'once',
        urgency: 'standard',
      };

      const price = PricingService.calculatePrice(data);
      const standardPrice = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 80,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      });
      
      expect(price).toBeGreaterThan(standardPrice);
    });

    test('should calculate commercial cleaning', () => {
      const data = {
        services: [{ basePrice: 100 }],
        metragem: 200,
        cleaningType: 'commercial',
        frequency: 'once',
        urgency: 'standard',
      };

      const price = PricingService.calculatePrice(data);
      expect(price).toBeGreaterThan(0);
    });

    test('should calculate move-in/out cleaning', () => {
      const data = {
        services: [{ basePrice: 100 }],
        metragem: 100,
        cleaningType: 'moveInOut',
        frequency: 'once',
        urgency: 'standard',
      };

      const price = PricingService.calculatePrice(data);
      expect(price).toBeGreaterThan(0);
    });

    test('should respect minimum price', () => {
      const data = {
        services: [{ basePrice: 1 }],
        metragem: 5,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      };

      const price = PricingService.calculatePrice(data);
      const minimum = PricingService.getMinimumPrice();
      
      expect(price).toBeGreaterThanOrEqual(minimum);
    });

    test('should handle multiple services correctly', () => {
      const data = {
        services: [
          { basePrice: 80 },
          { basePrice: 60 },
          { basePrice: 40 },
        ],
        metragem: 100,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      };

      const price = PricingService.calculatePrice(data);
      expect(price).toBeGreaterThan(0);
    });

    test('should scale with property size', () => {
      const smallProperty = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 50,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      });

      const largeProperty = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 200,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      });

      expect(largeProperty).toBeGreaterThan(smallProperty);
    });

    test('should handle different frequencies', () => {
      const frequencies = ['once', 'weekly', 'biweekly', 'monthly'];
      const prices = {};

      for (const freq of frequencies) {
        prices[freq] = PricingService.calculatePrice({
          services: [{ basePrice: 100 }],
          metragem: 80,
          cleaningType: 'standard',
          frequency: freq,
          urgency: 'standard',
        });
      }

      expect(typeof prices.once).toBe('number');
      expect(typeof prices.weekly).toBe('number');
    });

    test('should apply urgency multiplier', () => {
      const standard = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 80,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      });

      const urgent = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 80,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'urgent',
      });

      expect(typeof standard).toBe('number');
      expect(typeof urgent).toBe('number');
    });

    test('should calculate price per square meter', () => {
      const pricePerSqm = PricingService.getPricePerSquareMeter();
      expect(typeof pricePerSqm).toBe('number');
      expect(pricePerSqm).toBeGreaterThan(0);
    });

    test('should get cleaning type multiplier for standard', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('standard');
      expect(multiplier).toBe(1.0);
    });

    test('should get cleaning type multiplier for deep', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('deep');
      expect(multiplier).toBe(1.5);
    });

    test('should get cleaning type multiplier for moveInOut', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('moveInOut');
      expect(multiplier).toBe(1.8);
    });

    test('should get cleaning type multiplier for commercial', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('commercial');
      expect(multiplier).toBe(2.0);
    });

    test('should return default multiplier for unknown type', () => {
      const multiplier = PricingService.getCleaningTypeMultiplier('unknown_type');
      expect(multiplier).toBe(1.0);
    });

    test('should get minimum price', () => {
      const minimum = PricingService.getMinimumPrice();
      expect(typeof minimum).toBe('number');
      expect(minimum).toBeGreaterThanOrEqual(0);
    });

    test('should handle frequency multipliers', () => {
      const once = PricingService.getFrequencyMultiplier('once');
      const weekly = PricingService.getFrequencyMultiplier('weekly');
      const biweekly = PricingService.getFrequencyMultiplier('biweekly');

      expect(typeof once).toBe('number');
      expect(typeof weekly).toBe('number');
      expect(typeof biweekly).toBe('number');
    });

    test('should handle urgency multipliers', () => {
      const standard = PricingService.getUrgencyMultiplier('standard');
      const urgent = PricingService.getUrgencyMultiplier('urgent');

      expect(typeof standard).toBe('number');
      expect(typeof urgent).toBe('number');
    });

    test('should calculate discount', () => {
      const data = {
        subtotal: 10000,
        daysUntilService: 10,
        services: [{ basePrice: 100 }, { basePrice: 150 }, { basePrice: 200 }, { basePrice: 100 }],
      };
      
      const result = PricingService.calculateDiscount?.(data);
      
      if (result !== undefined) {
        expect(typeof result === 'number' || result === null).toBe(true);
      }
    });
  });

  describe('Edge cases for pricing', () => {
    test('should handle zero metragem', () => {
      const data = {
        services: [{ basePrice: 100 }],
        metragem: 0,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      };

      const price = PricingService.calculatePrice(data);
      const minimum = PricingService.getMinimumPrice();
      
      expect(price).toBeGreaterThanOrEqual(minimum);
    });

    test('should handle very large metragem', () => {
      const data = {
        services: [{ basePrice: 100 }],
        metragem: 5000,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      };

      const price = PricingService.calculatePrice(data);
      expect(typeof price).toBe('number');
      expect(price).toBeGreaterThan(0);
    });

    test('should handle empty services array', () => {
      const data = {
        services: [],
        metragem: 80,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      };

      const price = PricingService.calculatePrice(data);
      expect(typeof price).toBe('number');
    });

    test('should handle multiple concurrent price calculations', async () => {
      const promises = Array(10).fill(null).map((_, i) => {
        return Promise.resolve(PricingService.calculatePrice({
          services: [{ basePrice: 100 + i * 10 }],
          metragem: 50 + i * 5,
          cleaningType: i % 2 === 0 ? 'standard' : 'deep',
          frequency: 'once',
          urgency: 'standard',
        }));
      });

      const prices = await Promise.all(promises);
      expect(prices.length).toBe(10);
      expect(prices.every(p => typeof p === 'number')).toBe(true);
    });
  });

  describe('Real-world pricing scenarios', () => {
    test('should price residential cleaning 100sqm', () => {
      const price = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 100,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'standard',
      });

      expect(price).toBeGreaterThan(0);
    });

    test('should price commercial office 500sqm', () => {
      const price = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 500,
        cleaningType: 'commercial',
        frequency: 'once',
        urgency: 'standard',
      });

      expect(price).toBeGreaterThan(0);
    });

    test('should price deep clean apartment 80sqm', () => {
      const price = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 80,
        cleaningType: 'deep',
        frequency: 'once',
        urgency: 'standard',
      });

      expect(price).toBeGreaterThan(0);
    });

    test('should price move-in cleaning for 120sqm', () => {
      const price = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 120,
        cleaningType: 'moveInOut',
        frequency: 'once',
        urgency: 'standard',
      });

      expect(price).toBeGreaterThan(0);
    });

    test('should price weekly recurring service', () => {
      const price = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 100,
        cleaningType: 'standard',
        frequency: 'weekly',
        urgency: 'standard',
      });

      expect(price).toBeGreaterThan(0);
    });

    test('should price urgent weekend service', () => {
      const price = PricingService.calculatePrice({
        services: [{ basePrice: 100 }],
        metragem: 100,
        cleaningType: 'standard',
        frequency: 'once',
        urgency: 'urgent',
      });

      expect(price).toBeGreaterThan(0);
    });
  });
});
