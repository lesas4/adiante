/**
 * Hour Price Calculator Component
 * UI interativa para calcular preço de serviços por hora
 */

import React, { useState, useEffect } from 'react';

const HourPriceCalculator = ({ onPriceChange, multipleSites = false }) => {
  const [hours, setHours] = useState(4);
  const [selectedExtras, setSelectedExtras] = useState([]);
  const [pricing, setPricing] = useState(null);
  const [multipleSitesMode, setMultipleSitesMode] = useState(multipleSites);
  const [sites, setSites] = useState([
    { id: 1, location: 'Casa/Local 1', hours: 4, extras: [] }
  ]);
  const [paymentMode, setPaymentMode] = useState('individual'); // 'individual' ou 'combined'

  const extras = [
    { id: 'organizacao', name: 'Organização', description: '+10% do valor' },
    { id: 'pos_obra', name: 'Pós-Obra', description: '+30% do valor' },
    { id: 'levar_produtos', name: 'Levar os Produtos', description: 'R$ 30 fixo' }
  ];

  // Cálculo simples de preço
  const calculateSimplePrice = (hrs, extraList) => {
    const BASE = 40;
    const PER_HOUR = 20;
    const THRESHOLD = 8;
    const SURGE_TAX = 0.40;
    const EXTRAS_TAX = 0.40;

    let basePrice = BASE;
    if (hrs <= THRESHOLD) {
      basePrice = BASE + (hrs - 1) * PER_HOUR;
    } else {
      const eightHourPrice = BASE + (THRESHOLD - 1) * PER_HOUR;
      const extraHours = hrs - THRESHOLD;
      basePrice = eightHourPrice * (1 + SURGE_TAX) + extraHours * PER_HOUR;
    }

    // Calcular extras percentuais e fixos separadamente
    let percentualExtrasTotal = 0;
    let fixedExtrasTotal = 0;

    if (extraList.includes('organizacao')) {
      percentualExtrasTotal += basePrice * 0.10;
    }
    if (extraList.includes('pos_obra')) {
      percentualExtrasTotal += basePrice * 0.30;
    }
    if (extraList.includes('levar_produtos')) {
      fixedExtrasTotal += 30; // Fixo, sem taxa
    }

    // Taxa aplicada em cima de (horas + extras percentuais)
    const taxValue = (basePrice + percentualExtrasTotal) * EXTRAS_TAX;

    return {
      basePrice: Math.round(basePrice * 100) / 100,
      percentualExtrasTotal: Math.round(percentualExtrasTotal * 100) / 100,
      taxValue: Math.round(taxValue * 100) / 100,
      fixedExtrasTotal: Math.round(fixedExtrasTotal * 100) / 100,
      finalPrice: Math.round((basePrice + percentualExtrasTotal + taxValue + fixedExtrasTotal) * 100) / 100
    };
  };

  // Atualizar preço quando horas ou extras mudam
  useEffect(() => {
    if (!multipleSitesMode) {
      const price = calculateSimplePrice(hours, selectedExtras);
      setPricing(price);
      if (onPriceChange) {
        onPriceChange(price);
      }
    }
  }, [hours, selectedExtras]);

  // Atualizar preço múltiplos sitios
  useEffect(() => {
    if (multipleSitesMode) {
      let totalPrice = 0;
      const sitesPricing = sites.map(site => {
        const price = calculateSimplePrice(site.hours, site.extras);
        totalPrice += price.finalPrice;
        return { ...site, ...price };
      });
      setPricing({ sites: sitesPricing, totalPrice });
      if (onPriceChange) {
        onPriceChange({ sites: sitesPricing, totalPrice });
      }
    }
  }, [sites, multipleSitesMode]);

  const toggleExtra = (extraId) => {
    setSelectedExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  const addSite = () => {
    setSites([
      ...sites,
      {
        id: Math.max(...sites.map(s => s.id), 0) + 1,
        location: `Casa/Local ${sites.length + 1}`,
        hours: 4,
        extras: []
      }
    ]);
  };

  const removeSite = (id) => {
    if (sites.length > 1) {
      setSites(sites.filter(s => s.id !== id));
    }
  };

  const updateSite = (id, field, value) => {
    setSites(sites.map(s =>
      s.id === id ? { ...s, [field]: value } : s
    ));
  };

  const toggleSiteExtra = (siteId, extraId) => {
    setSites(sites.map(s => {
      if (s.id === siteId) {
        return {
          ...s,
          extras: s.extras.includes(extraId)
            ? s.extras.filter(e => e !== extraId)
            : [...s.extras, extraId]
        };
      }
      return s;
    }));
  };

  if (!pricing) return <div>Carregando...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-3xl font-bold text-green-600 mb-8">
        💰 Calculadora de Horas
      </h2>

      {/* Toggle entre único e múltiplo */}
      <div className="mb-8 flex gap-4">
        <button
          onClick={() => setMultipleSitesMode(false)}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            !multipleSitesMode
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Um Local
        </button>
        <button
          onClick={() => setMultipleSitesMode(true)}
          className={`px-6 py-3 rounded-lg font-bold transition ${
            multipleSitesMode
              ? 'bg-green-600 text-white'
              : 'bg-gray-200 text-gray-700'
          }`}
        >
          Múltiplos Locais
        </button>
      </div>

      {/* ===== MODO ÚNICO LOCAL ===== */}
      {!multipleSitesMode && (
        <div className="space-y-6">
          {/* Seletor de Horas */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-2">
              Horas: <span className="text-green-600">{hours}h</span>
            </label>
            <input
              type="range"
              min="1"
              max="24"
              step="0.5"
              value={hours}
              onChange={(e) => setHours(parseFloat(e.target.value))}
              className="w-full h-2 bg-green-200 rounded-lg cursor-pointer"
            />
            <div className="flex justify-between text-sm text-gray-500 mt-2">
              <span>1h</span>
              <span>24h</span>
            </div>
          </div>

          {/* Extras */}
          <div>
            <label className="block text-lg font-semibold text-gray-700 mb-4">
              Serviços Extras:
            </label>
            <div className="space-y-3">
              {extras.map(extra => (
                <label key={extra.id} className="flex items-center gap-3 p-3 border rounded-lg hover:bg-gray-50 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={selectedExtras.includes(extra.id)}
                    onChange={() => toggleExtra(extra.id)}
                    className="w-5 h-5"
                  />
                  <div className="flex-1">
                    <div className="font-semibold">{extra.name}</div>
                    <div className="text-sm text-gray-600">{extra.description} {extra.id !== 'levar_produtos' && '+40% taxa'}</div>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Resumo de Preço */}
          <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6">
            <div className="grid grid-cols-3 gap-4 mb-4">
              <div>
                <div className="text-gray-600 text-sm">Horas</div>
                <div className="text-xl font-bold text-green-600">
                  R$ {pricing.basePrice?.toFixed(2) || '0,00'}
                </div>
              </div>
              <div>
                <div className="text-gray-600 text-sm">Extras + Taxa</div>
                <div className="text-xl font-bold text-orange-600">
                  R$ {(pricing.percentualExtrasTotal + pricing.taxValue + pricing.fixedExtrasTotal)?.toFixed(2) || '0,00'}
                </div>
              </div>
              <div>
                <div className="text-gray-600 text-sm font-semibold">TOTAL</div>
                <div className="text-3xl font-bold text-green-700">
                  R$ {pricing.finalPrice?.toFixed(2) || '0,00'}
                </div>
              </div>
            </div>
            <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
              Agendar Agora
            </button>
          </div>
        </div>
      )}

      {/* ===== MODO MÚLTIPLOS LOCAIS ===== */}
      {multipleSitesMode && (
        <div className="space-y-6">
          {sites.map((site, index) => (
            <div key={site.id} className="border-2 border-gray-300 rounded-lg p-6 space-y-4">
              <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold">Local {index + 1}</h3>
                {sites.length > 1 && (
                  <button
                    onClick={() => removeSite(site.id)}
                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Remover
                  </button>
                )}
              </div>

              {/* Localização */}
              <input
                type="text"
                value={site.location}
                onChange={(e) => updateSite(site.id, 'location', e.target.value)}
                placeholder="Casa A, Casa B, Escritório..."
                className="w-full px-3 py-2 border rounded"
              />

              {/* Horas */}
              <div>
                <label className="text-sm font-semibold">Horas: {site.hours}h</label>
                <input
                  type="range"
                  min="1"
                  max="24"
                  step="0.5"
                  value={site.hours}
                  onChange={(e) => updateSite(site.id, 'hours', parseFloat(e.target.value))}
                  className="w-full h-2 bg-green-200 rounded-lg"
                />
              </div>

              {/* Extras para este site */}
              <div className="space-y-2">
                {extras.map(extra => (
                  <label key={extra.id} className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={site.extras.includes(extra.id)}
                      onChange={() => toggleSiteExtra(site.id, extra.id)}
                      className="w-4 h-4"
                    />
                    {extra.name}
                  </label>
                ))}
              </div>

              {/* Preço desse site */}
              <div className="bg-gray-50 p-3 rounded">
                <div className="text-right">
                  <div className="text-sm text-gray-600">Subtotal:</div>
                  <div className="text-lg font-bold text-green-600">
                    R$ {calculateSimplePrice(site.hours, site.extras).finalPrice.toFixed(2)}
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Botão Adicionar Local */}
          <button
            onClick={addSite}
            className="w-full px-4 py-3 border-2 border-green-600 text-green-600 font-bold rounded-lg hover:bg-green-50"
          >
            + Adicionar Outro Local
          </button>

          {/* Modo de Pagamento */}
          <div className="bg-blue-50 border-2 border-blue-600 rounded-lg p-6">
            <h4 className="font-bold mb-4">Forma de Pagamento:</h4>
            <div className="space-y-3">
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="individual"
                  checked={paymentMode === 'individual'}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-5 h-5"
                />
                <div>
                  <div className="font-semibold">Pagamentos Separados</div>
                  <div className="text-sm text-gray-600">Uma transação por local</div>
                </div>
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="radio"
                  name="payment"
                  value="combined"
                  checked={paymentMode === 'combined'}
                  onChange={(e) => setPaymentMode(e.target.value)}
                  className="w-5 h-5"
                />
                <div>
                  <div className="font-semibold">Pagamento Único</div>
                  <div className="text-sm text-gray-600">Uma transação para todos locais</div>
                </div>
              </label>
            </div>
          </div>

          {/* Resumo Total */}
          <div className="bg-green-50 border-2 border-green-600 rounded-lg p-6">
            <div className="text-center mb-6">
              <div className="text-gray-600 text-sm">TOTAL {paymentMode === 'combined' ? '(Um Pagamento)' : '(Múltiplos Pagamentos)'}</div>
              <div className="text-4xl font-bold text-green-700">
                R$ {pricing.totalPrice?.toFixed(2) || '0,00'}
              </div>
            </div>
            <button className="w-full bg-green-600 text-white font-bold py-3 rounded-lg hover:bg-green-700 transition">
              Agendar Agora
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default HourPriceCalculator;
