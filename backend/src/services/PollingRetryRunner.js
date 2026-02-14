/**
 * PollingRetryRunner
 * Fallback runner that periodically calls RetryQueueService.processQueue()
 * Useful when Redis/Bull is not available (development or constrained containers)
 */
const logger = require('../utils/logger');
const RetryQueueService = require('./RetryQueueService');

class PollingRetryRunner {
  constructor(intervalMs = 60 * 1000) {
    this.intervalMs = intervalMs;
    this._timer = null;
  }

  start() {
    if (this._timer) return;
    logger.info(`Starting PollingRetryRunner interval=${this.intervalMs}ms`);
    this._timer = setInterval(async () => {
      try {
        await RetryQueueService.processQueue();
      } catch (err) {
        logger.warn('PollingRetryRunner error:', err && err.message);
      }
    }, this.intervalMs);
  }

  stop() {
    if (!this._timer) return;
    clearInterval(this._timer);
    this._timer = null;
  }
}

module.exports = new PollingRetryRunner();
