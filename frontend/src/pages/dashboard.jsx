import React, { useState } from 'react';
import Link from 'next/link';
import Head from 'next/head';
import { LoyaltyCard } from '../components/UI/LoyaltySystem';
import ReferralSystem from '../components/UI/ReferralSystem';

/**
 * Página Dashboard - Visualizar agendamentos e perfil
 */
export default function Dashboard() {
  const [activeTab, setActiveTab] = useState('bookings');

  // Mock data
  const bookings = [
    {
      id: 1,
      service: 'Limpeza Residencial',
      date: '2024-01-15',
      time: '14:00',
      address: 'Rua A, 123',
      status: 'confirmado',
      price: 150,
      icon: '🏠'
    },
    {
      id: 2,
      service: 'Limpeza de Vidros',
      date: '2024-01-20',
      time: '10:00',
      address: 'Rua B, 456',
      status: 'pendente',
      price: 100,
      icon: '🪟'
    },
    {
      id: 3,
      service: 'Limpeza Profunda',
      date: '2024-01-25',
      time: '09:00',
      address: 'Rua C, 789',
      status: 'concluído',
      price: 250,
      icon: '✨'
    }
  ];

  const userProfile = {
    name: 'João Silva',
    email: 'joao@example.com',
    phone: '+55 51 98030-3740',
    address: 'Porto Alegre, RS',
    joinDate: '2023-10-15',
    totalBookings: 8,
    totalSpent: 'R$ 1.200,00',
    rating: 4.8
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-50 dark:bg-green-900/20 text-green-700 dark:text-green-300 border border-green-200 dark:border-green-700';
      case 'pendente':
        return 'bg-yellow-50 dark:bg-yellow-900/20 text-yellow-700 dark:text-yellow-300 border border-yellow-200 dark:border-yellow-700';
      case 'concluído':
        return 'bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-700';
      default:
        return 'bg-gray-50 dark:bg-gray-900/20 text-gray-700 dark:text-gray-300';
    }
  };

  const getStatusLabel = (status) => {
    const labels = {
      confirmado: '✓ Confirmado',
      pendente: '⏳ Pendente',
      concluído: '✓ Concluído'
    };
    return labels[status] || status;
  };

  return (
    <>
      <Head>
        <title>Dashboard - Leidy Cleaner</title>
        <meta name="description" content="Gerenciar seus agendamentos e perfil na Leidy Cleaner" />
      </Head>

      <main className="min-h-screen bg-gradient-to-b from-white to-gray-50 dark:from-slate-900 dark:to-slate-950">
        {/* Header */}
        <header className="sticky top-0 z-40 bg-white dark:bg-slate-900 border-b border-gray-200 dark:border-slate-700">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
            <Link href="/">
              <div className="flex items-center gap-3 hover:opacity-80 transition-opacity">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-cyan-500 rounded-xl flex items-center justify-center text-white font-bold text-2xl">
                  🧹
                </div>
                <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                  Leidy Cleaner
                </h1>
              </div>
            </Link>
            <button className="px-6 py-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-bold hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">
              Sair
            </button>
          </div>
        </header>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Welcome Section */}
          <div className="mb-12">
            <h2 className="text-4xl font-black text-gray-900 dark:text-white mb-2">
              Bem-vindo, {userProfile.name}! 👋
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              Gerencie seus agendamentos e perfil abaixo
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            {/* Stats Cards */}
            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">📅 Total de Agendamentos</p>
              <p className="text-4xl font-black text-blue-600 dark:text-blue-400 mb-2">
                {userProfile.totalBookings}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Dos quais 1 está pendente
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">💰 Total Gasto</p>
              <p className="text-4xl font-black text-green-600 dark:text-green-400 mb-2">
                {userProfile.totalSpent}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Em todos os serviços
              </p>
            </div>

            <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
              <p className="text-gray-600 dark:text-gray-400 font-semibold mb-2">⭐ Avaliação</p>
              <p className="text-4xl font-black text-yellow-600 dark:text-yellow-400 mb-2">
                {userProfile.rating}
              </p>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                De satisfação com serviços
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="mb-8">
            <div className="flex gap-4 border-b border-gray-200 dark:border-slate-700">
              <button
                onClick={() => setActiveTab('bookings')}
                className={`px-6 py-3 font-bold border-b-2 transition-all ${
                  activeTab === 'bookings'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                📅 Meus Agendamentos
              </button>
              <button
                onClick={() => setActiveTab('profile')}
                className={`px-6 py-3 font-bold border-b-2 transition-all ${
                  activeTab === 'profile'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                👤 Meu Perfil
              </button>
              <button
                onClick={() => setActiveTab('referrals')}
                className={`px-6 py-3 font-bold border-b-2 transition-all ${
                  activeTab === 'referrals'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                🎁 Indicações
              </button>
              <button
                onClick={() => setActiveTab('loyalty')}
                className={`px-6 py-3 font-bold border-b-2 transition-all ${
                  activeTab === 'loyalty'
                    ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                    : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                ⭐ Programa de Fidelidade
              </button>
            </div>
          </div>

          {/* Bookings Tab */}
          {activeTab === 'bookings' && (
            <div className="space-y-6">
              {bookings.length > 0 ? (
                <>
                  {bookings.map((booking) => (
                    <div
                      key={booking.id}
                      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700 hover:shadow-xl transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-start gap-4">
                          <div className="text-4xl">{booking.icon}</div>
                          <div className="flex-1">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-1">
                              {booking.service}
                            </h3>
                            <p className="text-gray-600 dark:text-gray-400 flex items-center gap-2">
                              📍 {booking.address}
                            </p>
                          </div>
                        </div>
                        <div className={`px-4 py-2 rounded-lg font-bold text-sm ${getStatusColor(booking.status)}`}>
                          {getStatusLabel(booking.status)}
                        </div>
                      </div>

                      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-6 p-4 bg-gray-50 dark:bg-slate-900 rounded-lg">
                        <div>
                          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                            📅 Data
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {new Date(booking.date).toLocaleDateString('pt-BR')}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                            🕒 Horário
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            {booking.time}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                            💰 Valor
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            R$ {booking.price}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs font-semibold text-gray-600 dark:text-gray-400 mb-1">
                            ID Agendamento
                          </p>
                          <p className="font-bold text-gray-900 dark:text-white">
                            #{String(booking.id).padStart(4, '0')}
                          </p>
                        </div>
                      </div>

                      <div className="flex gap-3">
                        <button className="flex-1 px-4 py-2 rounded-lg border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors">
                          Editar
                        </button>
                        <button className="flex-1 px-4 py-2 rounded-lg bg-red-100 dark:bg-red-900/20 text-red-700 dark:text-red-400 font-bold hover:bg-red-200 dark:hover:bg-red-900/30 transition-colors">
                          Cancelar
                        </button>
                      </div>
                    </div>
                  ))}

                  <Link href="/agendar">
                    <div className="block w-full px-8 py-4 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold text-center hover:shadow-lg hover:scale-105 transition-all">
                      + Agendar Novo Serviço
                    </div>
                  </Link>
                </>
              ) : (
                <div className="text-center py-12 bg-gray-50 dark:bg-slate-800 rounded-xl border-2 border-dashed border-gray-300 dark:border-slate-600">
                  <p className="text-4xl mb-4">📅</p>
                  <p className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    Nenhum agendamento
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 mb-6">
                    Você ainda não tem nenhum agendamento. Faça seu primeiro agora!
                  </p>
                  <Link href="/agendar">
                    <div className="inline-flex items-center gap-2 px-8 py-3 rounded-lg bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-bold hover:shadow-lg transition-all">
                      <span>📅</span>
                      Agendar Serviço
                    </div>
                  </Link>
                </div>
              )}
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Informações Pessoais
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      Nome Completo
                    </label>
                    <input
                      type="text"
                      value={userProfile.name}
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      value={userProfile.email}
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      Telefone
                    </label>
                    <input
                      type="tel"
                      value={userProfile.phone}
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white bg-gray-50"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">
                      Endereço
                    </label>
                    <input
                      type="text"
                      value={userProfile.address}
                      readOnly
                      className="w-full px-4 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 dark:bg-slate-700 dark:text-white bg-gray-50"
                    />
                  </div>
                </div>

                <div className="flex gap-4">
                  <button className="px-8 py-3 rounded-lg bg-blue-600 text-white font-bold hover:bg-blue-700 transition-colors">
                    Editar Perfil
                  </button>
                  <button className="px-8 py-3 rounded-lg border-2 border-gray-300 dark:border-slate-600 text-gray-700 dark:text-gray-300 font-bold hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors">
                    Mudar Senha
                  </button>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800 rounded-xl p-8 shadow-lg border border-gray-200 dark:border-slate-700">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Histórico de Conta
                </h3>

                <div className="space-y-4">
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
                    <p className="text-gray-600 dark:text-gray-400">Membro desde</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {new Date(userProfile.joinDate).toLocaleDateString('pt-BR', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pb-4 border-b border-gray-200 dark:border-slate-700">
                    <p className="text-gray-600 dark:text-gray-400">Total de Agendamentos</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {userProfile.totalBookings}
                    </p>
                  </div>
                  <div className="flex justify-between items-center">
                    <p className="text-gray-600 dark:text-gray-400">Total Gasto</p>
                    <p className="font-bold text-gray-900 dark:text-white">
                      {userProfile.totalSpent}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Referrals Tab */}
          {activeTab === 'referrals' && (
            <ReferralSystem />
          )}

          {/* Loyalty Tab */}
          {activeTab === 'loyalty' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  🎉 Programa de Fidelidade Leidy Cleaner
                </h3>
                <p className="text-gray-600 dark:text-gray-400">
                  Ganhe pontos a cada serviço e troque por descontos exclusivos
                </p>
              </div>
              <LoyaltyCard />
            </div>
          )}
        </div>
      </main>
    </>
  );
}
