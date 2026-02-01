/**
 * Booking Service Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

jest.mock('../db/sqlite', () => ({
  getDb: jest.fn(() => Promise.resolve({
    all: jest.fn(),
    get: jest.fn(),
    run: jest.fn(),
  })),
}));

const BookingService = require('../services/BookingService');

describe('BookingService', () => {
  describe('findByUserId', () => {
    test('should be a function', () => {
      expect(typeof BookingService.findByUserId).toBe('function');
    });
  });

  describe('updateStatus', () => {
    test('should be a function', () => {
      expect(typeof BookingService.updateStatus).toBe('function');
    });
  });

  describe('createBooking', () => {
    test('should be a function', () => {
      expect(typeof BookingService.createBooking).toBe('function');
    });
  });

  describe('getDefaultCancellationPolicy', () => {
    test('should be a function', () => {
      expect(typeof BookingService.getDefaultCancellationPolicy).toBe('function');
    });

    test('should return an object with cancellation policy', () => {
      const policy = BookingService.getDefaultCancellationPolicy();
      expect(typeof policy).toBe('object');
    });
  });

  describe('validateBookingData', () => {
    test('should be a function', () => {
      expect(typeof BookingService.validateBookingData).toBe('function');
    });

    test('should throw when missing userId', () => {
      expect(() => BookingService.validateBookingData({})).toThrow('userId é obrigatório');
    });

    test('should throw when missing serviceId', () => {
      expect(() => BookingService.validateBookingData({ userId: 'user123' })).toThrow('serviceId é obrigatório');
    });
  });

  describe('calculatePrice', () => {
    test('should be a function', () => {
      expect(typeof BookingService.calculatePrice).toBe('function');
    });

    test('should return a number', () => {
      const price = BookingService.calculatePrice(
        [{ basePrice: 100 }],
        10, // metragem
        1, // hours
        'standard'
      );
      expect(typeof price).toBe('number');
      expect(price).toBeGreaterThan(0);
    });
  });

  describe('calculateCancellationPenalty', () => {
    test('should be a function', () => {
      expect(typeof BookingService.calculateCancellationPenalty).toBe('function');
    });

    test('should calculate penalty based on hours until booking', () => {
      const penalty = BookingService.calculateCancellationPenalty(100, 48);
      expect(typeof penalty).toBe('number');
      expect(penalty).toBeGreaterThanOrEqual(0);
    });
  });
});
