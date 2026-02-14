/**
 * WebhookRetryService.js
 * Serviço de retry automático para webhooks e pagamentos
 * Usa Bull queue com exponential backoff
 */

const Queue = require('bull');
const logger = require('../utils/logger');

const QUEUE_NAME = 'webhook-retries';
const MAX_ATTEMPTS = 5;
const isTest = process.env.NODE_ENV === 'test';

// Configurar queue com Redis (mock em testes)
let retryQueue;
if (isTest) {
  retryQueue = {
    add: async () => ({ id: `test-${Date.now()}` }),
    on: () => {},
    process: () => {},
    getJob: async () => null,
    getJobCounts: async () => ({ active: 0, waiting: 0, completed: 0, failed: 0, delayed: 0 }),
    clean: async () => true,
    close: async () => {}
  };
} else {
  retryQueue = new Queue(QUEUE_NAME, {
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: process.env.REDIS_PORT || 6379
    },
    defaultJobOptions: {
      attempts: MAX_ATTEMPTS,
      backoff: {
        type: 'exponential',
        delay: 2000 // Começa com 2s, multiplica por 2 a cada tentativa
      },
      removeOnComplete: true,
      removeOnFail: false
    }
  });
}

class WebhookRetryService {
  /**
   * Adicionar webhook à fila de retry
   */
  static async addRetry(webhookData, options = {}) {
    try {
      const jobId = option.jobId || `webhook-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      
      const job = await retryQueue.add(
        {
          type: options.type || 'payment', // 'payment', 'notification', etc
          url: options.url,
          method: options.method || 'POST',
          body: webhookData,
          headers: options.headers || {},
          attempts: 0,
          lastError: null
        },
        {
          jobId,
          attempts: MAX_ATTEMPTS,
          backoff: {
            type: 'exponential',
            delay: 2000
          },
          removeOnComplete: true
        }
      );

      logger.info('Webhook adicionado à fila de retry', { jobId, type: options.type });
      return { success: true, jobId, job };
    } catch (error) {
      logger.error('Erro ao adicionar webhook à fila', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Processar job da fila
   */
  static async processJob(job) {
    const { type, url, method, body, headers } = job.data;
    const attempt = job.attemptsMade + 1;

    logger.debug(`Processando webhook [${type}] - tentativa ${attempt}/${MAX_ATTEMPTS}`, {
      jobId: job.id,
      url
    });

    try {
      // Implementar retry lógic
      const fetchFn = global.fetch || require('node-fetch');
      const response = await fetchFn(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
          ...headers
        },
        body: JSON.stringify(body),
        timeout: 10000 // 10 segundos
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      const result = await response.json();
      logger.info(`Webhook processado com sucesso [${type}]`, { jobId: job.id });
      
      return { success: true, result };
    } catch (error) {
      logger.warn(`Webhook falhou [${type}] - tentativa ${attempt}`, {
        jobId: job.id,
        error: error.message,
        isRetryable: attempt < MAX_ATTEMPTS
      });

      // Se ainda houver tentativas, relançar erro para triggerar retry
      if (attempt < MAX_ATTEMPTS) {
        throw error; // Bull vai retentar
      } else {
        // Última tentativa falhou - alertar admin
        await WebhookRetryService.notifyAdminFailure(type, job, error);
        throw error;
      }
    }
  }

  /**
   * Setup listeners da queue
   */
  static setupListeners() {
    if (isTest) return; // Não registrar listeners/processors em testes

    // Quando job completar
    retryQueue.on('completed', (job) => {
      logger.info(`Webhook finalizado com sucesso`, {
        jobId: job.id,
        tipo: job.data.type,
        tentativas: job.attemptsMade + 1
      });
    });

    // Quando job falhar após todas as tentativas
    retryQueue.on('failed', (job, err) => {
      logger.error(`Webhook falhou permanentemente`, {
        jobId: job.id,
        tipo: job.data.type,
        tentativas: job.attemptsMade,
        erro: err.message
      });
    });

    // Quando job estiver retrying
    retryQueue.on('stalled', (job) => {
      logger.warn(`Webhook travado, retentando`, { jobId: job.id });
    });

    // Setup processor
    retryQueue.process(this.processJob.bind(this));
  }

  /**
   * Notificar admin de falha permanente
   */
  static async notifyAdminFailure(webhookType, job, error) {
    try {
      const NotificationService = require('./NotificationService');
      await NotificationService.sendNotification({
        type: 'email',
        to: process.env.ADMIN_EMAIL,
        subject: `🚨 Webhook ${webhookType} Falhou Permanentemente`,
        template: 'webhook_failure',
        data: {
          webhookType,
          jobId: job.id,
          attempts: job.attemptsMade,
          error: error.message,
          url: job.data.url,
          timestamp: new Date().toLocaleString('pt-BR')
        }
      });
    } catch (err) {
      logger.error('Erro ao notificar admin de falha de webhook', err);
    }
  }

  /**
   * Obter status de um job
   */
  static async getJobStatus(jobId) {
    try {
      const job = await retryQueue.getJob(jobId);
      if (!job) {
        return { success: false, error: 'Job não encontrado' };
      }

      const status = await job.getState();
      const progress = job.progress();

      return {
        success: true,
        jobId: job.id,
        status,
        progress,
        attempts: job.attemptsMade,
        maxAttempts: MAX_ATTEMPTS,
        data: job.data,
        failedReason: job.failedReason
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Limpar queue (apenas para desenvolvimento)
   */
  static async clearQueue() {
    try {
      await retryQueue.clean(0);
      logger.info('Queue limpa');
      return { success: true };
    } catch (error) {
      logger.error('Erro ao limpar queue', error);
      return { success: false, error: error.message };
    }
  }

  /**
   * Obter estatísticas da queue
   */
  static async getQueueStats() {
    try {
      const counts = await retryQueue.getJobCounts();
      return {
        success: true,
        stats: counts
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  }

  /**
   * Shutdown gracioso da queue
   */
  static async shutdown() {
    try {
      await retryQueue.close();
      logger.info('Webhook retry queue fechada');
    } catch (error) {
      logger.error('Erro ao fechar webhook retry queue', error);
    }
  }
}

module.exports = WebhookRetryService;
