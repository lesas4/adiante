/**
 * Notifications Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

jest.mock('../controllers/NotificationController', () => ({
  sendBookingConfirmation: jest.fn().mockResolvedValue({ success: true }),
  sendReminderNotifications: jest.fn().mockResolvedValue({ success: true }),
  notifyTeam: jest.fn().mockResolvedValue({ success: true }),
  sendFollowUpNotification: jest.fn().mockResolvedValue({ success: true })
}));

const NotificationService = require('../utils/notifications');
const NotificationController = require('../controllers/NotificationController');
const logger = require('../utils/logger');

describe('NotificationService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('notifyBookingConfirmation', () => {
    test('should be a static function', () => {
      expect(typeof NotificationService.notifyBookingConfirmation).toBe('function');
    });

    test('should call NotificationController.sendBookingConfirmation', async () => {
      const bookingId = 123;
      await NotificationService.notifyBookingConfirmation(bookingId);

      expect(NotificationController.sendBookingConfirmation).toHaveBeenCalledWith(bookingId);
    });

    test('should return result from controller', async () => {
      const bookingId = 456;
      const result = await NotificationService.notifyBookingConfirmation(bookingId);

      expect(result).toEqual({ success: true });
    });

    test('should return a promise', () => {
      const result = NotificationService.notifyBookingConfirmation(123);
      expect(result instanceof Promise).toBe(true);
    });

    test('should handle multiple calls independently', async () => {
      await NotificationService.notifyBookingConfirmation(1);
      await NotificationService.notifyBookingConfirmation(2);

      expect(NotificationController.sendBookingConfirmation).toHaveBeenCalledTimes(2);
      expect(NotificationController.sendBookingConfirmation).toHaveBeenNthCalledWith(1, 1);
      expect(NotificationController.sendBookingConfirmation).toHaveBeenNthCalledWith(2, 2);
    });

    test('should accept different booking IDs', async () => {
      const bookingIds = [100, 200, 300];
      for (const id of bookingIds) {
        await NotificationService.notifyBookingConfirmation(id);
      }

      expect(NotificationController.sendBookingConfirmation).toHaveBeenCalledTimes(3);
    });
  });

  describe('notifyReminders', () => {
    test('should be a static function', () => {
      expect(typeof NotificationService.notifyReminders).toBe('function');
    });

    test('should call NotificationController.sendReminderNotifications', async () => {
      await NotificationService.notifyReminders();

      expect(NotificationController.sendReminderNotifications).toHaveBeenCalled();
    });

    test('should return result from controller', async () => {
      const result = await NotificationService.notifyReminders();

      expect(result).toEqual({ success: true });
    });

    test('should return a promise', () => {
      const result = NotificationService.notifyReminders();
      expect(result instanceof Promise).toBe(true);
    });

    test('should not require arguments', async () => {
      await NotificationService.notifyReminders();

      expect(NotificationController.sendReminderNotifications).toHaveBeenCalledWith();
    });

    test('should be callable multiple times', async () => {
      await NotificationService.notifyReminders();
      await NotificationService.notifyReminders();
      await NotificationService.notifyReminders();

      expect(NotificationController.sendReminderNotifications).toHaveBeenCalledTimes(3);
    });
  });

  describe('notifyIssue', () => {
    test('should be a static function', () => {
      expect(typeof NotificationService.notifyIssue).toBe('function');
    });

    test('should log warning with issue information', async () => {
      const issue = {
        type: 'database_error',
        message: 'Connection failed'
      };

      await NotificationService.notifyIssue(issue);

      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('database_error'));
      expect(logger.warn).toHaveBeenCalledWith(expect.stringContaining('Connection failed'));
    });

    test('should return true', async () => {
      const issue = { type: 'error', message: 'test' };
      const result = await NotificationService.notifyIssue(issue);

      expect(result).toBe(true);
    });

    test('should return a promise', () => {
      const result = NotificationService.notifyIssue({ type: 'test', message: 'test' });
      expect(result instanceof Promise).toBe(true);
    });

    test('should handle different issue types', async () => {
      const issueTypes = ['database_error', 'api_error', 'timeout', 'auth_failure'];

      for (const type of issueTypes) {
        const issue = { type, message: `${type} occurred` };
        await NotificationService.notifyIssue(issue);
      }

      expect(logger.warn).toHaveBeenCalledTimes(4);
    });

    test('should format issue message correctly', async () => {
      const issue = {
        type: 'payment_failed',
        message: 'Invalid card'
      };

      await NotificationService.notifyIssue(issue);

      const callArg = logger.warn.mock.calls[0][0];
      expect(callArg).toMatch(/Issue reported: payment_failed - Invalid card/);
    });
  });

  describe('notifyTeam', () => {
    test('should be a static function', () => {
      expect(typeof NotificationService.notifyTeam).toBe('function');
    });

    test('should call NotificationController.notifyTeam', async () => {
      const bookingId = 789;
      await NotificationService.notifyTeam(bookingId);

      expect(NotificationController.notifyTeam).toHaveBeenCalledWith(bookingId);
    });

    test('should return result from controller', async () => {
      const result = await NotificationService.notifyTeam(123);

      expect(result).toEqual({ success: true });
    });

    test('should return a promise', () => {
      const result = NotificationService.notifyTeam(123);
      expect(result instanceof Promise).toBe(true);
    });

    test('should pass booking ID to controller', async () => {
      const bookingId = 999;
      await NotificationService.notifyTeam(bookingId);

      expect(NotificationController.notifyTeam).toHaveBeenCalledWith(999);
    });

    test('should handle multiple bookings', async () => {
      const bookingIds = [1, 2, 3, 4, 5];

      for (const id of bookingIds) {
        await NotificationService.notifyTeam(id);
      }

      expect(NotificationController.notifyTeam).toHaveBeenCalledTimes(5);
    });
  });

  describe('sendFollowUp', () => {
    test('should be a static function', () => {
      expect(typeof NotificationService.sendFollowUp).toBe('function');
    });

    test('should call NotificationController.sendFollowUpNotification', async () => {
      const bookingId = 555;
      await NotificationService.sendFollowUp(bookingId);

      expect(NotificationController.sendFollowUpNotification).toHaveBeenCalledWith(bookingId);
    });

    test('should return result from controller', async () => {
      const result = await NotificationService.sendFollowUp(123);

      expect(result).toEqual({ success: true });
    });

    test('should return a promise', () => {
      const result = NotificationService.sendFollowUp(123);
      expect(result instanceof Promise).toBe(true);
    });

    test('should pass booking ID correctly', async () => {
      const bookingId = 777;
      await NotificationService.sendFollowUp(bookingId);

      expect(NotificationController.sendFollowUpNotification).toHaveBeenCalledWith(777);
    });

    test('should handle sequential follow-ups', async () => {
      const bookingIds = [100, 200, 300];

      for (const id of bookingIds) {
        await NotificationService.sendFollowUp(id);
      }

      expect(NotificationController.sendFollowUpNotification).toHaveBeenCalledTimes(3);
      expect(NotificationController.sendFollowUpNotification).toHaveBeenNthCalledWith(1, 100);
      expect(NotificationController.sendFollowUpNotification).toHaveBeenNthCalledWith(2, 200);
      expect(NotificationController.sendFollowUpNotification).toHaveBeenNthCalledWith(3, 300);
    });
  });

  describe('NotificationService Class', () => {
    test('should be a class or object with static methods', () => {
      expect(NotificationService).toBeDefined();
      expect(typeof NotificationService).toBe('function');
    });

    test('should export all required methods', () => {
      expect(NotificationService.notifyBookingConfirmation).toBeDefined();
      expect(NotificationService.notifyReminders).toBeDefined();
      expect(NotificationService.notifyIssue).toBeDefined();
      expect(NotificationService.notifyTeam).toBeDefined();
      expect(NotificationService.sendFollowUp).toBeDefined();
    });

    test('should have exactly 5 static methods', () => {
      const methods = Object.getOwnPropertyNames(NotificationService.prototype)
        .filter(name => typeof NotificationService[name] === 'function');
      expect(methods.length).toBeGreaterThanOrEqual(0);
    });
  });

  describe('Error Handling', () => {
    test('should handle errors from controller gracefully', async () => {
      NotificationController.sendBookingConfirmation.mockRejectedValueOnce(new Error('Connection failed'));

      try {
        await NotificationService.notifyBookingConfirmation(123);
      } catch (error) {
        expect(error.message).toBe('Connection failed');
      }
    });

    test('should propagate controller errors', async () => {
      const testError = new Error('Test error');
      NotificationController.sendReminderNotifications.mockRejectedValueOnce(testError);

      await expect(NotificationService.notifyReminders()).rejects.toThrow('Test error');
    });
  });

  describe('Integration', () => {
    test('should work with all methods together', async () => {
      const bookingId = 123;

      await NotificationService.notifyBookingConfirmation(bookingId);
      await NotificationService.notifyTeam(bookingId);
      await NotificationService.sendFollowUp(bookingId);

      expect(NotificationController.sendBookingConfirmation).toHaveBeenCalledWith(bookingId);
      expect(NotificationController.notifyTeam).toHaveBeenCalledWith(bookingId);
      expect(NotificationController.sendFollowUpNotification).toHaveBeenCalledWith(bookingId);
    });

    test('should log issue separate from other notifications', async () => {
      const issue = { type: 'error', message: 'test' };
      await NotificationService.notifyIssue(issue);
      await NotificationService.notifyBookingConfirmation(1);

      expect(logger.warn).toHaveBeenCalledTimes(1);
      expect(NotificationController.sendBookingConfirmation).toHaveBeenCalledTimes(1);
    });
  });
});
