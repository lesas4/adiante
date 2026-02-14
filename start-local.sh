#!/bin/bash

# ╔════════════════════════════════════════════════════════════════════════════╗
# ║                                                                            ║
# ║                    🚀 SCRIPT: COMEÇAR SISTEMA COMPLETO                    ║
# ║                                                                            ║
# ║                   (Limpeza PRO - Sistema Pronto para Usar)                ║
# ║                                                                            ║
# ╚════════════════════════════════════════════════════════════════════════════╝

echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo "  ✅ LIMPEZA PRO - COMEÇAR (npm start)"
echo "════════════════════════════════════════════════════════════════════════════"
echo ""

# Verificar se está na pasta correta
if [ ! -f "backend/package.json" ]; then
  echo "❌ Erro: Execute este script da raiz do projeto (./start-local.sh)"
  exit 1
fi

echo "📋 PRÉ-REQUISITOS:"
echo "  ✅ backend/.env configurado"
echo "  ✅ frontend/.env.local configurado"
echo "  ✅ npm install rodado (backend e frontend)"
echo "  ✅ npm run build rodado (frontend)"
echo ""

echo "⏳ Iniciando sistema..."
echo ""

# Cores
GREEN='\033[0;32m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  🟢 INICIANDO BACKEND (Express.js na porta 3000)${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo "  $ cd backend && npm start"
echo ""
echo "  Esperado:"
echo "  ✓ 'Express server rodando na porta 3000'"
echo "  ✓ 'Database initialized'"
echo "  ✓ Sem erros de conexão"
echo ""
echo "  🎯 Quando ver essas mensagens, abra OUTRO terminal para o frontend"
echo ""

cd backend && npm start &
BACKEND_PID=$!

# Esperar o backend iniciar
sleep 5

echo ""
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo -e "${CYAN}  🟢 INICIANDO FRONTEND (Next.js na porta 3001)${NC}"
echo -e "${CYAN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo "  $ cd frontend && npm start"
echo ""
echo "  Esperado:"
echo "  ✓ Abre automaticamente http://localhost:3001"
echo "  ✓ Renderiza homepage"
echo "  ✓ Sem erros críticos"
echo ""

cd ../frontend && npm start &
FRONTEND_PID=$!

echo ""
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}  ✅ SISTEMA INICIADO COM SUCESSO!${NC}"
echo -e "${GREEN}════════════════════════════════════════════════════════════${NC}"
echo ""
echo "  URLs disponíveis:"
echo "  • Backend:  http://localhost:3000"
echo "  • Frontend: http://localhost:3001"
echo ""
echo "  APIs disponíveis:"
echo "  • Health:   GET http://localhost:3000/api/health"
echo "  • Swagger:  GET http://localhost:3000/api-docs"
echo ""
echo "  Logs:"
echo "  • Backend:  Procure por '[info]' no terminal do backend"
echo "  • Frontend: Procure por warnings/errors no terminal do frontend"
echo ""
echo "════════════════════════════════════════════════════════════════════════════"
echo ""
echo "💡 Para PARAR o sistema:"
echo "   • Pressione Ctrl+C em ambos os terminais"
echo "   • OU execute: kill $BACKEND_PID $FRONTEND_PID"
echo ""
echo "❓ Dúvidas?"
echo "   • Leia: CORRECOES_APLICADAS.md (tudo que foi corrigido)"
echo "   • Leia: DEPLOYMENT_READY.md (guia de deploy)"
echo "   • Leia: ACOES_PRIORITARIAS.md (próximos passos)"
echo ""
echo "════════════════════════════════════════════════════════════════════════════"

# Esperar Ctrl+C
wait
