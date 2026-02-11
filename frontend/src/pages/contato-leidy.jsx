import React, { useState } from 'react';
import Head from 'next/head';
import LeidyHeader from '../components/Layout/LeidyHeader';
import LeidyFooter from '../components/Layout/LeidyFooter';

export default function Contato() {
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simular envio do formulário
    setTimeout(() => {
      setFormSubmitted(true);
      setLoading(false);
      e.target.reset();
      setTimeout(() => setFormSubmitted(false), 3000);
    }, 1000);
  };

  return (
    <>
      <Head>
        <title>Contato - Leidy Cleaner</title>
        <meta name="description" content="Entre em contato conosco para solicitar um orçamento ou tirar dúvidas" />
      </Head>

      <LeidyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-green-50">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-green-900 mb-4">
            Entre em Contato
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Estamos prontos para atender suas necessidades de limpeza
          </p>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-3xl font-bold text-green-900 mb-8">Fale Conosco</h2>
              <p className="text-gray-700 mb-8 leading-relaxed">
                Estamos prontos para atender suas necessidades de limpeza. Entre em contato para solicitar um orçamento ou tirar suas dúvidas. Nossa equipe responderá o mais breve possível.
              </p>

              <div className="space-y-8">
                {/* Address */}
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 bg-green-400 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xl">
                    <i className="fas fa-map-marker-alt"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Endereço</h3>
                    <p className="text-gray-700">Rua Limpeza, 123 - Centro</p>
                    <p className="text-gray-700">São Paulo - SP, 01000-000</p>
                  </div>
                </div>

                {/* Phone */}
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 bg-green-400 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xl">
                    <i className="fas fa-phone"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Telefone</h3>
                    <p className="text-gray-700">(11) 99999-9999</p>
                    <p className="text-gray-700">Atendimento 24h para emergências</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 bg-green-400 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xl">
                    <i className="fas fa-envelope"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">E-mail</h3>
                    <p className="text-gray-700">contato@leidycleaner.com.br</p>
                    <p className="text-gray-700">Resposta rápida garantida</p>
                  </div>
                </div>

                {/* Hours */}
                <div className="flex gap-4 items-start">
                  <div className="w-14 h-14 bg-green-400 rounded-full flex items-center justify-center text-white flex-shrink-0 text-xl">
                    <i className="fas fa-clock"></i>
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-green-900 mb-2">Horário</h3>
                    <p className="text-gray-700">Segunda a Sexta: 8h às 18h</p>
                    <p className="text-gray-700">Sábado: 8h às 12h</p>
                    <p className="text-gray-700">Domingo: Fechado</p>
                  </div>
                </div>
              </div>

              {/* Social Media */}
              <div className="mt-8">
                <h3 className="text-lg font-bold text-green-900 mb-4">Nos acompanhe</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition transform hover:-translate-y-1">
                    <i className="fab fa-facebook-f"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition transform hover:-translate-y-1">
                    <i className="fab fa-instagram"></i>
                  </a>
                  <a href="#" className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center text-white hover:bg-green-700 transition transform hover:-translate-y-1">
                    <i className="fab fa-whatsapp"></i>
                  </a>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className="bg-gray-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-green-900 mb-6">Envie uma Mensagem</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Nome</label>
                  <input 
                    type="text" 
                    placeholder="Seu nome completo" 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">E-mail</label>
                  <input 
                    type="email" 
                    placeholder="seu@email.com" 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Telefone</label>
                  <input 
                    type="tel" 
                    placeholder="(11) 99999-9999" 
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                  />
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Serviço de Interesse</label>
                  <select 
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition"
                  >
                    <option>Selecione um serviço</option>
                    <option>Limpeza Residencial</option>
                    <option>Limpeza Comercial</option>
                    <option>Limpeza de Estofados</option>
                    <option>Limpeza de Vidros</option>
                    <option>Limpeza Pós-Obra</option>
                    <option>Outro</option>
                  </select>
                </div>

                <div>
                  <label className="block text-gray-700 font-semibold mb-2">Mensagem</label>
                  <textarea 
                    placeholder="Descreva sua necessidade de limpeza..." 
                    rows="6"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 transition resize-none"
                  ></textarea>
                </div>

                <button 
                  type="submit"
                  disabled={loading}
                  className="w-full px-6 py-3 bg-green-700 text-white font-semibold rounded-lg hover:bg-green-900 transition disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Enviando...' : 'Enviar Mensagem'}
                </button>

                {formSubmitted && (
                  <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg text-center font-semibold">
                    ✓ Obrigado! Entraremos em contato em breve.
                  </div>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-3xl font-bold text-green-900 mb-8 text-center">Nossa Localização</h2>
          <div className="rounded-lg overflow-hidden shadow-lg h-96 bg-gray-300 flex items-center justify-center">
            <div className="text-center">
              <i className="fas fa-map-marked text-6xl text-green-700 mb-4 block"></i>
              <p className="text-gray-700 font-semibold">Mapa interativo</p>
              <p className="text-gray-600 text-sm">Rua Limpeza, 123 - Centro, São Paulo - SP</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-900 mb-4 relative pb-4">
            Perguntas Frequentes
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-500"></span>
          </h2>
          
          <div className="space-y-4 mt-12">
            {[
              {
                q: 'Qual é o valor mínimo para contratação?',
                a: 'Não temos valor mínimo. Podemos atender desde pequenos serviços pontuais até limpezas regulares.'
              },
              {
                q: 'Como funciona o agendamento?',
                a: 'Você pode agendar por telefone, e-mail ou através de nosso formulário de contato. Faremos o melhor possível para atender no horário desejado.'
              },
              {
                q: 'Vocês aceitam pagamento via cartão?',
                a: 'Sim, aceitamos cartão de crédito, débito, PIX e dinheiro.'
              },
              {
                q: 'Preciso estar em casa durante a limpeza?',
                a: 'Não. Você pode deixar a chave conosco ou estabelecer um horário em que alguém esteja disponível.'
              }
            ].map((item, idx) => (
              <details key={idx} className="bg-gray-50 rounded-lg p-4 cursor-pointer border border-green-200 hover:bg-gray-100 transition">
                <summary className="font-bold text-green-900 flex items-center justify-between">
                  {item.q}
                  <i className="fas fa-chevron-down"></i>
                </summary>
                <p className="text-gray-700 mt-3">{item.a}</p>
              </details>
            ))}
          </div>
        </div>
      </section>

      <LeidyFooter />
    </>
  );
}
