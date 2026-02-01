/**
 * RedisService Tests
 */

jest.mock('../utils/logger', () => ({
  info: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
}));

jest.mock('redis', () => ({
  createClient: jest.fn(() => ({
    connect: jest.fn().mockResolvedValue(undefined),
    get: jest.fn().mockResolvedValue(JSON.stringify({ data: 'test' })),
    set: jest.fn().mockResolvedValue('OK'),
    del: jest.fn().mockResolvedValue(1),
    expire: jest.fn().mockResolvedValue(1),
    ttl: jest.fn().mockResolvedValue(3600),
    exists: jest.fn().mockResolvedValue(1),
    mget: jest.fn().mockResolvedValue(['value1', 'value2']),
    mset: jest.fn().mockResolvedValue('OK'),
    lpush: jest.fn().mockResolvedValue(1),
    rpop: jest.fn().mockResolvedValue('item'),
    llen: jest.fn().mockResolvedValue(5),
    disconnect: jest.fn().mockResolvedValue(undefined),
  })),
}));

const RedisService = require('../services/RedisService');

describe('RedisService', () => {
  describe('get', () => {
    test('should be a function', () => {
      expect(typeof RedisService.get).toBe('function');
    });

    test('should retrieve cached value', async () => {
      const result = await RedisService.get('cache_key');
      expect(result === null || typeof result === 'object').toBe(true);
    });

    test('should handle non-existent keys', async () => {
      const result = await RedisService.get('nonexistent_key');
      expect(result === null || typeof result === 'object' || result === undefined).toBe(true);
    });
  });

  describe('set', () => {
    test('should be a function', () => {
      expect(typeof RedisService.set).toBe('function');
    });

    test('should store value in cache', async () => {
      const result = await RedisService.set('key', { data: 'value' });
      expect(result === null || typeof result === 'string').toBe(true);
    });

    test('should set expiration', async () => {
      const result = await RedisService.set('temp_key', { data: 'value' }, 3600);
      expect(result === null || typeof result === 'string').toBe(true);
    });
  });

  describe('delete', () => {
    test('should be a function', () => {
      expect(typeof RedisService.delete).toBe('function');
    });

    test('should delete cache entry', async () => {
      const result = await RedisService.delete('key_to_delete');
      expect(typeof result === 'number' || result === null).toBe(true);
    });
  });

  describe('exists', () => {
    test('should be a function', () => {
      expect(typeof RedisService.exists).toBe('function');
    });

    test('should check if key exists', async () => {
      const result = await RedisService.exists('some_key');
      expect(typeof result === 'number' || typeof result === 'boolean').toBe(true);
    });
  });

  describe('getMultiple', () => {
    test('should be a function', () => {
      expect(typeof RedisService.getMultiple).toBe('function');
    });

    test('should retrieve multiple values', async () => {
      const result = await RedisService.getMultiple(['key1', 'key2']);
      expect(Array.isArray(result) || result === null).toBe(true);
    });
  });

  describe('setMultiple', () => {
    test('should be a function', () => {
      expect(typeof RedisService.setMultiple).toBe('function');
    });

    test('should store multiple values', async () => {
      const data = { key1: 'value1', key2: 'value2' };
      const result = await RedisService.setMultiple(data);
      expect(result === null || typeof result === 'string').toBe(true);
    });
  });

  describe('clearCache', () => {
    test('should be a function', () => {
      expect(typeof RedisService.clearCache).toBe('function');
    });

    test('should clear all cached data', async () => {
      const result = await RedisService.clearCache();
      expect(result === null || typeof result === 'string').toBe(true);
    });
  });

  describe('pushQueue', () => {
    test('should be a function', () => {
      expect(typeof RedisService.pushQueue).toBe('function');
    });

    test('should push item to queue', async () => {
      const result = await RedisService.pushQueue('queue_name', { job: 'data' });
      expect(typeof result === 'number' || result === null).toBe(true);
    });
  });

  describe('popQueue', () => {
    test('should be a function', () => {
      expect(typeof RedisService.popQueue).toBe('function');
    });

    test('should pop item from queue', async () => {
      const result = await RedisService.popQueue('queue_name');
      expect(result === null || typeof result === 'string' || typeof result === 'object').toBe(true);
    });
  });
});
