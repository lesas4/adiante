const express = require('express');
const { createBullBoard } = require('@bull-board/api');
const { BullAdapter } = require('@bull-board/api/bullAdapter');
const { ExpressAdapter } = require('@bull-board/express');
const Queue = require('bull');

const router = express.Router();

// Inicializa fila(s) usadas no sistema
const emailQueue = new Queue('email', process.env.REDIS_URL || 'redis://127.0.0.1:6379');
const genericQueue = new Queue('generic', process.env.REDIS_URL || 'redis://127.0.0.1:6379');

const serverAdapter = new ExpressAdapter();
createBullBoard({
  queues: [new BullAdapter(emailQueue), new BullAdapter(genericQueue)],
  serverAdapter
});
serverAdapter.setBasePath('/admin/queues');

router.use(serverAdapter.getRouter());

module.exports = router;
