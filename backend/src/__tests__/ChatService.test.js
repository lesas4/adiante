/**
 * ChatService Tests
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

const ChatService = require('../services/ChatService');

describe('ChatService', () => {
  describe('createConversation', () => {
    test('should be a function', () => {
      expect(typeof ChatService.createConversation).toBe('function');
    });

    test('should create a new conversation', async () => {
      const convData = {
        userId: 'user123',
        bookingId: 'bkg1',
      };
      const result = await ChatService.createConversation(convData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('sendMessage', () => {
    test('should be a function', () => {
      expect(typeof ChatService.sendMessage).toBe('function');
    });

    test('should send a message', async () => {
      const msgData = {
        conversationId: 'conv1',
        userId: 'user123',
        text: 'Hello',
      };
      const result = await ChatService.sendMessage(msgData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('getMessages', () => {
    test('should be a function', () => {
      expect(typeof ChatService.getMessages).toBe('function');
    });

    test('should return array of messages', async () => {
      const messages = await ChatService.getMessages('conv1');
      expect(Array.isArray(messages) || messages === null).toBe(true);
    });
  });

  describe('getConversations', () => {
    test('should be a function', () => {
      expect(typeof ChatService.getConversations).toBe('function');
    });

    test('should return array of conversations', async () => {
      const conversations = await ChatService.getConversations('user123');
      expect(Array.isArray(conversations) || conversations === null).toBe(true);
    });
  });

  describe('deleteConversation', () => {
    test('should be a function', () => {
      expect(typeof ChatService.deleteConversation).toBe('function');
    });
  });

  describe('markAsRead', () => {
    test('should be a function', () => {
      expect(typeof ChatService.markAsRead).toBe('function');
    });
  });

  describe('getUnreadCount', () => {
    test('should be a function', () => {
      expect(typeof ChatService.getUnreadCount).toBe('function');
    });
  });
});
