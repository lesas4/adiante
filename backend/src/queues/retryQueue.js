const Queue = require('bull');
const logger = require('../utils/logger');

const isTest = process.env.NODE_ENV === 'test';
const redisUrl = process.env.REDIS_URL || 'redis://127.0.0.1:6379';

let retryQueue;

if (isTest) {
  // Mock queue for tests to avoid real Redis connections
  retryQueue = {
    on: () => {},
    process: () => {},
    add: async () => ({ id: `test-${Date.now()}` }),
    getJobCounts: async () => ({ active: 0, waiting: 0, completed: 0, failed: 0, delayed: 0 }),
    clean: async () => true,
    getJob: async () => null,
    close: async () => {},
  };
} else {
  // Queue for retrying failed operations (webhooks, notifications, reconcile)
  // Prefer object options to support modern Bull versions
  retryQueue = new Queue('retryQueue', { redis: { url: redisUrl } });

  retryQueue.on('error', (err) => {
    logger.error('RetryQueue error:', (err && err.stack) || err);
  });
  retryQueue.on('failed', (job, err) => logger.warn(`Retry job failed ${job.id}: ${err && err.stack ? err.stack.split('\n')[0] : err}`));
  retryQueue.on('completed', (job) => logger.info(`Retry job completed ${job.id}`));

  retryQueue.process(async (job) => {
    const { type, payload } = job.data || {};
    logger.info(`Processing retry job ${job.id} type=${type}`);

    // Lazy-require services to avoid circular deps at bootstrap
    const RetryQueueService = require('../services/RetryQueueService');

    switch (type) {
      case 'processWebhook':
        return RetryQueueService.retryProcessWebhook(payload);
      case 'sendNotification':
        return RetryQueueService.retrySendNotification(payload);
      case 'reconcilePayment':
        return RetryQueueService.retryReconcilePayment(payload);
      default:
        throw new Error(`Unknown retry job type: ${type}`);
    }
  });
}

module.exports = retryQueue;
