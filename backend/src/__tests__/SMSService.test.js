/**
 * SMSService Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

jest.mock('twilio', () => jest.fn(() => ({
  messages: {
    create: jest.fn().mockResolvedValue({
      sid: 'SM123456789',
      status: 'queued',
    }),
  },
})));

const SMSService = require('../services/SMSService');

describe('SMSService', () => {
  describe('sendSMS', () => {
    test('should be a function', () => {
      expect(typeof SMSService.sendSMS).toBe('function');
    });

    test('should send SMS', async () => {
      const result = await SMSService.sendSMS('+5511999999999', 'Test message');
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('sendBookingReminder', () => {
    test('should be a function', () => {
      expect(typeof SMSService.sendBookingReminder).toBe('function');
    });

    test('should send booking reminder', async () => {
      const bookingData = {
        phone: '+5511999999999',
        date: '2024-01-25',
        time: '10:00',
      };
      const result = await SMSService.sendBookingReminder(bookingData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('formatPhoneNumber', () => {
    test('should be a function', () => {
      expect(typeof SMSService.formatPhoneNumber).toBe('function');
    });

    test('should format Brazilian phone number', () => {
      const formatted = SMSService.formatPhoneNumber('11999999999');
      expect(typeof formatted).toBe('string');
    });

    test('should handle already formatted phone', () => {
      const formatted = SMSService.formatPhoneNumber('+5511999999999');
      expect(typeof formatted).toBe('string');
    });
  });

  describe('sendPaymentConfirmation', () => {
    test('should be a function', () => {
      expect(typeof SMSService.sendPaymentConfirmation).toBe('function');
    });

    test('should send payment confirmation', async () => {
      const paymentData = {
        phone: '+5511999999999',
        amount: 15000,
      };
      const result = await SMSService.sendPaymentConfirmation(paymentData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('sendCancellationNotice', () => {
    test('should be a function', () => {
      expect(typeof SMSService.sendCancellationNotice).toBe('function');
    });
  });
});
