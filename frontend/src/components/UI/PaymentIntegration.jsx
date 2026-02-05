import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { CreditCardIcon, ShieldCheckIcon, TruckIcon } from '@heroicons/react/24/outline';

const PaymentIntegration = ({ amount, onPaymentSuccess, onPaymentError }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [cardData, setCardData] = useState({
    number: '',
    expiry: '',
    cvv: '',
    name: ''
  });

  const paymentMethods = [
    {
      id: 'credit_card',
      name: 'Cartão de Crédito',
      icon: CreditCardIcon,
      description: 'Visa, Mastercard, Elo'
    },
    {
      id: 'pix',
      name: 'PIX',
      icon: ShieldCheckIcon,
      description: 'Pagamento instantâneo'
    },
    {
      id: 'bank_transfer',
      name: 'Transferência Bancária',
      icon: TruckIcon,
      description: 'Para pagamentos maiores'
    }
  ];

  const handleCardInput = (field, value) => {
    let formattedValue = value;

    if (field === 'number') {
      // Formatar número do cartão (XXXX XXXX XXXX XXXX)
      formattedValue = value.replace(/\s/g, '').replace(/(\d{4})/g, '$1 ').trim();
    } else if (field === 'expiry') {
      // Formatar validade (MM/YY)
      formattedValue = value.replace(/\D/g, '').replace(/(\d{2})(\d{2})/, '$1/$2');
    }

    setCardData(prev => ({ ...prev, [field]: formattedValue }));
  };

  const processPayment = async () => {
    setIsProcessing(true);

    try {
      // Simular processamento de pagamento
      await new Promise(resolve => setTimeout(resolve, 3000));

      // Simular taxa de sucesso de 95%
      const success = Math.random() > 0.05;

      if (success) {
        onPaymentSuccess({
          transactionId: `TXN_${Date.now()}`,
          method: paymentMethod,
          amount: amount,
          timestamp: new Date()
        });
      } else {
        throw new Error('Pagamento não autorizado');
      }
    } catch (error) {
      onPaymentError(error.message);
    } finally {
      setIsProcessing(false);
    }
  };

  const renderPaymentForm = () => {
    switch (paymentMethod) {
      case 'credit_card':
        return (
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Número do Cartão
              </label>
              <input
                type="text"
                placeholder="1234 5678 9012 3456"
                value={cardData.number}
                onChange={(e) => handleCardInput('number', e.target.value)}
                maxLength="19"
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Validade
                </label>
                <input
                  type="text"
                  placeholder="MM/YY"
                  value={cardData.expiry}
                  onChange={(e) => handleCardInput('expiry', e.target.value)}
                  maxLength="5"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  CVV
                </label>
                <input
                  type="text"
                  placeholder="123"
                  value={cardData.cvv}
                  onChange={(e) => handleCardInput('cvv', e.target.value)}
                  maxLength="4"
                  className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Nome no Cartão
              </label>
              <input
                type="text"
                placeholder="João Silva"
                value={cardData.name}
                onChange={(e) => handleCardInput('name', e.target.value)}
                className="w-full px-4 py-3 border border-gray-300 dark:border-slate-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-slate-700 dark:text-white"
              />
            </div>
          </div>
        );

      case 'pix':
        return (
          <div className="text-center space-y-4">
            <div className="bg-gray-100 dark:bg-slate-700 p-6 rounded-lg">
              <div className="text-6xl mb-4">📱</div>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                Escaneie o QR Code ou copie o código PIX
              </p>
              <div className="bg-white dark:bg-slate-800 p-4 rounded-lg mb-4">
                <div className="text-2xl font-mono text-gray-800 dark:text-white">
                  PIX_CODE_{Date.now()}
                </div>
              </div>
              <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors">
                Copiar Código PIX
              </button>
            </div>
          </div>
        );

      case 'bank_transfer':
        return (
          <div className="space-y-4">
            <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg">
              <h4 className="font-semibold text-blue-800 dark:text-blue-200 mb-2">
                Dados para Transferência
              </h4>
              <div className="space-y-2 text-sm">
                <div><strong>Banco:</strong> Itaú (341)</div>
                <div><strong>Agência:</strong> 1234</div>
                <div><strong>Conta:</strong> 56789-0</div>
                <div><strong>Titular:</strong> Leidy Cleaner Ltda</div>
                <div><strong>CNPJ:</strong> 12.345.678/0001-90</div>
              </div>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Após a transferência, envie o comprovante para nosso WhatsApp para confirmação.
            </p>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          💳 Pagamento Seguro
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Total a pagar: <span className="font-bold text-2xl text-green-600">R$ {amount.toFixed(2)}</span>
        </p>
      </div>

      {/* Payment Methods */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Escolha a forma de pagamento
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {paymentMethods.map((method) => (
            <button
              key={method.id}
              onClick={() => setPaymentMethod(method.id)}
              className={`p-4 border-2 rounded-lg text-left transition-all ${
                paymentMethod === method.id
                  ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30'
                  : 'border-gray-300 dark:border-slate-600 hover:border-blue-300'
              }`}
            >
              <method.icon className="w-8 h-8 mb-2 text-blue-600" />
              <div className="font-semibold text-gray-900 dark:text-white">
                {method.name}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400">
                {method.description}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Payment Form */}
      <div className="bg-gray-50 dark:bg-slate-800 p-6 rounded-xl mb-6">
        {renderPaymentForm()}
      </div>

      {/* Security Notice */}
      <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg mb-6">
        <ShieldCheckIcon className="w-6 h-6 text-green-600" />
        <div className="text-sm">
          <div className="font-semibold text-green-800 dark:text-green-200">
            Pagamento 100% Seguro
          </div>
          <div className="text-green-600 dark:text-green-300">
            Seus dados estão protegidos com criptografia SSL
          </div>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={processPayment}
        disabled={isProcessing}
        className={`w-full py-4 px-6 rounded-lg font-bold text-white transition-all ${
          isProcessing
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 shadow-lg hover:shadow-xl'
        }`}
      >
        {isProcessing ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Processando...
          </div>
        ) : (
          `Pagar R$ ${amount.toFixed(2)}`
        )}
      </button>

      <p className="text-xs text-gray-500 dark:text-gray-400 text-center mt-4">
        Ao clicar em "Pagar", você concorda com nossos termos de serviço
      </p>
    </div>
  );
};

export default PaymentIntegration;