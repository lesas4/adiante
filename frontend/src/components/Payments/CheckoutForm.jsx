import React, { useState } from 'react';
import { useToast } from '../../context/ToastContext';
import { apiCall } from '../../config/api';

function CheckoutForm({ amount = 120.00 }) {
  const [method, setMethod] = useState('pix');
  const [processing, setProcessing] = useState(false);
  const [bankData, setBankData] = useState({
    bank: 'pix', // Para PIX, qual tipo de chave?
    pixKey: '', // Chave PIX (CPF, email, celular ou aleatória)
    accountNumber: '',
    agencia: '',
    bankName: '',
    accountType: 'corrente'
  });
  const { addToast } = useToast();

  const handleBankDataChange = (e) => {
    const { name, value } = e.target;
    setBankData(prev => ({ ...prev, [name]: value }));
  };

  const validateBankData = () => {
    if (method === 'pix') {
      if (!bankData.pixKey.trim()) {
        addToast('Adicione uma chave PIX', 'error');
        return false;
      }
    } else if (method === 'boleto' || method === 'transfer') {
      if (!bankData.accountNumber.trim()) {
        addToast('Número da conta é obrigatório', 'error');
        return false;
      }
      if (!bankData.agencia.trim()) {
        addToast('Agência é obrigatória', 'error');
        return false;
      }
      if (!bankData.bankName) {
        addToast('Selecione um banco', 'error');
        return false;
      }
    }
    return true;
  };

  const handlePay = async () => {
    if (!validateBankData()) return;
    
    setProcessing(true);
    try {
      const data = await apiCall('/api/payments/create', {
        method: 'POST',
        body: JSON.stringify({ 
          amount, 
          method,
          bankData: method !== 'card' ? bankData : {}
        })
      });
      addToast('Pagamento realizado com sucesso!', 'success');
    } catch (err) {
      addToast(err.message || 'Erro ao processar pagamento', 'error');
    } finally {
      setProcessing(false);
    }
  };

  const banks = [
    { code: 'itau', name: 'Itaú (341)' },
    { code: 'bradesco', name: 'Bradesco (237)' },
    { code: 'santander', name: 'Santander (033)' },
    { code: 'caixa', name: 'Caixa (104)' },
    { code: 'bb', name: 'Banco do Brasil (001)' },
    { code: 'inter', name: 'Banco Inter (077)' },
    { code: 'nubank', name: 'Nubank (260)' },
    { code: 'picpay', name: 'PicPay (380)' }
  ];

  return (
    <div className="p-6 bg-white rounded-lg shadow-lg">
      <h3 className="text-2xl font-bold mb-6">💳 Forma de Pagamento</h3>
      <p className="mb-6 text-gray-600">Valor a pagar: <strong className="text-2xl text-green-600">R$ {amount.toFixed(2)}</strong></p>

      {/* Opções de Pagamento */}
      <div className="space-y-3 mb-6">
        <label className={`block p-4 border-2 rounded-lg cursor-pointer transition ${method==='pix'?'border-green-500 bg-green-50':'border-gray-300'}`}>
          <input type="radio" name="method" checked={method==='pix'} onChange={()=>setMethod('pix')} className="mr-3" /> 
          <span className="font-semibold text-lg">💰 PIX Instantâneo</span>
          <p className="text-xs text-gray-500 mt-1">Transferência imediata via chave PIX</p>
        </label>

        <label className={`block p-4 border-2 rounded-lg cursor-pointer transition ${method==='card'?'border-blue-500 bg-blue-50':'border-gray-300'}`}>
          <input type="radio" name="method" checked={method==='card'} onChange={()=>setMethod('card')} className="mr-3" /> 
          <span className="font-semibold text-lg">🏦 Cartão de Crédito</span>
          <p className="text-xs text-gray-500 mt-1">Parcelado em até 12x</p>
        </label>

        <label className={`block p-4 border-2 rounded-lg cursor-pointer transition ${method==='boleto'?'border-orange-500 bg-orange-50':'border-gray-300'}`}>
          <input type="radio" name="method" checked={method==='boleto'} onChange={()=>setMethod('boleto')} className="mr-3" /> 
          <span className="font-semibold text-lg">📄 Boleto Bancário</span>
          <p className="text-xs text-gray-500 mt-1">Vencimento em até 3 dias úteis</p>
        </label>

        <label className={`block p-4 border-2 rounded-lg cursor-pointer transition ${method==='transfer'?'border-purple-500 bg-purple-50':'border-gray-300'}`}>
          <input type="radio" name="method" checked={method==='transfer'} onChange={()=>setMethod('transfer')} className="mr-3" /> 
          <span className="font-semibold text-lg">🔄 Transferência Bancária</span>
          <p className="text-xs text-gray-500 mt-1">TED/DOC entre contas</p>
        </label>
      </div>

      {/* Formulário de Dados Bancários */}
      {(method === 'pix' || method === 'boleto' || method === 'transfer') && (
        <div className="bg-gray-50 p-6 rounded-lg mb-6 border-2 border-yellow-200">
          <h4 className="font-bold text-lg mb-4">🔐 Dados Bancários</h4>
          
          {method === 'pix' ? (
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">Sua Chave PIX *</label>
              <input
                type="text"
                name="pixKey"
                value={bankData.pixKey}
                onChange={handleBankDataChange}
                placeholder="Seu CPF, email, telefone ou chave aleatória"
                className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-green-500 focus:outline-none"
              />
              <p className="text-xs text-gray-500 mt-1">Digite sua chave PIX cadastrada no banco</p>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Banco *</label>
                <select
                  name="bankName"
                  value={bankData.bankName}
                  onChange={handleBankDataChange}
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                >
                  <option value="">Selecione seu banco</option>
                  {banks.map(b => (
                    <option key={b.code} value={b.code}>{b.name}</option>
                  ))}
                </select>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Agência *</label>
                  <input
                    type="text"
                    name="agencia"
                    value={bankData.agencia}
                    onChange={handleBankDataChange}
                    placeholder="0000"
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                    maxLength="5"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">Tipo de Conta *</label>
                  <select
                    name="accountType"
                    value={bankData.accountType}
                    onChange={handleBankDataChange}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                  >
                    <option value="corrente">Corrente</option>
                    <option value="poupanca">Poupança</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">Número da Conta *</label>
                <input
                  type="text"
                  name="accountNumber"
                  value={bankData.accountNumber}
                  onChange={handleBankDataChange}
                  placeholder="000000-X"
                  className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:border-purple-500 focus:outline-none"
                />
              </div>

              <div className="bg-yellow-100 border-l-4 border-yellow-500 p-3 rounded text-sm text-yellow-700">
                ⚠️ Verifique seus dados bancários. Transferências não podem ser revertidas.
              </div>
            </div>
          )}
        </div>
      )}

      {/* Botões */}
      <div className="flex gap-3">
        <button
          onClick={handlePay}
          disabled={processing}
          className="flex-1 px-6 py-3 bg-green-600 hover:bg-green-700 text-white font-bold rounded-lg transition disabled:opacity-50"
        >
          {processing ? '⏳ Processando...' : '✓ Confirmar Pagamento'}
        </button>
        <button
          onClick={()=>addToast('Pagamento cancelado', 'info')}
          className="px-6 py-3 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg transition"
        >
          ✕ Cancelar
        </button>
      </div>
    </div>
  );
}

export default CheckoutForm;
