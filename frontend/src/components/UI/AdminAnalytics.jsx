import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ChartBarIcon, UsersIcon, CurrencyDollarIcon, CalendarIcon, TrendingUpIcon, TrendingDownIcon } from '@heroicons/react/24/outline';

const AdminAnalytics = () => {
  const [analytics, setAnalytics] = useState({
    overview: {
      totalClients: 0,
      totalRevenue: 0,
      totalServices: 0,
      averageRating: 0
    },
    charts: {
      revenueByMonth: [],
      servicesByType: [],
      clientGrowth: [],
      satisfactionTrend: []
    },
    recentActivity: []
  });

  const [timeRange, setTimeRange] = useState('30d');

  useEffect(() => {
    // Simular carregamento de dados analíticos
    const mockAnalytics = {
      overview: {
        totalClients: 1247,
        totalRevenue: 45680,
        totalServices: 892,
        averageRating: 4.8
      },
      charts: {
        revenueByMonth: [
          { month: 'Jan', revenue: 12500 },
          { month: 'Fev', revenue: 15200 },
          { month: 'Mar', revenue: 18900 },
          { month: 'Abr', revenue: 16800 },
          { month: 'Mai', revenue: 22100 },
          { month: 'Jun', revenue: 25680 }
        ],
        servicesByType: [
          { type: 'Limpeza Residencial', count: 345, percentage: 38.7 },
          { type: 'Limpeza Profunda', count: 234, percentage: 26.2 },
          { type: 'Limpeza de Vidros', count: 156, percentage: 17.5 },
          { type: 'Limpeza Pós-Obra', count: 98, percentage: 11.0 },
          { type: 'Outros', count: 59, percentage: 6.6 }
        ],
        clientGrowth: [
          { month: 'Jan', clients: 120 },
          { month: 'Fev', clients: 145 },
          { month: 'Mar', clients: 178 },
          { month: 'Abr', clients: 203 },
          { month: 'Mai', clients: 245 },
          { month: 'Jun', clients: 356 }
        ],
        satisfactionTrend: [
          { month: 'Jan', rating: 4.6 },
          { month: 'Fev', rating: 4.7 },
          { month: 'Mar', rating: 4.8 },
          { month: 'Abr', rating: 4.7 },
          { month: 'Mai', rating: 4.9 },
          { month: 'Jun', rating: 4.8 }
        ]
      },
      recentActivity: [
        {
          id: 1,
          type: 'new_client',
          message: 'Novo cliente cadastrado: Maria Silva',
          time: '2 min atrás',
          icon: '👤'
        },
        {
          id: 2,
          type: 'service_completed',
          message: 'Serviço concluído: Limpeza Residencial - R$ 150',
          time: '15 min atrás',
          icon: '✅'
        },
        {
          id: 3,
          type: 'payment_received',
          message: 'Pagamento recebido: PIX - R$ 250',
          time: '1h atrás',
          icon: '💰'
        },
        {
          id: 4,
          type: 'review_received',
          message: 'Nova avaliação: 5 estrelas',
          time: '2h atrás',
          icon: '⭐'
        }
      ]
    };

    setAnalytics(mockAnalytics);
  }, [timeRange]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatNumber = (value) => {
    return new Intl.NumberFormat('pt-BR').format(value);
  };

  const StatCard = ({ title, value, icon, trend, trendValue }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"
    >
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{title}</p>
          <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
          {trend && (
            <div className={`flex items-center gap-1 mt-1 text-sm ${
              trend === 'up' ? 'text-green-600' : 'text-red-600'
            }`}>
              {trend === 'up' ? <TrendingUpIcon className="w-4 h-4" /> : <TrendingDownIcon className="w-4 h-4" />}
              <span>{trendValue}% vs mês anterior</span>
            </div>
          )}
        </div>
        <div className="text-3xl">{icon}</div>
      </div>
    </motion.div>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            📊 Analytics Administrativo
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            Métricas e insights do seu negócio
          </p>
        </div>

        <select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
        >
          <option value="7d">Últimos 7 dias</option>
          <option value="30d">Últimos 30 dias</option>
          <option value="90d">Últimos 90 dias</option>
          <option value="1y">Último ano</option>
        </select>
      </div>

      {/* Overview Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Clientes"
          value={formatNumber(analytics.overview.totalClients)}
          icon="👥"
          trend="up"
          trendValue="12.5"
        />
        <StatCard
          title="Receita Total"
          value={formatCurrency(analytics.overview.totalRevenue)}
          icon="💰"
          trend="up"
          trendValue="18.3"
        />
        <StatCard
          title="Serviços Realizados"
          value={formatNumber(analytics.overview.totalServices)}
          icon="🧹"
          trend="up"
          trendValue="8.7"
        />
        <StatCard
          title="Avaliação Média"
          value={`${analytics.overview.averageRating} ⭐`}
          icon="⭐"
          trend="up"
          trendValue="2.1"
        />
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📈 Receita por Mês
          </h3>
          <div className="space-y-3">
            {analytics.charts.revenueByMonth.map((item) => (
              <div key={item.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.month}/2024
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-blue-600 h-2 rounded-full"
                      style={{
                        width: `${(item.revenue / Math.max(...analytics.charts.revenueByMonth.map(d => d.revenue))) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {formatCurrency(item.revenue)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Services by Type */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            🧹 Serviços por Tipo
          </h3>
          <div className="space-y-4">
            {analytics.charts.servicesByType.map((service) => (
              <div key={service.type} className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 dark:text-white">
                    {service.type}
                  </span>
                  <span className="text-sm text-gray-600 dark:text-gray-400">
                    {service.count} ({service.percentage}%)
                  </span>
                </div>
                <div className="w-full bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${service.percentage}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Client Growth */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            📈 Crescimento de Clientes
          </h3>
          <div className="space-y-3">
            {analytics.charts.clientGrowth.map((item) => (
              <div key={item.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.month}/2024
                </span>
                <div className="flex items-center gap-3">
                  <div className="w-32 bg-gray-200 dark:bg-slate-700 rounded-full h-2">
                    <div
                      className="bg-purple-600 h-2 rounded-full"
                      style={{
                        width: `${(item.clients / Math.max(...analytics.charts.clientGrowth.map(d => d.clients))) * 100}%`
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    +{item.clients}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Satisfaction Trend */}
        <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            ⭐ Tendência de Satisfação
          </h3>
          <div className="space-y-3">
            {analytics.charts.satisfactionTrend.map((item) => (
              <div key={item.month} className="flex items-center justify-between">
                <span className="text-sm font-medium text-gray-600 dark:text-gray-400">
                  {item.month}/2024
                </span>
                <div className="flex items-center gap-3">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-sm ${i < Math.floor(item.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      >
                        ⭐
                      </span>
                    ))}
                  </div>
                  <span className="text-sm font-semibold text-gray-900 dark:text-white">
                    {item.rating}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          🔔 Atividade Recente
        </h3>
        <div className="space-y-4">
          {analytics.recentActivity.map((activity) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 p-3 rounded-lg hover:bg-gray-50 dark:hover:bg-slate-700 transition-colors"
            >
              <div className="text-2xl">{activity.icon}</div>
              <div className="flex-1">
                <p className="text-gray-900 dark:text-white font-medium">
                  {activity.message}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  {activity.time}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 rounded-xl p-6 border border-blue-200 dark:border-blue-700">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          ⚡ Ações Rápidas
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📧</div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Exportar Relatório</p>
          </button>
          <button className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📱</div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Enviar Newsletter</p>
          </button>
          <button className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">🎯</div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Criar Campanha</p>
          </button>
          <button className="p-4 bg-white dark:bg-slate-800 rounded-lg shadow hover:shadow-md transition-shadow">
            <div className="text-2xl mb-2">📊</div>
            <p className="text-sm font-medium text-gray-900 dark:text-white">Ver Detalhes</p>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AdminAnalytics;