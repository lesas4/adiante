/**
 * Hour Pricing Controller
 * Rotas para cálculo de preças por hora
 */

const HourPricingService = require('../services/HourPricingService');
const logger = require('../utils/logger');

class HourPricingController {
  /**
   * POST /api/pricing/calculate-hours
   * Calcular preço para um agendamento de horas
   */
  async calculateHours(req, res) {
    try {
      const { hours, extras } = req.body;

      if (!hours || hours <= 0) {
        return res.status(400).json({
          error: 'Invalid hours',
          code: 'INVALID_HOURS'
        });
      }

      const result = HourPricingService.calculatePrice(hours, extras);

      return res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Hour pricing calculation error:', error);
      return res.status(500).json({
        error: 'Failed to calculate hourly pricing',
        code: 'CALCULATION_ERROR'
      });
    }
  }

  /**
   * POST /api/pricing/calculate-multiple
   * Calcular preço para múltiplos locais/agendamentos
   */
  async calculateMultiple(req, res) {
    try {
      const { bookings } = req.body;

      if (!Array.isArray(bookings) || bookings.length === 0) {
        return res.status(400).json({
          error: 'Invalid bookings array',
          code: 'INVALID_BOOKINGS'
        });
      }

      const result = HourPricingService.calculateMultipleBookings(bookings);

      return res.json({
        success: true,
        data: result
      });
    } catch (error) {
      logger.error('Multiple booking calculation error:', error);
      return res.status(500).json({
        error: 'Failed to calculate multiple bookings',
        code: 'CALCULATION_ERROR'
      });
    }
  }

  /**
   * GET /api/pricing/hour-extras
   * Listar serviços extras disponíveis
   */
  async getExtras(req, res) {
    try {
      const extras = HourPricingService.getAvailableExtras();
      return res.json({
        success: true,
        data: extras
      });
    } catch (error) {
      logger.error('Error fetching extras:', error);
      return res.status(500).json({
        error: 'Failed to fetch extras',
        code: 'FETCH_ERROR'
      });
    }
  }
}

module.exports = new HourPricingController();
