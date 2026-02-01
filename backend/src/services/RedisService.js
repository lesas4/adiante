/**
 * 🔴 RedisService - Gerenciador de Cache Redis
 * 
 * Responsabilidades:
 * - Conexão com Redis
 * - Cache de dados
 * - Sessões de usuário
 * - Rate limiting
 * - Invalidação de cache
 * 
 * @module services/RedisService
 */

const redis = require('redis');
const logger = require('../utils/logger');

class RedisService {
  constructor() {
    this.client = null;
    this.isConnected = false;
    this.defaultTTL = 3600; // 1 hora
  }

  /**
   * 🔌 Conecta ao Redis
   */
  async connect() {
    try {
      if (this.isConnected) return;

      const redisUrl = process.env.REDIS_URL || 'redis://localhost:6379';
      
      this.client = redis.createClient({
        url: redisUrl,
        socket: {
          reconnectStrategy: (retries) => {
            if (retries > 10) {
              logger.error('Redis: Máximo de tentativas atingido');
              return new Error('Redis reconnect limit reached');
            }
            return retries * 100;
          },
          connectTimeout: 10000,
        },
      });

      // Event listeners
      this.client.on('connect', () => {
        logger.info('🔴 Redis conectado com sucesso');
        this.isConnected = true;
      });

      this.client.on('error', (err) => {
        logger.error('Redis error:', err);
        this.isConnected = false;
      });

      this.client.on('reconnecting', () => {
        logger.warn('Redis reconectando...');
      });

      await this.client.connect();
      
      // Test connection
      await this.client.ping();
      logger.info('✅ Redis ping successful');
      
    } catch (error) {
      logger.error('❌ Erro ao conectar Redis:', error);
      throw error;
    }
  }

  /**
   * 🔌 Desconecta do Redis
   */
  async disconnect() {
    try {
      if (this.client) {
        await this.client.quit();
        this.isConnected = false;
        logger.info('Redis desconectado');
      }
    } catch (error) {
      logger.error('Erro ao desconectar Redis:', error);
    }
  }

  /**
   * 💾 Armazena valor com TTL
   */
  async set(key, value, ttl = this.defaultTTL) {
    try {
      if (!this.isConnected) throw new Error('Redis não está conectado');

      const serialized = JSON.stringify(value);
      await this.client.setEx(key, ttl, serialized);
      
      logger.debug(`Cache SET: ${key} (TTL: ${ttl}s)`);
      return true;
    } catch (error) {
      logger.error(`Erro ao setar cache ${key}:`, error);
      return false;
    }
  }

  /**
   * 🔍 Recupera valor do cache
   */
  async get(key) {
    try {
      if (!this.isConnected) throw new Error('Redis não está conectado');

      const value = await this.client.get(key);
      
      if (value === null) {
        logger.debug(`Cache MISS: ${key}`);
        return null;
      }

      logger.debug(`Cache HIT: ${key}`);
      return JSON.parse(value);
    } catch (error) {
      logger.error(`Erro ao recuperar cache ${key}:`, error);
      return null;
    }
  }

  /**
   * ❌ Deleta chave do cache
   */
  async delete(key) {
    try {
      if (!this.isConnected) throw new Error('Redis não está conectado');

      await this.client.del(key);
      logger.debug(`Cache DELETE: ${key}`);
      return true;
    } catch (error) {
      logger.error(`Erro ao deletar cache ${key}:`, error);
      return false;
    }
  }

  /**
   * 🗑️ Deleta múltiplas chaves com padrão
   */
  async deletePattern(pattern) {
    try {
      if (!this.isConnected) throw new Error('Redis não está conectado');

      const keys = await this.client.keys(pattern);
      if (keys.length > 0) {
        await this.client.del(keys);
        logger.debug(`Cache DELETE PATTERN: ${pattern} (${keys.length} chaves)`);
      }
      return keys.length;
    } catch (error) {
      logger.error(`Erro ao deletar padrão ${pattern}:`, error);
      return 0;
    }
  }

  /**
   * 🔄 Limpa todo o cache
   */
  async flush() {
    try {
      if (!this.isConnected) throw new Error('Redis não está conectado');

      await this.client.flushDb();
      logger.warn('Cache FLUSH: Banco de dados limpo completamente');
      return true;
    } catch (error) {
      logger.error('Erro ao limpar cache:', error);
      return false;
    }
  }

  /**
   * ⏱️ Incrementa contador
   */
  async increment(key, by = 1, ttl = this.defaultTTL) {
    try {
      if (!this.isConnected) throw new Error('Redis não está conectado');

      const exists = await this.client.exists(key);
      const value = await this.client.incrBy(key, by);

      if (!exists) {
        await this.client.expire(key, ttl);
      }

      logger.debug(`Cache INCREMENT: ${key} = ${value}`);
      return value;
    } catch (error) {
      logger.error(`Erro ao incrementar ${key}:`, error);
      return null;
    }
  }

  /**
   * 📋 Lista todas as chaves (use com cuidado em produção)
   */
  async keys(pattern = '*') {
    try {
      if (!this.isConnected) throw new Error('Redis não está conectado');

      return await this.client.keys(pattern);
    } catch (error) {
      logger.error('Erro ao listar chaves:', error);
      return [];
    }
  }

  /**
   * 📊 Retorna informações do Redis
   */
  async info() {
    try {
      if (!this.isConnected) return null;

      const info = await this.client.info();
      return {
        connected: this.isConnected,
        info: info,
      };
    } catch (error) {
      logger.error('Erro ao obter info do Redis:', error);
      return null;
    }
  }

  /**
   * 🔐 Armazena sessão de usuário
   */
  async setSession(sessionId, userData, ttl = 86400) { // 24h
    try {
      const key = `session:${sessionId}`;
      return await this.set(key, userData, ttl);
    } catch (error) {
      logger.error('Erro ao armazenar sessão:', error);
      return false;
    }
  }

  /**
   * 🔍 Recupera sessão de usuário
   */
  async getSession(sessionId) {
    try {
      const key = `session:${sessionId}`;
      return await this.get(key);
    } catch (error) {
      logger.error('Erro ao recuperar sessão:', error);
      return null;
    }
  }

  /**
   * ❌ Remove sessão de usuário
   */
  async deleteSession(sessionId) {
    try {
      const key = `session:${sessionId}`;
      return await this.delete(key);
    } catch (error) {
      logger.error('Erro ao deletar sessão:', error);
      return false;
    }
  }

  /**
   * ⏱️ Rate limiting
   */
  async checkRateLimit(identifier, limit = 100, windowSeconds = 60) {
    try {
      const key = `ratelimit:${identifier}`;
      const count = await this.increment(key);

      if (count === 1) {
        await this.client.expire(key, windowSeconds);
      }

      return count <= limit;
    } catch (error) {
      logger.error('Erro ao verificar rate limit:', error);
      return true; // Falha aberta para não quebrar a aplicação
    }
  }

  /**
   * 🏥 Health check
   */
  async healthCheck() {
    try {
      if (!this.isConnected) return { status: 'disconnected' };

      await this.client.ping();
      return { status: 'healthy' };
    } catch (error) {
      return { status: 'unhealthy', error: error.message };
    }
  }
}

// Singleton instance
const redisService = new RedisService();

module.exports = redisService;
