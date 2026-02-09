/**
 * pixWebhook.routes.js - Rotas para webhooks e callbacks PIX
 */

const express = require('express');
const router = express.Router();
const PixWebhookController = require('../controllers/PixWebhookController');
const { authenticateToken, authorizeRole } = require('../middleware/auth');

// POST /api/webhooks/pix - Receber webhook do banco (sem autenticação)
router.post('/', PixWebhookController.handlePixWebhook);

// GET /api/webhooks/pix/status/:pixTransactionId - Obter status PIX (sem autenticação)
router.get('/status/:pixTransactionId', PixWebhookController.getPixStatus);

// GET /api/webhooks/pix/validate/:pixTransactionId - Validar via API bancária (com autenticação)
router.get(
  '/validate/:pixTransactionId',
  PixWebhookController.validatePixStatus
);

// POST /api/webhooks/pix/confirm/:pixTransactionId - Confirmar manualmente (ADMIN)
router.post(
  '/confirm/:pixTransactionId',
  authenticateToken,
  authorizeRole('admin'),
  PixWebhookController.manuallyConfirmPix
);

// GET /api/webhooks/pix/expiring - Listar PIXs expirando (ADMIN)
router.get(
  '/expiring',
  authenticateToken,
  authorizeRole('admin'),
  PixWebhookController.getExpiringPixs
);

// POST /api/webhooks/pix/cleanup - Limpar PIXs expirados (ADMIN)
router.post(
  '/cleanup',
  authenticateToken,
  authorizeRole('admin'),
  PixWebhookController.cleanupExpiredPixs
);

module.exports = router;
