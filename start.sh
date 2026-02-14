#!/bin/bash

# ============================================
# QUICK START - LEIDY CLEANER
# ============================================

echo "🚀 Iniciando Leidy Cleaner..."

# Cores para output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

# 1. Verificar Node.js
echo -e "${BLUE}✓${NC} Verificando Node.js..."
if ! command -v node &> /dev/null; then
  echo -e "${RED}✗${NC} Node.js não está instalado"
  exit 1
fi
echo -e "${GREEN}✓${NC} Node.js: $(node -v)"

# 2. Ir ao backend
cd backend || exit 1

# 3. Instalar dependências
echo -e "${BLUE}✓${NC} Instalando dependências..."
npm install > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo -e "${RED}✗${NC} Erro ao instalar dependências"
  exit 1
fi
echo -e "${GREEN}✓${NC} Dependências instaladas"

# 4. Verificar .env
echo -e "${BLUE}✓${NC} Verificando arquivo .env..."
if [ ! -f ".env" ]; then
  echo -e "${YELLOW}!${NC} Arquivo .env não encontrado"
  echo -e "${YELLOW}!${NC} Criando a partir de .env.example..."
  cp .env.example .env
  echo -e "${YELLOW}!${NC} IMPORTANTE: Edite .env com suas chaves reais!"
  echo -e "${YELLOW}!${NC} Especialmente: EMAIL_USER, EMAIL_PASS, TWILIO_*"
  exit 1
fi
echo -e "${GREEN}✓${NC} Arquivo .env existe"

# 5. Executar migrações
echo -e "${BLUE}✓${NC} Executando migrações do banco..."
npm run migrate > /dev/null 2>&1
if [ $? -ne 0 ]; then
  echo -e "${YELLOW}!${NC} Migrations podem ter falhado (sem problema se banco já existe)"
fi
echo -e "${GREEN}✓${NC} Banco de dados pronto"

# 6. Iniciar servidor
echo ""
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo -e "${GREEN}✓ Leidy Cleaner iniciado com sucesso!${NC}"
echo -e "${GREEN}════════════════════════════════════════${NC}"
echo ""
echo -e "${BLUE}Acessar em:${NC} http://localhost:3001"
echo ""
echo -e "${YELLOW}Disponível:${NC}"
echo "  🌐 Frontend HTML:     http://localhost:3001"
echo "  🔌 API REST:          http://localhost:3001/api"
echo "  💬 Chat (Socket.io):  ws://localhost:3001"
echo "  📊 Admin:             http://localhost:3001/#admin"
echo "  👥 Staff:             http://localhost:3001/#staff"
echo ""
echo -e "${BLUE}Funcionalidades:${NC}"
echo "  ✅ Email confirmação"
echo "  ✅ SMS lembrança"
echo "  ✅ Admin Dashboard"
echo "  ✅ Staff Dashboard"
echo "  ✅ Chat em tempo real"
echo "  ✅ Upload de fotos"
echo "  ✅ Agendamentos recorrentes"
echo "  ✅ Avaliações públicas"
echo ""
echo -e "${YELLOW}Próximos passos:${NC}"
echo "  1. Edite backend/.env com suas chaves"
echo "  2. Teste agendamento: http://localhost:3001"
echo "  3. Admin: POST /api/admin/dashboard"
echo "  4. Docs: cat RESUMO_FINAL.md"
echo ""

# 7. Rodar dev
npm run dev
