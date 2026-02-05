import React, { useEffect } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import AOS from 'aos'
import 'aos/dist/aos.css'
import Header from '../components/Layout/Header'
import Footer from '../components/Layout/Footer'
import PriceCalculator from '../components/UI/PriceCalculator'
import FAQ from '../components/UI/FAQ'
import BlogSection from '../components/UI/BlogSection'

export default function Home() {
  useEffect(() => {
    AOS.init({
      duration: 800,
      offset: 100,
      once: true,
      easing: 'ease-out-cubic'
    })
  }, [])

  const testimonials = [
    {
      name: 'Maria Silva',
      text: 'Minha casa nunca ficou tao limpa! Profissionais muito atenciosos.',
      rating: 5
    },
    {
      name: 'Ana Costa',
      text: 'Servico rapido e impeccavel. Super recomendo!',
      rating: 5
    },
    {
      name: 'Joao Santos',
      text: 'Melhor escolha que ja fiz. Equipe sempre pontual.',
      rating: 5
    }
  ]

  const services = [
    {
      icon: '🏠',
      title: 'Limpeza Residencial',
      desc: 'Limpeza completa para apartamentos e casas'
    },
    {
      icon: '🏢',
      title: 'Limpeza Comercial',
      desc: 'Escritorios, lojas e espacos corporativos'
    },
    {
      icon: '✨',
      title: 'Limpeza Pos-Mudanca',
      desc: 'Preparacao de imovel apos mudanca'
    },
    {
      icon: '🔄',
      title: 'Manutencao Periodica',
      desc: 'Limpeza regular semanal ou mensal'
    }
  ]

  return (
    <>
      <Head>
        <title>Leidy Cleaner - Limpeza Profissional em Porto Alegre | Serviços Premium</title>
        <meta name="description" content="Limpeza profissional residencial e comercial em Porto Alegre. Serviços premium com profissionais verificados, produtos eco-friendly e garantia de satisfação. Agende online!" />
        <meta name="keywords" content="limpeza profissional Porto Alegre, diarista, faxina, limpeza residencial, limpeza comercial, limpeza pós obra, produtos ecofriendly" />
        <meta name="author" content="Leidy Cleaner" />
        <meta name="robots" content="index, follow" />
        <meta name="language" content="pt-BR" />
        <meta name="revisit-after" content="7 days" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        {/* Open Graph / Facebook */}
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://leidycleaner.com/" />
        <meta property="og:title" content="Leidy Cleaner - Limpeza Profissional em Porto Alegre" />
        <meta property="og:description" content="Limpeza profissional residencial e comercial em Porto Alegre. Serviços premium com profissionais verificados." />
        <meta property="og:image" content="https://leidycleaner.com/og-image.jpg" />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://leidycleaner.com/" />
        <meta property="twitter:title" content="Leidy Cleaner - Limpeza Profissional em Porto Alegre" />
        <meta property="twitter:description" content="Limpeza profissional residencial e comercial em Porto Alegre. Serviços premium com profissionais verificados." />
        <meta property="twitter:image" content="https://leidycleaner.com/og-image.jpg" />

        {/* Local Business Schema */}
        <script type="application/ld+json">
          {JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            "name": "Leidy Cleaner",
            "description": "Serviços profissionais de limpeza residencial e comercial em Porto Alegre",
            "url": "https://leidycleaner.com",
            "telephone": "+55-51-98030-3740",
            "address": {
              "@type": "PostalAddress",
              "addressLocality": "Porto Alegre",
              "addressRegion": "RS",
              "addressCountry": "BR"
            },
            "geo": {
              "@type": "GeoCoordinates",
              "latitude": "-30.0346",
              "longitude": "-51.2177"
            },
            "openingHours": "Mo-Su 08:00-18:00",
            "priceRange": "$$",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.9",
              "reviewCount": "500"
            },
            "serviceType": ["Limpeza Residencial", "Limpeza Comercial", "Limpeza Profunda"]
          })}
        </script>
      </Head>

      <div className="min-h-screen flex flex-col bg-white dark:bg-slate-900">
        <Header />
        <main className="flex-grow">
          {/* Hero Section */}
          <section className="relative bg-gradient-to-br from-blue-600 via-blue-500 to-cyan-500 dark:from-blue-900 dark:via-blue-800 dark:to-cyan-900 pt-20 pb-32 sm:pt-32 sm:pb-48 overflow-hidden">
            {/* Decorative elements */}
            <div className="absolute top-10 right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl"></div>

            <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-white">
                  <div className="space-y-4">
                    <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold leading-tight">
                      Sua Casa Merece<br />o Melhor
                    </h1>
                    <p className="text-xl sm:text-2xl text-blue-100 font-light">
                      Limpeza profissional com profissionais verificados, transparencia de precos e suporte 24/7.
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-4 pt-4">
                    <Link href="/agendar">
                      <div className="bg-white text-blue-600 font-bold py-4 px-8 rounded-lg hover:bg-gray-100 transition-all text-center text-lg shadow-xl hover:shadow-2xl inline-flex items-center justify-center gap-2">
                        <span>📅</span>
                        Agendar Limpeza
                      </div>
                    </Link>
                    <Link href="/servicos">
                      <div className="border-2 border-white text-white font-bold py-4 px-8 rounded-lg hover:bg-white/10 transition-all text-center text-lg inline-flex items-center justify-center gap-2">
                        <span>✨</span>
                        Ver Servicos
                      </div>
                    </Link>
                  </div>

                  <div className="flex flex-col sm:flex-row gap-6 pt-6 text-sm">
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">⭐</span>
                      <span>4.9/5 - 500+ Clientes</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-2xl">✓</span>
                      <span>Profissionais Verificados</span>
                    </div>
                  </div>
                </div>

                <div className="hidden lg:block relative">
                  <div className="relative w-full aspect-square">
                    <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl backdrop-blur-md border border-white/30 flex items-center justify-center">
                      <div className="text-center">
                        <div className="text-8xl mb-4">✨</div>
                        <p className="text-white text-xl font-semibold">Limpeza Premium</p>
                        <p className="text-blue-100">Resultados Garantidos</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-gray-50 dark:bg-slate-800 py-16 sm:py-24">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
                {[
                  { number: '2000+', label: 'Limpezas Realizadas' },
                  { number: '500+', label: 'Clientes Felizes' },
                  { number: '50+', label: 'Profissionais' },
                  { number: '24/7', label: 'Suporte' }
                ].map((stat, i) => (
                  <div key={i} className="py-4">
                    <div className="text-4xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                      {stat.number}
                    </div>
                    <div className="text-gray-600 dark:text-gray-400">
                      {stat.label}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Services Section */}
          <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  Nossos Servicos
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                  Solucoes completas de limpeza para sua casa ou empresa
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {services.map((service, i) => (
                  <div key={i} className="group" data-aos="fade-up" data-aos-delay={i * 100}>
                    <div className="bg-white dark:bg-slate-800 rounded-xl p-8 hover:shadow-lg transition-all duration-300 h-full border border-gray-200 dark:border-slate-700 hover:border-blue-400 dark:hover:border-blue-500">
                      <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                        {service.icon}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {service.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {service.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Price Calculator Section */}
          <section className="py-20 sm:py-32 bg-gray-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <div className="text-center mb-12" data-aos="fade-up">
                  <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                    Calcule Seu Orçamento
                  </h2>
                  <p className="text-xl text-gray-600 dark:text-gray-400">
                    Descubra o valor exato do seu serviço de limpeza
                  </p>
                </div>
                <div data-aos="fade-up" data-aos-delay="200">
                  <PriceCalculator />
                </div>
              </div>
            </div>
          </section>

          {/* Why Choose Us */}
          <section className="bg-blue-50 dark:bg-slate-800 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center" data-aos="fade-up">
                Por que Escolher Leidy Cleaner?
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                {[
                  {
                    title: 'Profissionais Verificados',
                    desc: 'Todos os profissionais sao verificados, treinados e segurados. Sua seguranca e nossa prioridade.'
                  },
                  {
                    title: 'Precos Transparentes',
                    desc: 'Nenhuma taxa oculta. Orcamento honesto e competitivo sem surpresas.'
                  },
                  {
                    title: 'Garantia de Satisfacao',
                    desc: 'Nao ficou satisfeito? Refazemos o trabalho sem custo adicional.'
                  },
                  {
                    title: 'Agendamento Facil',
                    desc: 'Reserve online em minutos. Confirmacao instantanea e lembretes automaticos.'
                  }
                ].map((item, i) => (
                  <div key={i} className="flex gap-6" data-aos="fade-up" data-aos-delay={i * 100}>
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-xl bg-blue-600 text-white text-xl font-bold">
                        ✓
                      </div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Advanced Features */}
          <section className="py-20 sm:py-32 bg-gradient-to-br from-purple-50 to-pink-50 dark:from-slate-900 dark:to-slate-800">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-16" data-aos="fade-up">
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4">
                  ✨ Recursos Avançados
                </h2>
                <p className="text-xl text-gray-600 dark:text-gray-400">
                  Tecnologia de ponta para uma experiência excepcional
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {[
                  {
                    icon: '🎫',
                    title: 'Cupons Exclusivos',
                    desc: 'Ganhe descontos especiais em cada serviço realizado'
                  },
                  {
                    icon: '🔄',
                    title: 'Agendamento Recorrente',
                    desc: 'Configure limpezas automáticas semanais ou mensais'
                  },
                  {
                    icon: '⭐',
                    title: 'Programa de Fidelidade',
                    desc: 'Acumule pontos e troque por serviços gratuitos'
                  },
                  {
                    icon: '🔔',
                    title: 'Notificações Inteligentes',
                    desc: 'Lembretes automáticos e atualizações em tempo real'
                  }
                ].map((feature, i) => (
                  <div
                    key={i}
                    className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                    data-aos="fade-up"
                    data-aos-delay={i * 100}
                  >
                    <div className="text-4xl mb-4">{feature.icon}</div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                      {feature.title}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-400">
                      {feature.desc}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* How It Works */}
          <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center">
                Como Funciona
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { step: '1', title: 'Escolha', desc: 'Selecione o servico e horario' },
                  { step: '2', title: 'Confirme', desc: 'Revise e confirme o agendamento' },
                  { step: '3', title: 'Pague', desc: 'Pagamento seguro online' },
                  { step: '4', title: 'Aproveite', desc: 'Desfrute de uma casa limpa' }
                ].map((item, i) => (
                  <div key={i}>
                    <div className="relative mb-6">
                      <div className="w-16 h-16 bg-blue-600 text-white rounded-full flex items-center justify-center text-2xl font-bold mx-auto shadow-lg">
                        {item.step}
                      </div>
                      {i < 3 && (
                        <div className="hidden md:block absolute top-8 left-[60%] w-[80%] h-1 bg-blue-200 dark:bg-slate-600"></div>
                      )}
                    </div>
                    <div className="text-center">
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-400">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="bg-gray-50 dark:bg-slate-800 py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-16 text-center" data-aos="fade-up">
                O que Nossos Clientes Dizem
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {testimonials.map((testimonial, i) => (
                  <div key={i} className="bg-white dark:bg-slate-700 rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow" data-aos="fade-up" data-aos-delay={i * 100}>
                    <div className="flex items-center gap-1 mb-4">
                      {[...Array(testimonial.rating)].map((_, j) => (
                        <span key={j} className="text-yellow-400 text-xl">★</span>
                      ))}
                    </div>
                    <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
                      "{testimonial.text}"
                    </p>
                    <div className="font-semibold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                      Cliente verificado
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Pricing Section */}
          <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 dark:text-white mb-4 text-center">
                Precos Competitivos
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-400 text-center mb-16 max-w-2xl mx-auto">
                Limpeza profissional nao precisa ser cara. Confira nossos precos
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {[
                  { name: 'Limpeza Rapida', price: 'R$ 160', size: 'Ate 50m²', features: ['Cozinha', 'Banheiro', 'Sala'] },
                  { name: 'Limpeza Completa', price: 'R$ 300', size: 'Ate 100m²', features: ['Todos os comodos', 'Limpeza profunda', 'Organiza cao'], featured: true },
                  { name: 'Pos-Mudanca', price: 'R$ 500', size: 'Ate 200m²', features: ['Limpeza total', 'Janelas', 'Rodapes'] }
                ].map((plan, i) => (
                  <div key={i} className={`rounded-2xl p-8 transition-all ${
                    plan.featured 
                      ? 'bg-blue-600 text-white shadow-2xl scale-105 dark:bg-blue-700' 
                      : 'bg-white dark:bg-slate-800 border border-gray-200 dark:border-slate-700'
                  }`}>
                    <h3 className="text-2xl font-bold mb-2">{plan.name}</h3>
                    <p className={`text-sm mb-4 ${plan.featured ? 'text-blue-100' : 'text-gray-600 dark:text-gray-400'}`}>
                      {plan.size}
                    </p>
                    <div className="text-4xl font-bold mb-6">{plan.price}</div>
                    <ul className="space-y-3 mb-8">
                      {plan.features.map((feature, j) => (
                        <li key={j} className={`flex items-center gap-2 ${plan.featured ? 'text-blue-100' : ''}`}>
                          <span>✓</span> {feature}
                        </li>
                      ))}
                    </ul>
                    <Link href="/agendar">
                      <div className={`w-full py-3 rounded-lg font-bold transition-colors text-center inline-flex items-center justify-center gap-2 ${
                        plan.featured
                          ? 'bg-white text-blue-600 hover:bg-gray-100'
                          : 'bg-blue-600 text-white hover:bg-blue-700'
                      }`}>
                        <span>📅</span>
                        Agendar Agora
                      </div>
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* FAQ Section */}
          <section className="py-20 sm:py-32">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <FAQ />
            </div>
          </section>

          {/* Blog Section */}
          <section className="py-20 sm:py-32 bg-gray-50 dark:bg-slate-900">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <BlogSection />
            </div>
          </section>

          {/* Final CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-cyan-500 dark:from-blue-800 dark:to-cyan-800 py-20 sm:py-32 text-white">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <h2 className="text-4xl sm:text-5xl font-bold mb-6">
                Pronto para uma Casa Limpa e Organizada?
              </h2>
              <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
                Agora e a hora. Agende sua primeira limpeza e receba 10% de desconto.
              </p>
              <Link href="/agendar">
                <div className="inline-flex items-center gap-3 bg-white text-blue-600 font-bold py-4 px-12 rounded-lg hover:bg-gray-100 transition-colors text-lg shadow-xl hover:shadow-2xl hover:scale-105">
                  <span className="text-2xl">✨</span>
                  Agendar Primeira Limpeza
                  <span className="text-2xl">→</span>
                </div>
              </Link>
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </>
  )
}
