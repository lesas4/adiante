import React, { useState, useEffect, useRef } from 'react';
import QRCode from 'qrcode.react';

/**
 * PixQRCode - Componente para exibir QR Code PIX dinâmico
 * Suporta:
 * - Exibir QR Code
 * - Copiar código PIX
 * - Timer de expiração
 * - Auto-refresh de status
 */
export default function PixQRCode({ 
  brCode, 
  pixTransactionId, 
  amount, 
  expiresAt,
  onPaymentConfirmed,
  autoRefreshInterval = 5000 
}) {
  const [copied, setCopied] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(null);
  const [isExpired, setIsExpired] = useState(false);
  const [paymentStatus, setPaymentStatus] = useState('pending');
  const qrRef = useRef(null);
  const timerRef = useRef(null);
  const refreshRef = useRef(null);

  // Inicializar timer de expiração
  useEffect(() => {
    if (expiresAt) {
      const updateTimer = () => {
        const now = new Date().getTime();
        const expireTime = new Date(expiresAt).getTime();
        const remaining = Math.max(0, Math.floor((expireTime - now) / 1000));

        if (remaining === 0) {
          setIsExpired(true);
          clearInterval(timerRef.current);
        } else {
          setSecondsRemaining(remaining);
        }
      };

      updateTimer();
      timerRef.current = setInterval(updateTimer, 1000);

      return () => clearInterval(timerRef.current);
    }
  }, [expiresAt]);

  // Auto-refresh status de pagamento
  useEffect(() => {
    if (!pixTransactionId || isExpired) return;

    const checkPaymentStatus = async () => {
      try {
        const response = await fetch(
          `/api/payments/pix/${pixTransactionId}/verify`,
          {
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          }
        );
        const data = await response.json();

        if (data.success && data.status === 'paid') {
          setPaymentStatus('paid');
          clearInterval(refreshRef.current);
          if (onPaymentConfirmed) {
            onPaymentConfirmed();
          }
        }
      } catch (error) {
        console.error('Erro ao verificar pagamento:', error);
      }
    };

    refreshRef.current = setInterval(checkPaymentStatus, autoRefreshInterval);

    return () => clearInterval(refreshRef.current);
  }, [pixTransactionId, isExpired, onPaymentConfirmed, autoRefreshInterval]);

  const handleCopyCode = () => {
    navigator.clipboard.writeText(brCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownloadQR = () => {
    if (qrRef.current) {
      const canvas = qrRef.current.querySelector('canvas');
      const image = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.href = image;
      link.download = `pix-qrcode-${pixTransactionId}.png`;
      link.click();
    }
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${String(secs).padStart(2, '0')}`;
  };

  if (paymentStatus === 'paid') {
    return (
      <div className="p-6 bg-green-50 border-2 border-green-300 rounded-lg text-center">
        <div className="text-4xl mb-2">✅</div>
        <h3 className="text-xl font-bold text-green-700 mb-2">Pagamento Confirmado!</h3>
        <p className="text-green-600">Seu agendamento foi confirmado com sucesso.</p>
      </div>
    );
  }

  if (isExpired) {
    return (
      <div className="p-6 bg-red-50 border-2 border-red-300 rounded-lg text-center">
        <div className="text-4xl mb-2">⏰</div>
        <h3 className="text-xl font-bold text-red-700 mb-2">Código Expirado</h3>
        <p className="text-red-600 mb-4">Por favor, solicite um novo código PIX.</p>
        <button 
          onClick={() => window.location.reload()}
          className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
        >
          Gerar Novo Código
        </button>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-lg border border-gray-200 shadow-lg">
      {/* Header */}
      <div className="text-center mb-6">
        <h3 className="text-2xl font-bold text-gray-900 mb-2">Pagar com PIX</h3>
        <div className="inline-block px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-lg font-semibold">
          R$ {amount.toFixed(2)}
        </div>
      </div>

      {/* QR Code */}
      <div className="flex justify-center mb-6" ref={qrRef}>
        <div className="p-4 bg-white border-2 border-gray-200 rounded-lg">
          <QRCode
            value={brCode}
            size={256}
            level="H"
            includeMargin={true}
            renderAs="canvas"
          />
        </div>
      </div>

      {/* Timer */}
      {secondsRemaining !== null && (
        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">Expira em:</p>
          <p className="text-2xl font-mono font-bold text-orange-600">
            {formatTime(secondsRemaining)}
          </p>
          {secondsRemaining < 60 && (
            <p className="text-xs text-orange-500 mt-1">⚠️ Expirando em breve</p>
          )}
        </div>
      )}

      {/* Divider */}
      <div className="flex items-center my-6">
        <div className="flex-1 border-t border-gray-300"></div>
        <span className="px-4 text-gray-500 font-semibold">OU</span>
        <div className="flex-1 border-t border-gray-300"></div>
      </div>

      {/* Manual PIX Code */}
      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-2">
          Copiar Chave PIX:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={brCode}
            readOnly
            className="flex-1 px-4 py-3 border border-gray-300 rounded-lg font-mono text-sm bg-gray-50 focus:outline-none"
            onClick={(e) => e.target.select()}
          />
          <button
            onClick={handleCopyCode}
            className={`px-4 py-3 rounded-lg font-semibold transition ${
              copied
                ? 'bg-green-600 text-white'
                : 'bg-blue-600 text-white hover:bg-blue-700'
            }`}
          >
            {copied ? '✓ Copiado!' : 'Copiar'}
          </button>
        </div>
        <p className="text-xs text-gray-500 mt-2">
          Cole este código no app do seu banco para confirmar o pagamento
        </p>
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        <button
          onClick={handleDownloadQR}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition"
        >
          📥 Baixar QR Code
        </button>
        <button
          onClick={() => window.print()}
          className="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 font-semibold transition"
        >
          🖨️ Imprimir
        </button>
      </div>

      {/* Info */}
      <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-500 rounded">
        <p className="text-sm text-blue-700">
          <strong>💡 Dica:</strong> Você pode usar qualquer banco participante do PIX (Banco do Brasil, Bradesco, Itaú, Nubank, etc).
        </p>
      </div>

      {/* Status Indicator */}
      <div className="mt-4 text-center text-sm text-gray-500">
        <p>Aguardando confirmação do pagamento...</p>
        <p className="text-xs mt-1">Pode levar alguns segundos</p>
      </div>
    </div>
  );
}
