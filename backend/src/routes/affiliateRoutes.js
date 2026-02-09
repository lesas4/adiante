/**
 * affiliateRoutes.js - Endpoints para sistema de referência
 */

const express = require('express');
const AffiliateService = require('../services/AffiliateService');
const { authenticate, authorize } = require('../middleware/auth');

const router = express.Router();

/**
 * POST /api/affiliates/register
 * Registrar usuário como afiliado
 */
router.post('/register', authenticate, async (req, res) => {
  try {
    const { commissionRate } = req.body;
    const userId = req.user.id;

    const result = await AffiliateService.registerAffiliate(
      userId,
      commissionRate || 0.10
    );

    res.json({
      success: true,
      message: 'Parabéns! Você agora é um afiliado',
      affiliate: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/affiliates/referral
 * Registrar nova referência (chamado após pagamento)
 * Body: { referralCode, newUserId, transactionAmount }
 */
router.post('/referral', async (req, res) => {
  try {
    const { referralCode, newUserId, transactionAmount } = req.body;

    if (!referralCode || !newUserId || !transactionAmount) {
      return res.status(400).json({
        success: false,
        error: 'Dados incompletos'
      });
    }

    const result = await AffiliateService.registerReferral(
      referralCode,
      newUserId,
      transactionAmount
    );

    res.json({
      success: true,
      message: 'Referência registrada com sucesso',
      referral: result
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * GET /api/affiliates/stats
 * Obter estatísticas do afiliado logado
 */
router.get('/stats', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await AffiliateService.getAffiliateStats(userId);

    res.json({
      success: true,
      stats: stats.affiliate,
      referrals: stats.referrals
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * POST /api/affiliates/withdraw
 * Solicitar saque de ganhos
 * Body: { amount }
 */
router.post('/withdraw', authenticate, async (req, res) => {
  try {
    const { amount } = req.body;
    const userId = req.user.id;

    if (!amount || amount <= 0) {
      return res.status(400).json({
        success: false,
        error: 'Valor inválido'
      });
    }

    // Mínimo de R$ 50
    if (amount < 50) {
      return res.status(400).json({
        success: false,
        error: 'Saque mínimo é R$ 50'
      });
    }

    const result = await AffiliateService.requestWithdrawal(userId, amount);

    res.json(result);
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

/**
 * PATCH /api/affiliates/withdrawals/:withdrawalId/approve
 * Aprovar saque (Admin only)
 */
router.patch('/withdrawals/:withdrawalId/approve', 
  authenticate, 
  authorize(['admin']), 
  async (req, res) => {
    try {
      const { withdrawalId } = req.params;

      const result = await AffiliateService.approveWithdrawal(withdrawalId);

      res.json(result);
    } catch (error) {
      res.status(400).json({
        success: false,
        error: error.message
      });
    }
  }
);

/**
 * GET /api/affiliates/link
 * Gerar link de referência personalizado para compartilhar
 */
router.get('/link', authenticate, async (req, res) => {
  try {
    const userId = req.user.id;

    const stats = await AffiliateService.getAffiliateStats(userId);
    const affiliate = stats.affiliate;

    const referralLink = `${process.env.FRONTEND_URL || 'https://meudominio.com'}/agendar?ref=${affiliate.referral_code}`;

    res.json({
      success: true,
      referralCode: affiliate.referral_code,
      referralLink,
      shareText: `Agende seus serviços de hora com desconto! Use meu código: ${affiliate.referral_code}`,
      whatsappShare: `Fiz um ótimo agendamento aqui! Use meu código ${affiliate.referral_code} para ganhar 10% de desconto! ${referralLink}`
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error: error.message
    });
  }
});

module.exports = router;
