import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import LeidyHeader from '../components/Layout/LeidyHeader';
import LeidyFooter from '../components/Layout/LeidyFooter';

export default function Servicos() {
  const services = [
    {
      id: 1,
      icon: 'fa-home',
      title: 'Limpeza Residencial',
      description: 'Serviço completo para sua casa com atenção aos detalhes',
      details: [
        'Limpeza diária, semanal ou mensal',
        'Salas, quartos, cozinha e banheiros',
        'Produtos eco-friendly',
        'Equipe treinada e comprometida'
      ],
      price: 'A partir de R$ 150/hora'
    },
    {
      id: 2,
      icon: 'fa-building',
      title: 'Limpeza Comercial',
      description: 'Ambientes empresariais sempre limpos e organizados',
      details: [
        'Escritórios e salas comerciais',
        'Lojas e pontos de venda',
        'Escalas personalizadas',
        'Relatórios de serviço'
      ],
      price: 'Orçamento personalizado'
    },
    {
      id: 3,
      icon: 'fa-couch',
      title: 'Limpeza de Estofados',
      description: 'Sofás, cadeiras e colchões impecáveis',
      details: [
        'Limpeza profunda com vapor',
        'Remoção de manchas',
        'Desinfecção completa',
        'Secagem rápida'
      ],
      price: 'Consulte para orçamento'
    },
    {
      id: 4,
      icon: 'fa-window-restore',
      title: 'Limpeza de Vidros',
      description: 'Janelas, portas e fachadas brilhando',
      details: [
        'Janelas e portas de vidro',
        'Fachadas de vidro',
        'Vidros especiais',
        'Segurança garantida'
      ],
      price: 'A partir de R$ 100/hora'
    },
    {
      id: 5,
      icon: 'fa-hammer',
      title: 'Limpeza Pós-Obra',
      description: 'Prepare seu imóvel após reformas',
      details: [
        'Remoção de resíduos',
        'Limpeza profunda',
        'Eliminação de pó',
        'Acabamento impecável'
      ],
      price: 'Orçamento personalizado'
    },
    {
      id: 6,
      icon: 'fa-leaf',
      title: 'Limpeza Ecológica',
      description: 'Segura para a sua família e para o planeta',
      details: [
        'Produtos biodegradáveis',
        'Sem químicos agressivos',
        'Seguro para crianças e pets',
        'Sustentável'
      ],
      price: 'Consulte nossos preços'
    }
  ];

  return (
    <>
      <Head>
        <title>Serviços - Leidy Cleaner</title>
        <meta name="description" content="Conheça todos os serviços de limpeza profissional oferecidos pela Leidy Cleaner" />
      </Head>

      <LeidyHeader />

      {/* Hero Section */}
      <section className="pt-24 pb-12 bg-green-50\">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold text-green-900 mb-4">
            Nossos Serviços
          </h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Uma completa gama de serviços de limpeza profissional para atender todas as suas necessidades
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service) => (
              <div key={service.id} className="bg-white rounded-lg shadow-lg hover:shadow-xl transition p-8 border-t-4 border-green-500">
                <i className={`fas ${service.icon} text-5xl text-green-700 mb-4 block`}></i>
                <h3 className="text-2xl font-bold text-green-900 mb-2">{service.title}</h3>
                <p className="text-gray-600 mb-4">{service.description}</p>
                
                <ul className="space-y-2 mb-6">
                  {service.details.map((detail, idx) => (
                    <li key={idx} className="text-gray-700 flex items-center gap-2">
                      <i className="fas fa-check text-green-500"></i>
                      {detail}
                    </li>
                  ))}
                </ul>
                
                <p className="font-bold text-green-700 mb-4">{service.price}</p>
                <Link href="/contato" className="inline-block px-6 py-2 bg-green-700 text-white font-semibold rounded-full hover:bg-green-900 transition">
                  Solicitar Orçamento
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gray-100">
        <div className="max-w-6xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-green-900 mb-4 relative pb-4">
            Por que escolher a Leidy Cleaner?
            <span className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-green-500"></span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
            {[
              { icon: 'fa-star', title: 'Qualidade', desc: 'Serviços de excelente qualidade sempre' },
              { icon: 'fa-award', title: 'Experiência', desc: 'Mais de 10 anos no mercado' },
              { icon: 'fa-users', title: 'Profissionais', desc: 'Equipe treinada e dedicada' },
              { icon: 'fa-shield-alt', title: 'Confiança', desc: 'Satisfação garantida' }
            ].map((item, idx) => (
              <div key={idx} className="bg-white p-6 text-center rounded-lg shadow">
                <i className={`fas ${item.icon} text-4xl text-green-500 mb-3 block`}></i>
                <h3 className="font-bold text-green-900 mb-2">{item.title}</h3>
                <p className="text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-green-700 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">Pronto para um ambiente impecável?</h2>
          <p className="text-xl mb-8 opacity-90">
            Solicite seu orçamento gratuito hoje mesmo
          </p>
          <Link href="/contato" className="inline-block px-8 py-3 bg-white text-green-700 font-bold rounded-full hover:bg-gray-100 transition">
            Fale com a gente
          </Link>
        </div>
      </section>

      <LeidyFooter />
    </>
  );
}
