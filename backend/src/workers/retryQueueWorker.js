/**
 * Retry Queue Worker
 * Simple worker process that boots the Bull queue and keeps the process alive
 */
const logger = require('../utils/logger');

process.on('uncaughtException', (err) => {
  logger.error('Worker uncaughtException', err);
  process.exit(1);
});

process.on('unhandledRejection', (reason) => {
  logger.error('Worker unhandledRejection', reason);
});

// Require the queue to initialize processors
try {
  if (process.env.NODE_ENV === 'test') {
    logger.info('RetryQueue worker skipped in test environment');
  } else {
    const retryQueue = require('../queues/retryQueue');
    logger.info('RetryQueue worker started, waiting for jobs...');
  }
} catch (err) {
  logger.error('Failed to start RetryQueue worker:', err.message);
  process.exit(1);
}

// Keep process alive
if (process.env.NODE_ENV !== 'test') {
  setInterval(() => {}, 1000 * 60);
}
