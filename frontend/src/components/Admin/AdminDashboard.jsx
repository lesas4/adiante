/**
 * AdminDashboard.jsx
 * Painel administrativo completo - Usuários, Agendamentos, Pagamentos, Reviews
 */

import React, { useState, useEffect } from 'react';
import {
  Users,
  Calendar,
  DollarSign,
  MessageSquare,
  Search,
  Trash2,
  CheckCircle,
  XCircle,
  Eye,
  Settings,
  LogOut,
  TrendingUp
} from 'lucide-react';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [users, setUsers] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [payments, setPayments] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [stats, setStats] = useState({});

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');

      // Carregar usuários
      const usersRes = await fetch('/api/admin/users', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (usersRes.ok) setUsers(await usersRes.json());

      // Carregar agendamentos
      const bookingsRes = await fetch('/api/admin/bookings', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (bookingsRes.ok) setBookings(await bookingsRes.json());

      // Carregar pagamentos
      const paymentsRes = await fetch('/api/admin/payments', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (paymentsRes.ok) setPayments(await paymentsRes.json());

      // Carregar reviews pendentes
      const reviewsRes = await fetch('/api/admin/reviews/pending', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (reviewsRes.ok) setReviews(await reviewsRes.json());

      // Carregar estatísticas
      const statsRes = await fetch('/api/admin/stats', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (statsRes.ok) setStats(await statsRes.json());

      setError('');
    } catch (err) {
      setError('Erro ao carregar dados do dashboard');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (userId) => {
    if (!confirm('Tem certeza que deseja deletar este usuário?')) return;

    try {
      const res = await fetch(`/api/admin/users/${userId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        setUsers(users.filter(u => u.id !== userId));
        alert('Usuário deletado com sucesso');
      }
    } catch (err) {
      alert('Erro ao deletar usuário');
    }
  };

  const cancelBooking = async (bookingId) => {
    if (!confirm('Cancelar este agendamento?')) return;

    try {
      const res = await fetch(`/api/admin/bookings/${bookingId}/cancel`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        loadDashboardData();
        alert('Agendamento cancelado');
      }
    } catch (err) {
      alert('Erro ao cancelar agendamento');
    }
  };

  const approveReview = async (reviewId) => {
    try {
      const res = await fetch(`/api/reviews/${reviewId}/approve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== reviewId));
        alert('Review aprovada');
      }
    } catch (err) {
      alert('Erro ao aprovar review');
    }
  };

  const rejectReview = async (reviewId) => {
    try {
      const res = await fetch(`/api/admin/reviews/${reviewId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${localStorage.getItem('token')}` }
      });

      if (res.ok) {
        setReviews(reviews.filter(r => r.id !== reviewId));
        alert('Review rejeitada');
      }
    } catch (err) {
      alert('Erro ao rejeitar review');
    }
  };

  if (loading && activeTab === 'dashboard') {
    return <div className="p-8 text-center">Carregando...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="bg-gray-900 text-white p-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold">⚙️ Admin Dashboard</h1>
        <button
          onClick={() => {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }}
          className="flex items-center gap-2 px-4 py-2 bg-red-600 rounded hover:bg-red-700"
        >
          <LogOut size={18} />
          Sair
        </button>
      </nav>

      {/* Tabs */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto flex gap-4 p-4">
          <TabButton
            active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
            icon={<TrendingUp size={18} />}
            label="Dashboard"
          />
          <TabButton
            active={activeTab === 'users'}
            onClick={() => setActiveTab('users')}
            icon={<Users size={18} />}
            label="Usuários"
          />
          <TabButton
            active={activeTab === 'bookings'}
            onClick={() => setActiveTab('bookings')}
            icon={<Calendar size={18} />}
            label="Agendamentos"
          />
          <TabButton
            active={activeTab === 'payments'}
            onClick={() => setActiveTab('payments')}
            icon={<DollarSign size={18} />}
            label="Pagamentos"
          />
          <TabButton
            active={activeTab === 'reviews'}
            onClick={() => setActiveTab('reviews')}
            icon={<MessageSquare size={18} />}
            label="Reviews"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto p-6">
        {error && (
          <div className="mb-4 p-4 bg-red-100 text-red-700 rounded">
            {error}
          </div>
        )}

        {/* Dashboard Overview */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Usuários"
              value={stats.totalUsers || 0}
              icon={<Users size={24} className="text-blue-500" />}
            />
            <StatCard
              title="Agendamentos"
              value={stats.totalBookings || 0}
              icon={<Calendar size={24} className="text-green-500" />}
            />
            <StatCard
              title="Receita (Mês)"
              value={`R$ ${(stats.monthlyRevenue || 0).toFixed(2)}`}
              icon={<DollarSign size={24} className="text-yellow-500" />}
            />
            <StatCard
              title="Taxa de Conversão"
              value={`${(stats.conversionRate || 0).toFixed(1)}%`}
              icon={<TrendingUp size={24} className="text-purple-500" />}
            />
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Gerenciar Usuários</h2>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Buscar por nome ou email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-4 py-2 border rounded-lg"
              />
            </div>

            <div className="bg-white rounded-lg overflow-hidden shadow">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold">ID</th>
                    <th className="px-6 py-3 text-left font-bold">Nome</th>
                    <th className="px-6 py-3 text-left font-bold">Email</th>
                    <th className="px-6 py-3 text-left font-bold">Role</th>
                    <th className="px-6 py-3 text-left font-bold">Ações</th>
                  </tr>
                </thead>
                <tbody>
                  {users
                    .filter(
                      (u) =>
                        u.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        u.email.toLowerCase().includes(searchTerm.toLowerCase())
                    )
                    .map((user) => (
                      <tr key={user.id} className="border-t hover:bg-gray-50">
                        <td className="px-6 py-3">{user.id}</td>
                        <td className="px-6 py-3">{user.name}</td>
                        <td className="px-6 py-3">{user.email}</td>
                        <td className="px-6 py-3">
                          <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded text-sm">
                            {user.role}
                          </span>
                        </td>
                        <td className="px-6 py-3">
                          <button
                            onClick={() => deleteUser(user.id)}
                            className="text-red-600 hover:text-red-800"
                          >
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Bookings Tab */}
        {activeTab === 'bookings' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Agendamentos</h2>
            <div className="space-y-4">
              {bookings.map((booking) => (
                <div key={booking.id} className="bg-white p-4 rounded-lg shadow">
                  <div className="grid grid-cols-4 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-gray-500">ID</p>
                      <p className="font-bold">{booking.id}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Data</p>
                      <p className="font-bold">{booking.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Cliente</p>
                      <p className="font-bold">{booking.userName}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Status</p>
                      <span
                        className={`px-2 py-1 rounded text-sm font-bold ${
                          booking.status === 'confirmed'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-yellow-100 text-yellow-800'
                        }`}
                      >
                        {booking.status}
                      </span>
                    </div>
                  </div>
                  {booking.status === 'confirmed' && (
                    <button
                      onClick={() => cancelBooking(booking.id)}
                      className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                    >
                      Cancelar Agendamento
                    </button>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Payments Tab */}
        {activeTab === 'payments' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Pagamentos</h2>
            <div className="bg-white rounded-lg overflow-hidden shadow">
              <table className="w-full">
                <thead className="bg-gray-100">
                  <tr>
                    <th className="px-6 py-3 text-left font-bold">ID</th>
                    <th className="px-6 py-3 text-left font-bold">Cliente</th>
                    <th className="px-6 py-3 text-left font-bold">Valor</th>
                    <th className="px-6 py-3 text-left font-bold">Status</th>
                    <th className="px-6 py-3 text-left font-bold">Data</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((payment) => (
                    <tr key={payment.id} className="border-t hover:bg-gray-50">
                      <td className="px-6 py-3">{payment.id}</td>
                      <td className="px-6 py-3">{payment.userName}</td>
                      <td className="px-6 py-3 font-bold">
                        R$ {payment.amount.toFixed(2)}
                      </td>
                      <td className="px-6 py-3">
                        <span
                          className={`px-2 py-1 rounded text-sm font-bold ${
                            payment.status === 'completed'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-3">
                        {new Date(payment.createdAt).toLocaleDateString('pt-BR')}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Reviews Tab */}
        {activeTab === 'reviews' && (
          <div>
            <h2 className="text-2xl font-bold mb-4">Reviews Pendentes de Aprovação</h2>
            {reviews.length === 0 ? (
              <p className="text-gray-600">Nenhuma review pendente</p>
            ) : (
              <div className="space-y-4">
                {reviews.map((review) => (
                  <div key={review.id} className="bg-white p-6 rounded-lg shadow">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <p className="font-bold text-lg">{review.userName}</p>
                        <p className="text-sm text-gray-600">⭐ {review.rating}/5</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => approveReview(review.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                        >
                          <CheckCircle size={16} />
                          Aprovar
                        </button>
                        <button
                          onClick={() => rejectReview(review.id)}
                          className="flex items-center gap-2 px-3 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        >
                          <XCircle size={16} />
                          Rejeitar
                        </button>
                      </div>
                    </div>
                    <p className="text-gray-800">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}

function TabButton({ active, onClick, icon, label }) {
  return (
    <button
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2 rounded-lg transition ${
        active
          ? 'bg-blue-600 text-white'
          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
      }`}
    >
      {icon}
      {label}
    </button>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-white rounded-lg shadow p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-gray-600 text-sm">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon}
      </div>
    </div>
  );
}
