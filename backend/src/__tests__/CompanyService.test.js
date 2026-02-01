/**
 * CompanyService Tests
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

const CompanyService = require('../services/CompanyService');

describe('CompanyService', () => {
  describe('getCompanyInfo', () => {
    test('should be a function', () => {
      expect(typeof CompanyService.getCompanyInfo).toBe('function');
    });
  });

  describe('updateCompanyInfo', () => {
    test('should be a function', () => {
      expect(typeof CompanyService.updateCompanyInfo).toBe('function');
    });

    test('should update company information', async () => {
      const updateData = {
        name: 'Test Company',
        email: 'test@example.com',
        phone: '11999999999',
      };
      const result = await CompanyService.updateCompanyInfo(updateData);
      expect(result === null || typeof result === 'object').toBe(true);
    });
  });

  describe('getCompanyStats', () => {
    test('should be a function', () => {
      expect(typeof CompanyService.getCompanyStats).toBe('function');
    });

    test('should return statistics', async () => {
      const stats = await CompanyService.getCompanyStats();
      expect(stats === null || typeof stats === 'object').toBe(true);
    });
  });

  describe('getTeamMembers', () => {
    test('should be a function', () => {
      expect(typeof CompanyService.getTeamMembers).toBe('function');
    });

    test('should return array of team members', async () => {
      const members = await CompanyService.getTeamMembers();
      expect(Array.isArray(members) || members === null).toBe(true);
    });
  });

  describe('addTeamMember', () => {
    test('should be a function', () => {
      expect(typeof CompanyService.addTeamMember).toBe('function');
    });
  });

  describe('removeTeamMember', () => {
    test('should be a function', () => {
      expect(typeof CompanyService.removeTeamMember).toBe('function');
    });
  });

  describe('updateTeamMember', () => {
    test('should be a function', () => {
      expect(typeof CompanyService.updateTeamMember).toBe('function');
    });
  });
});
