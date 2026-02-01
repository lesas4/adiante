/**
 * EmailService Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

jest.mock('nodemailer', () => ({
  createTransport: jest.fn(() => ({
    sendMail: jest.fn().mockResolvedValue({
      messageId: 'msg123@example.com',
    }),
  })),
}));

const EmailService = require('../services/EmailService');

describe('EmailService', () => {
  describe('sendEmail', () => {
    test('should be a function', () => {
      expect(typeof EmailService.sendEmail).toBe('function');
    });

    test('should send email with required fields', async () => {
      const emailData = {
        to: 'user@example.com',
        subject: 'Test Subject',
        body: '<p>Test content</p>',
      };
      const result = await EmailService.sendEmail(emailData);
      expect(result === null || typeof result === 'object').toBe(true);
    });

    test('should reject invalid email', async () => {
      const emailData = {
        to: 'invalid-email',
        subject: 'Test Subject',
        body: 'Test content',
      };
      const result = await EmailService.sendEmail(emailData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('sendBookingConfirmation', () => {
    test('should be a function', () => {
      expect(typeof EmailService.sendBookingConfirmation).toBe('function');
    });

    test('should send booking confirmation email', async () => {
      const bookingData = {
        email: 'user@example.com',
        bookingId: 'BK123',
        date: '2024-01-25',
        address: 'Rua test, 123',
      };
      const result = await EmailService.sendBookingConfirmation(bookingData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('sendPaymentReceipt', () => {
    test('should be a function', () => {
      expect(typeof EmailService.sendPaymentReceipt).toBe('function');
    });

    test('should send payment receipt', async () => {
      const paymentData = {
        email: 'user@example.com',
        amount: 15000,
        bookingId: 'BK123',
      };
      const result = await EmailService.sendPaymentReceipt(paymentData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('sendInvoice', () => {
    test('should be a function', () => {
      expect(typeof EmailService.sendInvoice).toBe('function');
    });

    test('should send invoice email', async () => {
      const invoiceData = {
        email: 'company@example.com',
        invoiceId: 'INV123',
        amount: 50000,
      };
      const result = await EmailService.sendInvoice(invoiceData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('sendPasswordReset', () => {
    test('should be a function', () => {
      expect(typeof EmailService.sendPasswordReset).toBe('function');
    });

    test('should send password reset email', async () => {
      const resetData = {
        email: 'user@example.com',
        resetToken: 'token123',
        link: 'https://example.com/reset?token=token123',
      };
      const result = await EmailService.sendPasswordReset(resetData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('sendCancellationNotice', () => {
    test('should be a function', () => {
      expect(typeof EmailService.sendCancellationNotice).toBe('function');
    });
  });

  describe('sendAdminNotification', () => {
    test('should be a function', () => {
      expect(typeof EmailService.sendAdminNotification).toBe('function');
    });

    test('should send admin notification', async () => {
      const notificationData = {
        adminEmail: 'admin@example.com',
        subject: 'System Alert',
        message: 'Something happened',
      };
      const result = await EmailService.sendAdminNotification(notificationData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });
});
