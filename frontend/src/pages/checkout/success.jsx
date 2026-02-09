import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

export default function CheckoutSuccess() {
  const router = useRouter()
  const [sessionData, setSessionData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const { session_id } = router.query

    if (!session_id) return

    // Buscar dados da sessão
    const fetchSession = async () => {
      try {
        const res = await fetch(`/api/payments/session/${session_id}`)
        const data = await res.json()

        if (data.success) {
          setSessionData(data)
        }
      } catch (error) {
        console.error('Erro ao buscar session:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchSession()
  }, [router.query])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-green-600 mb-4">⏳ Processando...</h1>
          <p className="text-gray-600">Validando seu pagamento</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50 flex items-center justify-center py-12 px-4">
      <div className="max-w-md w-full bg-white rounded-lg shadow-xl p-8 text-center">
        {/* Ícone de sucesso */}
        <div className="mb-6">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
            <span className="text-4xl">✅</span>
          </div>
        </div>

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Pagamento Confirmado!
        </h1>

        <p className="text-gray-600 mb-6">
          Suas horas de limpeza foram creditadas com sucesso.
        </p>

        {sessionData && (
          <div className="bg-green-50 border-2 border-green-200 rounded-lg p-6 mb-8 text-left">
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-600">Pacote Adquirido</p>
                <p className="text-2xl font-bold text-green-600">
                  {sessionData.metadata?.hourPackage}h
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Valor Pago</p>
                <p className="text-xl font-bold text-gray-900">
                  R$ {(sessionData.amount).toFixed(2)}
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Status</p>
                <p className="text-lg font-semibold text-green-600">
                  {sessionData.status === 'paid' ? '✅ Pago' : 'Processando...'}
                </p>
              </div>
            </div>
          </div>
        )}

        <div className="bg-blue-50 border-l-4 border-blue-500 p-4 mb-8 rounded">
          <p className="text-sm text-gray-700">
            💡 Suas horas estão disponíveis na sua conta. Você pode começar a agendar serviços agora!
          </p>
        </div>

        <div className="space-y-3">
          <Link href="/agendar">
            <a className="block w-full px-6 py-3 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-bold rounded-lg hover:shadow-lg transition">
              📅 Agendar Agora
            </a>
          </Link>

          <Link href="/dashboard">
            <a className="block w-full px-6 py-3 bg-gray-100 text-gray-700 font-bold rounded-lg hover:bg-gray-200 transition">
              📊 Minha Conta
            </a>
          </Link>

          <Link href="/">
            <a className="text-green-600 hover:text-green-700 font-semibold">
              ← Voltar à home
            </a>
          </Link>
        </div>

        {/* Detalhes técnicos */}
        <div className="mt-8 pt-8 border-t border-gray-200 text-xs text-gray-500">
          <p className="mb-2">Recebimento confirmado</p>
          <p className="font-mono text-gray-600">
            {new Date().toLocaleString('pt-BR')}
          </p>
        </div>
      </div>
    </div>
  )
}
