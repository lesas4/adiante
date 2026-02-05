import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ClockIcon, CheckCircleIcon, XCircleIcon, CalendarIcon, MapPinIcon, StarIcon } from '@heroicons/react/24/outline';

const ClientHistory = ({ clientId }) => {
  const [activeTab, setActiveTab] = useState('services');
  const [history, setHistory] = useState({
    services: [],
    payments: [],
    communications: [],
    reviews: []
  });

  useEffect(() => {
    // Simular carregamento de dados do cliente
    const mockData = {
      services: [
        {
          id: 1,
          type: 'Limpeza Residencial',
          date: '2024-01-15',
          time: '14:00',
          address: 'Rua A, 123 - Porto Alegre',
          status: 'completed',
          value: 150,
          professional: 'Maria Silva',
          rating: 5,
          notes: 'Cliente muito satisfeito com o resultado'
        },
        {
          id: 2,
          type: 'Limpeza Profunda',
          date: '2024-01-10',
          time: '09:00',
          address: 'Rua B, 456 - Porto Alegre',
          status: 'completed',
          value: 250,
          professional: 'João Santos',
          rating: 5,
          notes: 'Serviço realizado com perfeição'
        },
        {
          id: 3,
          type: 'Limpeza de Vidros',
          date: '2024-01-20',
          time: '10:00',
          address: 'Rua C, 789 - Porto Alegre',
          status: 'scheduled',
          value: 100,
          professional: 'Ana Costa',
          notes: 'Agendado para amanhã'
        }
      ],
      payments: [
        {
          id: 1,
          serviceId: 1,
          amount: 150,
          method: 'credit_card',
          status: 'paid',
          date: '2024-01-15',
          transactionId: 'TXN_123456'
        },
        {
          id: 2,
          serviceId: 2,
          amount: 250,
          method: 'pix',
          status: 'paid',
          date: '2024-01-10',
          transactionId: 'PIX_789012'
        }
      ],
      communications: [
        {
          id: 1,
          type: 'whatsapp',
          message: 'Olá! Gostaria de agendar uma limpeza para amanhã.',
          direction: 'inbound',
          date: '2024-01-14',
          time: '09:30'
        },
        {
          id: 2,
          type: 'email',
          subject: 'Confirmação de agendamento',
          direction: 'outbound',
          date: '2024-01-14',
          time: '10:00'
        },
        {
          id: 3,
          type: 'call',
          duration: '5 min',
          direction: 'outbound',
          date: '2024-01-15',
          time: '15:00',
          notes: 'Cliente ligou para elogiar o serviço'
        }
      ],
      reviews: [
        {
          id: 1,
          serviceId: 1,
          rating: 5,
          comment: 'Excelente serviço! Profissionais muito competentes e pontuais.',
          date: '2024-01-15',
          response: 'Obrigado pelo feedback! Ficamos felizes em atender suas expectativas.'
        },
        {
          id: 2,
          serviceId: 2,
          rating: 5,
          comment: 'Resultado impecável. Recomendo fortemente!',
          date: '2024-01-10'
        }
      ]
    };

    setHistory(mockData);
  }, [clientId]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400';
      case 'scheduled': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400';
      case 'in_progress': return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400';
      case 'cancelled': return 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'completed': return <CheckCircleIcon className="w-4 h-4" />;
      case 'scheduled': return <ClockIcon className="w-4 h-4" />;
      case 'cancelled': return <XCircleIcon className="w-4 h-4" />;
      default: return <ClockIcon className="w-4 h-4" />;
    }
  };

  const tabs = [
    { id: 'services', label: 'Serviços', count: history.services.length },
    { id: 'payments', label: 'Pagamentos', count: history.payments.length },
    { id: 'communications', label: 'Comunicações', count: history.communications.length },
    { id: 'reviews', label: 'Avaliações', count: history.reviews.length }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
          📋 Histórico Completo
        </h2>
        <p className="text-gray-600 dark:text-gray-400">
          Acompanhe todos os seus serviços e interações
        </p>
      </div>

      {/* Tabs */}
      <div className="flex gap-2 border-b border-gray-200 dark:border-slate-700">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-semibold border-b-2 transition-all ${
              activeTab === tab.id
                ? 'border-blue-600 text-blue-600 dark:text-blue-400'
                : 'border-transparent text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white'
            }`}
          >
            {tab.label} ({tab.count})
          </button>
        ))}
      </div>

      {/* Services Tab */}
      {activeTab === 'services' && (
        <div className="space-y-4">
          {history.services.map((service) => (
            <motion.div
              key={service.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-1">
                    {service.type}
                  </h3>
                  <div className="flex items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <div className="flex items-center gap-1">
                      <CalendarIcon className="w-4 h-4" />
                      {new Date(service.date).toLocaleDateString('pt-BR')} às {service.time}
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPinIcon className="w-4 h-4" />
                      {service.address}
                    </div>
                  </div>
                </div>
                <div className={`px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1 ${getStatusColor(service.status)}`}>
                  {getStatusIcon(service.status)}
                  {service.status === 'completed' ? 'Concluído' :
                   service.status === 'scheduled' ? 'Agendado' :
                   service.status === 'in_progress' ? 'Em Andamento' : 'Cancelado'}
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Valor</p>
                  <p className="font-semibold text-green-600">R$ {service.value}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Profissional</p>
                  <p className="font-semibold text-gray-900 dark:text-white">{service.professional}</p>
                </div>
                {service.rating && (
                  <div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">Avaliação</p>
                    <div className="flex items-center gap-1">
                      <StarIcon className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="font-semibold">{service.rating}</span>
                    </div>
                  </div>
                )}
                <div>
                  <p className="text-sm text-gray-600 dark:text-gray-400">Status</p>
                  <p className="font-semibold capitalize">{service.status}</p>
                </div>
              </div>

              {service.notes && (
                <div className="bg-gray-50 dark:bg-slate-700 rounded-lg p-3">
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    <strong>Observações:</strong> {service.notes}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {/* Payments Tab */}
      {activeTab === 'payments' && (
        <div className="space-y-4">
          {history.payments.map((payment) => (
            <motion.div
              key={payment.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-gray-900 dark:text-white">
                    Pagamento #{payment.id}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    {new Date(payment.date).toLocaleDateString('pt-BR')}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-green-600">R$ {payment.amount}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                    {payment.method === 'credit_card' ? 'Cartão' :
                     payment.method === 'pix' ? 'PIX' : 'Transferência'}
                  </p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-slate-600">
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  Transação: {payment.transactionId}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Communications Tab */}
      {activeTab === 'communications' && (
        <div className="space-y-4">
          {history.communications.map((comm) => (
            <motion.div
              key={comm.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className={`rounded-xl p-4 border ${
                comm.direction === 'inbound'
                  ? 'bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-700'
                  : 'bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-700'
              }`}
            >
              <div className="flex items-start gap-3">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                  comm.direction === 'inbound'
                    ? 'bg-blue-500 text-white'
                    : 'bg-green-500 text-white'
                }`}>
                  {comm.type === 'whatsapp' ? '💬' :
                   comm.type === 'email' ? '📧' : '📞'}
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="font-semibold text-gray-900 dark:text-white capitalize">
                      {comm.type}
                    </span>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      comm.direction === 'inbound'
                        ? 'bg-blue-100 text-blue-800 dark:bg-blue-800 dark:text-blue-200'
                        : 'bg-green-100 text-green-800 dark:bg-green-800 dark:text-green-200'
                    }`}>
                      {comm.direction === 'inbound' ? 'Recebido' : 'Enviado'}
                    </span>
                  </div>

                  {comm.subject && (
                    <p className="font-medium text-gray-900 dark:text-white mb-1">
                      {comm.subject}
                    </p>
                  )}

                  {comm.message && (
                    <p className="text-gray-700 dark:text-gray-300 text-sm">
                      {comm.message}
                    </p>
                  )}

                  {comm.duration && (
                    <p className="text-gray-600 dark:text-gray-400 text-sm">
                      Duração: {comm.duration}
                    </p>
                  )}

                  <div className="flex items-center gap-2 mt-2 text-xs text-gray-500 dark:text-gray-400">
                    <CalendarIcon className="w-3 h-3" />
                    {new Date(comm.date).toLocaleDateString('pt-BR')} às {comm.time}
                  </div>

                  {comm.notes && (
                    <div className="mt-2 p-2 bg-white/50 dark:bg-slate-700/50 rounded-lg">
                      <p className="text-xs text-gray-600 dark:text-gray-400">
                        <strong>Observações:</strong> {comm.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Reviews Tab */}
      {activeTab === 'reviews' && (
        <div className="space-y-4">
          {history.reviews.map((review) => (
            <motion.div
              key={review.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg border border-gray-200 dark:border-slate-700"
            >
              <div className="flex items-center gap-2 mb-3">
                <div className="flex">
                  {[...Array(review.rating)].map((_, i) => (
                    <StarIcon key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                  ))}
                </div>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  {new Date(review.date).toLocaleDateString('pt-BR')}
                </span>
              </div>

              <p className="text-gray-900 dark:text-white mb-3">
                {review.comment}
              </p>

              {review.response && (
                <div className="bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-500 p-3 rounded-r-lg">
                  <p className="text-sm text-blue-800 dark:text-blue-200">
                    <strong>Resposta da Leidy Cleaner:</strong> {review.response}
                  </p>
                </div>
              )}
            </motion.div>
          ))}
        </div>
      )}

      {history[activeTab]?.length === 0 && (
        <div className="text-center py-12">
          <div className="text-6xl mb-4">📭</div>
          <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
            Nenhum registro encontrado
          </h3>
          <p className="text-gray-600 dark:text-gray-400">
            Ainda não há {activeTab === 'services' ? 'serviços' :
                          activeTab === 'payments' ? 'pagamentos' :
                          activeTab === 'communications' ? 'comunicações' : 'avaliações'} registrados.
          </p>
        </div>
      )}
    </div>
  );
};

export default ClientHistory;