import React, { useState, useEffect } from 'react';

const PriceCalculator = () => {
  const [serviceType, setServiceType] = useState('residencial');
  const [area, setArea] = useState(50);
  const [frequency, setFrequency] = useState('unico');
  const [extras, setExtras] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  const services = {
    residencial: { basePrice: 150, pricePerM2: 2 },
    comercial: { basePrice: 300, pricePerM2: 3 },
    profunda: { basePrice: 250, pricePerM2: 4 },
    vidros: { basePrice: 100, pricePerM2: 1.5 }
  };

  const frequencies = {
    unico: 1,
    semanal: 0.9, // 10% desconto
    quinzenal: 0.95, // 5% desconto
    mensal: 0.85 // 15% desconto
  };

  const extraServices = [
    { id: 'aromatizacao', name: 'Aromatização', price: 30 },
    { id: 'desinfecção', name: 'Desinfecção Profunda', price: 50 },
    { id: 'moveis', name: 'Limpeza de Móveis', price: 80 },
    { id: 'jardim', name: 'Limpeza de Jardim', price: 60 }
  ];

  useEffect(() => {
    calculatePrice();
  }, [serviceType, area, frequency, extras]);

  const calculatePrice = () => {
    const service = services[serviceType];
    let price = service.basePrice + (area * service.pricePerM2);
    price *= frequencies[frequency];

    const extrasTotal = extras.reduce((sum, extraId) => {
      const extra = extraServices.find(e => e.id === extraId);
      return sum + (extra ? extra.price : 0);
    }, 0);

    setTotalPrice(Math.round(price + extrasTotal));
  };

  const toggleExtra = (extraId) => {
    setExtras(prev =>
      prev.includes(extraId)
        ? prev.filter(id => id !== extraId)
        : [...prev, extraId]
    );
  };

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-8 shadow-xl border border-gray-200 dark:border-slate-700">
      <div className="text-center mb-8">
        <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          🧮 Calculadora de Preços
        </h3>
        <p className="text-gray-600 dark:text-gray-400">
          Calcule o valor do seu serviço de limpeza
        </p>
      </div>

      <div className="space-y-6">
        {/* Tipo de Serviço */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Tipo de Serviço
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(services).map(([key, service]) => (
              <button
                key={key}
                onClick={() => setServiceType(key)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  serviceType === key
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-slate-600 hover:border-blue-300 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="font-semibold capitalize">
                  {key === 'residencial' ? '🏠 Residencial' :
                   key === 'comercial' ? '🏢 Comercial' :
                   key === 'profunda' ? '✨ Profunda' : '🪟 Vidros'}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Área */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Área (m²): {area}m²
          </label>
          <input
            type="range"
            min="20"
            max="300"
            value={area}
            onChange={(e) => setArea(Number(e.target.value))}
            className="w-full h-2 bg-gray-200 dark:bg-slate-700 rounded-lg appearance-none cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 dark:text-gray-400 mt-1">
            <span>20m²</span>
            <span>300m²</span>
          </div>
        </div>

        {/* Frequência */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Frequência
          </label>
          <div className="grid grid-cols-2 gap-3">
            {Object.entries(frequencies).map(([key, discount]) => (
              <button
                key={key}
                onClick={() => setFrequency(key)}
                className={`p-3 rounded-lg border-2 text-center transition-all ${
                  frequency === key
                    ? 'border-blue-600 bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                    : 'border-gray-300 dark:border-slate-600 hover:border-blue-300 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="font-semibold capitalize">
                  {key === 'unico' ? 'Único' :
                   key === 'semanal' ? 'Semanal' :
                   key === 'quinzenal' ? 'Quinzenal' : 'Mensal'}
                </div>
                {discount < 1 && (
                  <div className="text-xs text-green-600 dark:text-green-400">
                    {Math.round((1 - discount) * 100)}% desconto
                  </div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Serviços Extras */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
            Serviços Extras
          </label>
          <div className="grid grid-cols-2 gap-3">
            {extraServices.map((extra) => (
              <button
                key={extra.id}
                onClick={() => toggleExtra(extra.id)}
                className={`p-3 rounded-lg border-2 text-left transition-all ${
                  extras.includes(extra.id)
                    ? 'border-green-600 bg-green-50 dark:bg-green-900/30 text-green-700 dark:text-green-300'
                    : 'border-gray-300 dark:border-slate-600 hover:border-green-300 text-gray-700 dark:text-gray-300'
                }`}
              >
                <div className="font-semibold text-sm">{extra.name}</div>
                <div className="text-xs">+ R$ {extra.price}</div>
              </button>
            ))}
          </div>
        </div>

        {/* Total */}
        <div className="bg-gradient-to-r from-blue-600 to-cyan-500 rounded-xl p-6 text-white text-center">
          <div className="text-sm opacity-90 mb-2">Valor Estimado</div>
          <div className="text-4xl font-black">
            R$ {totalPrice.toLocaleString('pt-BR')}
          </div>
          <div className="text-sm opacity-80 mt-2">
            {frequency !== 'unico' && 'por serviço'}
          </div>
        </div>

        {/* CTA */}
        <button className="w-full py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold rounded-lg hover:shadow-lg transition-all">
          Agendar Este Serviço
        </button>
      </div>
    </div>
  );
};

export default PriceCalculator;