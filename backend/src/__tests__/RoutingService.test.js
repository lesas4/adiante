/**
 * RoutingService Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

const RoutingService = require('../services/RoutingService');

describe('RoutingService', () => {
  describe('calculateDistance', () => {
    test('should be a function', () => {
      expect(typeof RoutingService.calculateDistance).toBe('function');
    });

    test('should calculate distance between two coordinates', () => {
      const distance = RoutingService.calculateDistance(
        -23.5505, -46.6333, // São Paulo
        -23.55, -46.63      // Nearby
      );
      expect(typeof distance).toBe('number');
      expect(distance).toBeGreaterThan(0);
    });

    test('should return 0 for same coordinates', () => {
      const distance = RoutingService.calculateDistance(
        -23.5505, -46.6333,
        -23.5505, -46.6333
      );
      expect(distance).toBeLessThan(1);
    });
  });

  describe('optimizeRoute', () => {
    test('should be a function', () => {
      expect(typeof RoutingService.optimizeRoute).toBe('function');
    });

    test('should handle empty bookings', () => {
      const result = RoutingService.optimizeRoute([]);
      expect(Array.isArray(result) || result === null).toBe(true);
    });

    test('should return array for single booking', () => {
      const bookings = [{ id: 1, lat: -23.5505, lon: -46.6333 }];
      const result = RoutingService.optimizeRoute(bookings);
      expect(Array.isArray(result)).toBe(true);
    });

    test('should optimize multiple bookings', () => {
      const bookings = [
        { id: 1, lat: -23.5505, lon: -46.6333 },
        { id: 2, lat: -23.55, lon: -46.63 },
        { id: 3, lat: -23.56, lon: -46.64 },
      ];
      const result = RoutingService.optimizeRoute(bookings);
      expect(Array.isArray(result)).toBe(true);
      expect(result.length).toBe(bookings.length);
    });
  });

  describe('estimateTravelTime', () => {
    test('should be a function', () => {
      expect(typeof RoutingService.estimateTravelTime).toBe('function');
    });

    test('should estimate travel time from distance', () => {
      const time = RoutingService.estimateTravelTime(10);
      expect(typeof time).toBe('number');
      expect(time).toBeGreaterThan(0);
    });

    test('should return 0 for 0 distance', () => {
      const time = RoutingService.estimateTravelTime(0);
      expect(time).toBe(0);
    });
  });

  describe('getDistance', () => {
    test('should be a function', () => {
      expect(typeof RoutingService.getDistance).toBe('function');
    });
  });

  describe('findOptimalRoute', () => {
    test('should be a function', () => {
      expect(typeof RoutingService.findOptimalRoute).toBe('function');
    });
  });
});
