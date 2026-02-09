import React, { useEffect, useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import Header from '../../components/Layout/Header'
import Footer from '../../components/Layout/Footer'

export default function AdminDashboard() {
  const [stats, setStats] = useState({
    totalBookings: 0,
    totalRevenue: 0,
    totalHoursSold: 0,
    pendingBookings: 0
  });
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Buscar stats
      const dashRes = await fetch('/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const dashData = await dashRes.json();
      if (dashData.success) {
        setStats(dashData.stats);
      }

      // Buscar bookings
      const bookRes = await fetch('/api/admin/bookings?limit=10', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      const bookData = await bookRes.json();
      if (bookData.success) {
        setBookings(bookData.bookings);
      }

      setLoading(false);
    } catch (error) {
      console.error('Erro ao carregar dashboard:', error);
      setLoading(false);
    }
  };

  const updateBookingStatus = async (bookingId, newStatus) => {
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`/api/admin/bookings/${bookingId}/status`, {
        method: 'PATCH',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ status: newStatus })
      });
      
      if (res.ok) {
        fetchDashboardData();
      }
    } catch (error) {
      console.error('Erro ao atualizar status:', error);
    }
  };

  return (
    <>
      <Head>
        <title>Admin Dashboard - Leidy Cleaner</title>
        <meta name="robots" content="noindex, nofollow" />
      </Head>

      <div className="min-h-screen bg-gray-900 text-white">
        <Header />
        
        <div className="max-w-7xl mx-auto px-4 py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">📊 Painel Administrativo</h1>
            <p className="text-gray-400">Gerencie bookings, receita e clientes</p>
          </div>

          {/* Stats Cards */}
          {!loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <StatCard
                icon="📅"
                title="Total de Bookings"
                value={stats.totalBookings}
                trend="+12% vs mês anterior"
              />
              <StatCard
                icon="💰"
                title="Receita Total"
                value={`R$ ${parseFloat(stats.totalRevenue).toLocaleString('pt-BR')}`}
                trend="+8% vs mês anterior"
              />
              <StatCard
                icon="⏰"
                title="Horas Vendidas"
                value={`${stats.totalHoursSold}h`}
                trend="+15% vs mês anterior"
              />
              <StatCard
                icon="⏳"
                title="Bookings Pendentes"
                value={stats.pendingBookings}
                trend="Atender hoje"
                variant="warning"
              />
            </div>
          )}

          {/* Tabs */}
          <div className="mb-6 border-b border-gray-700">
            <div className="flex gap-4">
              {['overview', 'bookings', 'revenue', 'hours'].map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-4 py-2 font-semibold capitalize transition ${
                    activeTab === tab
                      ? 'border-b-2 border-green-500 text-green-400'
                      : 'text-gray-400 hover:text-white'
                  }`}
                >
                  {tab === 'overview' && '📋 Overview'}
                  {tab === 'bookings' && '📅 Bookings'}
                  {tab === 'revenue' && '💰 Faturamento'}
                  {tab === 'hours' && '⏰ Pacotes de Horas'}
                </button>
              ))}
            </div>
          </div>

          {/* Content */}
          {activeTab === 'overview' && (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Recent Bookings */}
              <div className="lg:col-span-2 bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">📅 Bookings Recentes</h2>
                <div className="space-y-2 max-h-96 overflow-y-auto">
                  {bookings.map(booking => (
                    <div key={booking.id} className="bg-gray-700 p-4 rounded flex justify-between items-center">
                      <div>
                        <p className="font-semibold">{booking.address}</p>
                        <p className="text-sm text-gray-400">
                          📅 {new Date(booking.date).toLocaleDateString('pt-BR')} • ⏰ {booking.time}
                        </p>
                      </div>
                      <div className="text-right">
                        <p className="font-bold text-green-400">R$ {booking.total_price}</p>
                        <span className={`px-2 py-1 rounded text-xs font-semibold ${
                          booking.status === 'completed' ? 'bg-green-900 text-green-300' :
                          booking.status === 'confirmed' ? 'bg-blue-900 text-blue-300' :
                          'bg-yellow-900 text-yellow-300'
                        }`}>
                          {booking.status}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Quick Actions */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">⚡ Ações Rápidas</h2>
                <div className="space-y-3">
                  <button className="w-full bg-green-600 hover:bg-green-700 px-4 py-2 rounded font-semibold transition">
                    ➕ Novo Booking
                  </button>
                  <button className="w-full bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded font-semibold transition">
                    👥 Adicionar Cliente
                  </button>
                  <button className="w-full bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded font-semibold transition">
                    📊 Gerar Relatório
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'bookings' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">📅 Gerenciar Bookings</h2>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-2 text-left">ID</th>
                      <th className="px-4 py-2 text-left">Endereço</th>
                      <th className="px-4 py-2 text-left">Data</th>
                      <th className="px-4 py-2 text-left">Duração</th>
                      <th className="px-4 py-2 text-left">Valor</th>
                      <th className="px-4 py-2 text-left">Status</th>
                      <th className="px-4 py-2 text-center">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.map(booking => (
                      <tr key={booking.id} className="border-t border-gray-700 hover:bg-gray-700">
                        <td className="px-4 py-2"># {booking.id}</td>
                        <td className="px-4 py-2">{booking.address}</td>
                        <td className="px-4 py-2">{new Date(booking.date).toLocaleDateString('pt-BR')}</td>
                        <td className="px-4 py-2">{booking.duration_hours}h</td>
                        <td className="px-4 py-2 font-semibold">R$ {booking.total_price}</td>
                        <td className="px-4 py-2">
                          <select
                            value={booking.status}
                            onChange={(e) => updateBookingStatus(booking.id, e.target.value)}
                            className="bg-gray-600 rounded px-2 py-1 text-xs"
                          >
                            <option value="pending">Pendente</option>
                            <option value="confirmed">Confirmado</option>
                            <option value="completed">Completo</option>
                            <option value="cancelled">Cancelado</option>
                          </select>
                        </td>
                        <td className="px-4 py-2 text-center">
                          <Link href={`/admin/bookings/${booking.id}`}>
                            <a className="text-blue-400 hover:text-blue-300">Ver →</a>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {activeTab === 'revenue' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">💰 Faturamento</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="bg-gray-700 p-4 rounded">
                  <p className="text-gray-400 text-sm mb-1">Receita Total</p>
                  <p className="text-2xl font-bold text-green-400">R$ {parseFloat(stats.totalRevenue).toLocaleString('pt-BR')}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded">
                  <p className="text-gray-400 text-sm mb-1">Transações</p>
                  <p className="text-2xl font-bold">{stats.totalBookings}</p>
                </div>
                <div className="bg-gray-700 p-4 rounded">
                  <p className="text-gray-400 text-sm mb-1">Ticket Médio</p>
                  <p className="text-2xl font-bold text-blue-400">
                    R$ {stats.totalBookings > 0 ? (parseFloat(stats.totalRevenue) / stats.totalBookings).toFixed(2) : '0'}
                  </p>
                </div>
              </div>
              <p className="text-gray-400">Gráficos de faturamento em breve...</p>
            </div>
          )}

          {activeTab === 'hours' && (
            <div className="bg-gray-800 rounded-lg p-6">
              <h2 className="text-xl font-bold mb-4">⏰ Vendas de Pacotes de Horas</h2>
              <p className="text-gray-400 mb-4">Relatório de pacotes de horas vendidos</p>
              <div className="space-y-3">
                {[40, 60, 80, 100, 120].map(hours => (
                  <div key={hours} className="bg-gray-700 p-4 rounded flex justify-between items-center">
                    <div>
                      <p className="font-semibold">{hours}h Package</p>
                      <p className="text-sm text-gray-400">Pacote popular</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold text-green-400">48 vendidas</p>
                      <p className="text-sm text-gray-400">R$ 12.000,00</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </>
  );
}

// Componente auxiliar
function StatCard({ icon, title, value, trend, variant = 'default' }) {
  return (
    <div className={`rounded-lg p-6 ${
      variant === 'warning' ? 'bg-yellow-900/20 border border-yellow-700' : 'bg-gray-800'
    }`}>
      <div className="flex justify-between items-start mb-4">
        <h3 className="text-gray-400 text-sm">{title}</h3>
        <span className="text-3xl">{icon}</span>
      </div>
      <p className="text-3xl font-bold mb-2">{value}</p>
      <p className={`text-xs ${
        variant === 'warning' ? 'text-yellow-400' : 'text-green-400'
      }`}>
        {trend}
      </p>
    </div>
  );
}
