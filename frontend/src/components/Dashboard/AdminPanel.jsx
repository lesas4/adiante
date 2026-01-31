import React, { useState, useEffect } from 'react';

function AdminPanel() {
  const [metrics, setMetrics] = useState({
    totalBookings: 0,
    revenue: 0,
    customers: 0,
    teamMembers: 0,
    satisfaction: 0,
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // ✅ CONECTADO ao backend para buscar dados reais
    const fetchMetrics = async () => {
      try {
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
        
        const response = await fetch(`${API_URL}/api/admin/dashboard`, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token') || ''}`
          },
          credentials: 'include'
        });
        
        if (!response.ok) throw new Error('Falha ao buscar métricas');
        
        const data = await response.json();
        setMetrics(data);
        setLoading(false);
      } catch (error) {
        console.error('❌ Erro ao buscar métricas:', error);
        // Se houver erro, manter dados vazios
        setMetrics({
          totalBookings: 0,
          revenue: 0,
          customers: 0,
          teamMembers: 0,
          satisfaction: 0,
        });
        setLoading(false);
      }
    };
    
    fetchMetrics();
  }, []);

  if (loading) {
    return <div className="p-6 text-center">Carregando métricas...</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Painel Administrativo</h2>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold">Total Agendamentos</p>
          <p className="text-2xl font-bold text-blue-600 mt-2">{metrics.totalBookings}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold">Receita Total</p>
          <p className="text-2xl font-bold text-green-600 mt-2">R$ {(metrics.revenue / 1000).toFixed(1)}k</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold">Clientes</p>
          <p className="text-2xl font-bold text-purple-600 mt-2">{metrics.customers}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold">Equipe</p>
          <p className="text-2xl font-bold text-orange-600 mt-2">{metrics.teamMembers}</p>
        </div>
        <div className="p-4 bg-white rounded-lg shadow">
          <p className="text-gray-600 text-sm font-semibold">Satisfação</p>
          <p className="text-2xl font-bold text-red-600 mt-2">{metrics.satisfaction}/5 ⭐</p>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <button className="p-6 bg-white rounded-lg shadow hover:shadow-md transition text-left">
          <p className="font-bold text-lg">📊 Relatórios Financeiros</p>
          <p className="text-sm text-gray-600 mt-2">Ver análise de receita e despesas</p>
        </button>
        <button className="p-6 bg-white rounded-lg shadow hover:shadow-md transition text-left">
          <p className="font-bold text-lg">👥 Gestão de Equipa</p>
          <p className="text-sm text-gray-600 mt-2">Designar tarefas e ver performance</p>
        </button>
        <button className="p-6 bg-white rounded-lg shadow hover:shadow-md transition text-left">
          <p className="font-bold text-lg">⚙️ Configurar Serviços</p>
          <p className="text-sm text-gray-600 mt-2">Editar preços e tipos de limpeza</p>
        </button>
        <button className="p-6 bg-white rounded-lg shadow hover:shadow-md transition text-left">
          <p className="font-bold text-lg">📧 Automações</p>
          <p className="text-sm text-gray-600 mt-2">Gerenciar regras automáticas</p>
        </button>
      </div>
    </div>
  );
}

export default AdminPanel;
