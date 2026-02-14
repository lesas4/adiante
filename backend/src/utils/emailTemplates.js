/**
 * emailTemplates.js
 * Biblioteca completa de templates de email responsivos e profissionais
 */

const emailTemplates = {
  /**
   * Confirmação de Agendamento
   */
  bookingConfirmation: {
    subject: (data) => `✅ Agendamento Confirmado #${data.bookingId}`,
    html: (data) => {
      const { userName, bookingId, date, time, service, address, price, cancelUrl } = data;
      const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">🎉 Agendamento Confirmado!</h1>
      </div>
      <div style="background: white; padding: 30px;">
        <p>Olá <strong>${userName}</strong>,</p>
        <p>Seu agendamento foi confirmado com sucesso! Abaixo estão os detalhes:</p>
        
        <div style="background: #f0fdf4; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #22c55e;">
          <p style="margin: 8px 0;"><strong>📅 Data:</strong> ${formattedDate}</p>
          <p style="margin: 8px 0;"><strong>⏰ Horário:</strong> ${time}</p>
          <p style="margin: 8px 0;"><strong>🧹 Serviço:</strong> ${service}</p>
          <p style="margin: 8px 0;"><strong>📍 Local:</strong> ${address}</p>
          <p style="margin: 8px 0;"><strong>💰 Valor:</strong> R$ ${parseFloat(price).toFixed(2)}</p>
          <p style="margin: 8px 0;"><strong>🔑 ID:</strong> #${bookingId}</p>
        </div>

        <p>✅ Nossa equipe confirmou sua solicitação e estará no local no horário agendado.</p>
        
        <p><a href="${cancelUrl}" style="display: inline-block; padding: 12px 30px; background: #22c55e; color: white; text-decoration: none; border-radius: 5px; margin: 10px 0;">Gerenciar Agendamento</a></p>
        
        <p><strong>Dúvidas?</strong><br>
        📞 +55 51 98033-0422<br>
        📧 leidycleaner@gmail.com</p>
      </div>
      <div style="background: #f5f5f5; color: #888; text-align: center; padding: 20px; font-size: 12px; border-radius: 0 0 8px 8px;">
        <p style="margin: 5px 0;">© 2026 Limpeza Pro. Todos os direitos reservados.</p>
        <p style="margin: 5px 0;">Este é um email automático. Por favor, não responda.</p>
      </div>
    </div>
  </body>
</html>`;
    }
  },

  /**
   * Lembrete 24h Antes
   */
  bookingReminder: {
    subject: (data) => `⏰ Lembrete: seu agendamento é amanhã! #${data.bookingId}`,
    html: (data) => {
      const { userName, bookingId, date, time, service, address } = data;
      const formattedDate = new Date(date).toLocaleDateString('pt-BR', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });

      return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #f59e0b, #d97706); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">⏰ Lembrete!</h1>
      </div>
      <div style="background: white; padding: 30px;">
        <p>Olá <strong>${userName}</strong>,</p>
        <p>Seu agendamento está marcado para <strong>amanhã</strong>! 🎉</p>
        
        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 20px 0;">
          <p style="margin: 8px 0;"><strong>📅 ${formattedDate}</strong></p>
          <p style="margin: 8px 0;"><strong>⏰ às ${time}</strong></p>
          <p style="margin: 8px 0;"><strong>🧹 ${service}</strong></p>
          <p style="margin: 8px 0;"><strong>📍 ${address}</strong></p>
        </div>

        <p>Confirme sua presença para que possamos preparar tudo com antecedência.</p>
        <p>Caso não possa estar presente, avise-nos o quanto antes para remarcarmos.</p>
        
        <p><strong>Contato:</strong> +55 51 98033-0422</p>
      </div>
    </div>
  </body>
</html>`;
    }
  },

  /**
   * Cancelamento Confirmado
   */
  bookingCancelled: {
    subject: (data) => `❌ Agendamento Cancelado #${data.bookingId}`,
    html: (data) => {
      const { userName, bookingId, reason = 'Solicitação do usuário', refundStatus = 'pending' } = data;

      return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">Cancelamento Confirmado</h1>
      </div>
      <div style="background: white; padding: 30px;">
        <p>Olá <strong>${userName}</strong>,</p>
        <p>Seu agendamento #${bookingId} foi cancelado conforme solicitado.</p>
        
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 20px 0;">
          <p style="margin: 8px 0;"><strong>Motivo:</strong> ${reason}</p>
          <p style="margin: 8px 0;"><strong>Status do Reembolso:</strong> ${refundStatus === 'processed' ? '✅ Reembolso processado' : '⏳ Será processado em até 5 dias úteis'}</p>
        </div>

        <p>Se deseja reagendar, estamos à sua disposição!</p>
        <p>📞 +55 51 98033-0422</p>
      </div>
    </div>
  </body>
</html>`;
    }
  },

  /**
   * Recibo de Pagamento
   */
  paymentReceipt: {
    subject: (data) => `📄 Recibo de Pagamento - R$ ${parseFloat(data.amount).toFixed(2)}`,
    html: (data) => {
      const { userName, transactionId, amount, method, date, bookingId } = data;

      return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">✅ Pagamento Recebido</h1>
      </div>
      <div style="background: white; padding: 30px;">
        <p>Olá <strong>${userName}</strong>,</p>
        <p>Seu pagamento foi recebido com sucesso! Confira os detalhes:</p>
        
        <div style="background: #f9fafb; border: 1px solid #e5e7eb; padding: 20px; font-family: monospace;">
          <p style="margin: 8px 0;"><strong>Transação ID:</strong> ${transactionId}</p>
          <p style="margin: 8px 0;"><strong>Booking ID:</strong> #${bookingId}</p>
          <p style="margin: 8px 0;"><strong>Valor:</strong> R$ ${parseFloat(amount).toFixed(2)}</p>
          <p style="margin: 8px 0;"><strong>Método:</strong> ${method}</p>
          <p style="margin: 8px 0;"><strong>Data:</strong> ${new Date(date).toLocaleString('pt-BR')}</p>
        </div>

        <p style="margin-top: 20px;">Obrigado pela confiança! Seu agendamento está confirmado.</p>
      </div>
      <div style="background: #f5f5f5; color: #888; text-align: center; padding: 20px; font-size: 12px; border-radius: 0 0 8px 8px;">
        <p style="margin: 5px 0;">© 2026 Limpeza Pro.</p>
      </div>
    </div>
  </body>
</html>`;
    }
  },

  /**
   * Erro no Pagamento
   */
  paymentFailed: {
    subject: (data) => `⚠️ Falha no Pagamento - Tente Novamente`,
    html: (data) => {
      const { userName, amount, reason = 'Erro no processamento', retryUrl } = data;

      return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #ef4444, #dc2626); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">⚠️ Pagamento não Processado</h1>
      </div>
      <div style="background: white; padding: 30px;">
        <p>Olá <strong>${userName}</strong>,</p>
        <p>Houve um problema ao processar seu pagamento de <strong>R$ ${parseFloat(amount).toFixed(2)}</strong>.</p>
        
        <div style="background: #fef2f2; border-left: 4px solid #ef4444; padding: 20px; margin: 20px 0;">
          <p><strong>Motivo:</strong> ${reason}</p>
        </div>

        <p><strong>Tente novamente:</strong></p>
        <p><a href="${retryUrl}" style="display: inline-block; padding: 12px 30px; background: #22c55e; color: white; text-decoration: none; border-radius: 5px;">Repetir Pagamento</a></p>

        <p>Se o problema persistir, entre em contato:</p>
        <p>📞 +55 51 98033-0422 | 📧 leidycleaner@gmail.com</p>
      </div>
    </div>
  </body>
</html>`;
    }
  },

  /**
   * Bem-vindo (New User)
   */
  welcomeEmail: {
    subject: (data) => `🎉 Bem-vindo à Limpeza Pro!`,
    html: (data) => {
      const { userName, loginUrl } = data;

      return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #22c55e, #16a34a); color: white; padding: 40px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">🎉 Bem-vindo, ${userName}!</h1>
      </div>
      <div style="background: white; padding: 30px;">
        <p>Ficamos felizes em tê-lo conosco!</p>
        
        <div style="margin: 20px 0; padding: 15px; background: #f0fdf4; border-radius: 5px;">
          <p style="margin: 0;">✅ <strong>Agende com facilidade:</strong> Escolha data, hora e serviço</p>
        </div>
        <div style="margin: 20px 0; padding: 15px; background: #f0fdf4; border-radius: 5px;">
          <p style="margin: 0;">💰 <strong>Pagamento seguro:</strong> Stripe, PIX ou cartão de crédito</p>
        </div>
        <div style="margin: 20px 0; padding: 15px; background: #f0fdf4; border-radius: 5px;">
          <p style="margin: 0;">⭐ <strong>Avaliações transparentes:</strong> Veja reviews de outros clientes</p>
        </div>

        <p style="margin-top: 30px;">Comece agora acessando sua conta:</p>
        <p><a href="${loginUrl}" style="display: inline-block; padding: 12px 30px; background: #22c55e; color: white; text-decoration: none; border-radius: 5px;">Acessar Minha Conta</a></p>

        <p style="margin-top: 20px;"><strong>Dúvidas?</strong> Estamos aqui para ajudar!</p>
        <p>📞 +55 51 98033-0422</p>
      </div>
    </div>
  </body>
</html>`;
    }
  },

  /**
   * Recuperação de Senha
   */
  passwordReset: {
    subject: (data) => `🔒 Recuperar Sua Senha`,
    html: (data) => {
      const { userName, resetUrl, expiresIn = '24 horas' } = data;

      return `<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
  </head>
  <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 0;">
    <div style="max-width: 600px; margin: 0 auto; background: #f9f9f9; padding: 20px;">
      <div style="background: linear-gradient(135deg, #3b82f6, #2563eb); color: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0;">
        <h1 style="margin: 0;">🔒 Recuperar Senha</h1>
      </div>
      <div style="background: white; padding: 30px;">
        <p>Olá <strong>${userName}</strong>,</p>
        <p>Recebemos uma solicitação para recuperar sua senha.</p>
        
        <div style="background: #eff6ff; border-left: 4px solid #3b82f6; padding: 20px; margin: 20px 0;">
          <p><strong>⚠️ ATENÇÃO:</strong> Este link expira em ${expiresIn}. Se você não solicitou isso, ignore este email.</p>
        </div>

        <p>Para redefinir sua senha, clique no botão abaixo:</p>
        <p><a href="${resetUrl}" style="display: inline-block; padding: 12px 30px; background: #3b82f6; color: white; text-decoration: none; border-radius: 5px;">Redefinir Senha</a></p>

        <p style="margin-top: 20px; font-size: 12px; color: #888;">
          Se o botão não funcionar, copie e cole este link no seu navegador:<br>
          ${resetUrl}
        </p>
      </div>
    </div>
  </body>
</html>`;
    }
  }
};

module.exports = emailTemplates;
