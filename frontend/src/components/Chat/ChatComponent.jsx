/**
 * ChatComponent.jsx
 * Chat em tempo real usando Socket.io
 */

import React, { useState, useEffect, useRef } from 'react';
import io from 'socket.io-client';
import { Send, Phone, AlertCircle, Check, CheckCheck } from 'lucide-react';

export default function ChatComponent({ bookingId, recipientId, recipientName, onClose }) {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const socketRef = useRef(null);
  const messagesEndRef = useRef(null);
  const userId = localStorage.getItem('userId');

  useEffect(() => {
    // Conectar ao Socket.io
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:3001', {
      auth: {
        token: localStorage.getItem('token')
      }
    });

    socketRef.current = socket;

    // Listar para mensagens
    socket.on('chat:message', (msg) => {
      if (
        (msg.senderId === userId || msg.recipientId === userId) &&
        (msg.bookingId === bookingId)
      ) {
        setMessages((prev) => [...prev, msg]);
      }
    });

    socket.on('chat:read', (data) => {
      if (data.bookingId === bookingId) {
        setMessages((prev) =>
          prev.map((msg) =>
            msg.id === data.messageId ? { ...msg, read: true } : msg
          )
        );
      }
    });

    socket.on('connect_error', (err) => {
      setError('Erro ao conectar ao chat');
    });

    // Carregar histórico
    loadChatHistory();

    return () => {
      socket.disconnect();
    };
  }, [bookingId, userId]);

  const loadChatHistory = async () => {
    try {
      setLoading(true);
      const res = await fetch(`/api/chat/history/${bookingId}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      const data = await res.json();
      if (data.success) {
        setMessages(data.messages);
      }
      setLoading(false);
    } catch (err) {
      setError('Erro ao carregar histórico');
      setLoading(false);
    }
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !socketRef.current) return;

    const msgData = {
      bookingId,
      text: newMessage,
      senderId: userId,
      recipientId,
      timestamp: new Date()
    };

    try {
      // Salvar no backend
      const res = await fetch('/api/chat/send', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: JSON.stringify(msgData)
      });

      if (res.ok) {
        // Emitir via Socket.io
        socketRef.current.emit('chat:send', msgData);
        setNewMessage('');
      }
    } catch (err) {
      setError('Erro ao enviar mensagem');
    }
  };

  const handleMarkAsRead = () => {
    socketRef.current?.emit('chat:read', { bookingId });
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-0 right-0 w-96 h-screen md:h-auto md:w-96 md:fixed md:bottom-4 md:right-4 bg-white rounded-lg shadow-2xl border-l-4 border-blue-600 flex flex-col z-40">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 flex justify-between items-center rounded-t-lg">
        <div>
          <h3 className="font-bold">{recipientName}</h3>
          <p className="text-xs text-blue-100">Agendamento #{bookingId}</p>
        </div>
        <div className="flex gap-2">
          <button
            className="p-2 hover:bg-blue-700 rounded"
            title="Chamada"
          >
            <Phone size={18} />
          </button>
          <button
            onClick={onClose}
            className="p-2 hover:bg-blue-700 rounded"
          >
            ✕
          </button>
        </div>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 max-h-96">
        {error && (
          <div className="p-3 bg-red-100 text-red-700 rounded flex items-center gap-2">
            <AlertCircle size={16} />
            {error}
          </div>
        )}

        {loading ? (
          <div className="text-center text-gray-500 py-8">Carregando...</div>
        ) : messages.length === 0 ? (
          <div className="text-center text-gray-500 py-8">
            <p>Comece a conversa!</p>
          </div>
        ) : (
          messages.map((msg) => (
            <div
              key={msg.id}
              className={`flex ${
                msg.senderId === userId ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-xs px-4 py-2 rounded-lg ${
                  msg.senderId === userId
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-800'
                }`}
              >
                <p>{msg.text}</p>
                <div className={`text-xs mt-1 flex items-center gap-1 ${
                  msg.senderId === userId ? 'text-blue-100' : 'text-gray-500'
                }`}>
                  {new Date(msg.timestamp).toLocaleTimeString('pt-BR', {
                    hour: '2-digit',
                    minute: '2-digit'
                  })}
                  {msg.senderId === userId && (
                    msg.read ? <CheckCheck size={14} /> : <Check size={14} />
                  )}
                </div>
              </div>
            </div>
          ))
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <form onSubmit={handleSendMessage} className="border-t p-4 bg-gray-50 rounded-b-lg">
        <div className="flex gap-2">
          <input
            type="text"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Digite uma mensagem..."
            className="flex-1 px-3 py-2 border rounded-lg focus:outline-none focus:border-blue-600"
          />
          <button
            type="submit"
            disabled={!newMessage.trim()}
            className="p-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:opacity-50 transition"
          >
            <Send size={18} />
          </button>
        </div>
      </form>
    </div>
  );
}
