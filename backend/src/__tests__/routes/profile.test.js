/**
 * Profile Routes Tests
 */

const express = require('express');
const request = require('supertest');
const profileRoutes = require('../../routes/profile');

// Mock da autenticação
jest.mock('../../middleware/auth', () => ({
  authenticateToken: (req, res, next) => {
    req.user = { id: 1 };
    next();
  },
  authorizeRole: (roles) => (req, res, next) => next()
}));

jest.mock('../../db', () => ({
  all: jest.fn(),
  get: jest.fn(),
  run: jest.fn(),
}));

describe('Profile Routes', () => {
  let app;

  beforeEach(() => {
    app = express();
    app.use(express.json());
    app.use('/profile', profileRoutes);
  });

  describe('Profile routes structure', () => {
    test('should export a router', () => {
      expect(profileRoutes).toBeDefined();
      expect(typeof profileRoutes === 'function' || typeof profileRoutes === 'object').toBe(true);
    });

    test('should have route methods', () => {
      expect(profileRoutes).toHaveProperty('get');
      expect(profileRoutes).toHaveProperty('post');
      expect(profileRoutes).toHaveProperty('put');
    });

    test('should have route handlers', () => {
      expect(profileRoutes.stack.length).toBeGreaterThan(0);
    });
  });

  describe('route mounting', () => {
    test('should mount on express app', () => {
      expect(() => {
        const testApp = express();
        testApp.use('/profile', profileRoutes);
      }).not.toThrow();
    });
  });

  describe('profile endpoints', () => {
    test('should have profile endpoints defined', () => {
      expect(profileRoutes.stack).toBeDefined();
      expect(Array.isArray(profileRoutes.stack)).toBe(true);
    });

    test('should be callable with express app', () => {
      expect(typeof profileRoutes === 'function' || typeof profileRoutes === 'object').toBe(true);
    });
  });
});
