# 🛠️ COMO FAZER - GUIAS TÉCNICOS PASSO-A-PASSO

## 1️⃣ REGISTRAR WEBHOOK PIX NO BANCO

### Pré-requisitos
- [ ] Identificar qual banco (BB, Bradesco, Itaú, Nubank, PagSeguro)
- [ ] Ter contato do suporte do banco
- [ ] Ter a URL de produção pronta (ex: `https://termino.com.br`)

### Passo 1: Identificar o Banco
```bash
# Ver agência 0435 - qual banco?
# Agência 0435:
# - Se Banco do Brasil: Centro de São Paulo
# - Se Bradesco: Também SP
# - Se Itaú: Possível

# ACTION: Abrir seu app de banco e confirmar qual é
```

### Passo 2: Preparar a URL
```
Endpoint do seu webhook:
https://termino.com.br/api/payments/pix/webhook

Headers esperados:
Content-Type: application/json
Authorization: Bearer [JWT_TOKEN]

Body de teste do banco vai conter:
{
  "pix": {
    "valor": "100.00",
    "descricao": "Agendamento #123",
    "referencia": "123456",
    "status": "confirmado",
    "timestamp": "2026-02-14T10:30:00Z"
  }
}
```

### Passo 3: Registrar com o Banco

#### 🏦 **Banco do Brasil (PIX)**
```
Contato: Central de Atendimento
Tel: 4004-0001 ou 0800 729 0001
Site: bb.com.br/pix/comerciante
Email: pix@bb.com.br

Documento necessário:
- CPF/CNPJ da conta
- Telefone registrado
- Email
- URL webhook

Teste: Após registrado, eles enviam webhook de teste
```

#### 🏦 **Bradesco (PIX)**
```
Contato: Bradesco Negócios
Tel: 0800-701-1711
Site: bradesco.com.br/produtos-servicos/pix

Documento necessário:
- Chave PIX (telefone sua: 51 98033-0422)
- URL webhook
- Certificado SSL (seu domínio HTTPS)

Resposta esperada: HTTP 200-201
```

#### 🏦 **Itaú (PIX)**
```
Contato: Itaú Negócios
Tel: 0800-720-0707
Site: itau.com.br/pix/cobrador

Integração via: OpenAPI Itaú
Documentação: https://openapi.itau.com.br/

Requer:
- OAuth 2.0 token
- Chave cliente
```

### Passo 4: Validar Webhook

Após registar, o banco vai fazer um POST para sua URL. Seu servidor vai:

**Arquivo**: `backend/src/routes/paymentRoutes.js`
```javascript
// Endpoint já existe:
POST /api/payments/pix/webhook

// Ele recebe:
{
  "pix": {
    "valor": "100.00",
    "descricao": "Agendamento #",
    "status": "confirmado"
  }
}

// E retorna:
{
  "status": "recebido",
  "timestamp": "2026-02-14T10:30:00Z"
}
```

### Passo 5: Testar em Produção

```bash
# Banco vai enviar webhook de teste
# Você pode verificar em logs:
cd /workspaces/termino
tail -f backend/src/logs/webhook.log

# Ou via dashboard:
# SELECT * FROM webhook_logs WHERE type='pix' ORDER BY created_at DESC;
```

---

## 2️⃣ GERAR SECRETS SEGUROS

### Comando para Gerar JWT_SECRET
```bash
# Mac/Linux:
openssl rand -hex 32

# Resultado de exemplo:
# a3f8e2c1d9b4f6e8c2a5d7f9e1b3c5d7f8e9a0b1c2d3e4f5a6b7c8d9e0f1a

# Copiar e colar em .env
JWT_SECRET=a3f8e2c1d9b4f6e8c2a5d7f9e1b3c5d7f8e9a0b1c2d3e4f5a6b7c8d9e0f1a
```

### Stripe Secret Keys
```bash
# 1. Abrir: https://dashboard.stripe.com/apikeys
# 2. Fazer login
# 3. Copiar:
#    - Secret key (starts with sk_live_)
#    - Publishable key (starts with pk_live_)
# 4. Para webhook secret:
#    - Endpoints: https://dashboard.stripe.com/webhooks
#    - Criar novo: https://seu-dominio.com/api/webhooks/stripe
#    - Copiar "Signing secret"

.env:
STRIPE_SECRET_KEY=sk_live_51KZ...
STRIPE_PUBLIC_KEY=pk_live_51KZ...
WEBHOOK_SECRET_STRIPE=whsec_1KB...
```

### Google App Password (Email)

**Pré-requisito**: Gmail com 2FA habilitado

```bash
# 1. Abrir: https://myaccount.google.com/apppasswords
# 2. Login com sua conta
# 3. Selecionar:
#    - App: "Mail"
#    - Device: "Windows PC" (ou seu SO)
# 4. Clicar "Generate"
# 5. Copiar 16-char password

# Se não tiver 2FA, ativar:
# Configurações > Segurança > Verificação em 2 etapas

.env:
SMTP_USER=leidycleaner@gmail.com
SMTP_PASS=<16-char password gerado>
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
```

### Twilio SMS/WhatsApp
```bash
# 1. Abrir: https://www.twilio.com/console
# 2. Se não tiver conta: https://www.twilio.com/try-twilio
# 3. Verificar telefone (+55 51 XXXX-XXXX)
# 4. Copiar:
#    - Account SID (starts with AC...)
#    - Auth Token
# 5. Comprar número Twilio:
#    - Phone Numbers > Get Numbers
#    - Country: Brazil (+55)
#    - Capabilities: Voice, SMS, WhatsApp
#    - Cost: ~$1/mês

.env:
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=yyyyyyyyyyyyyyyyyy
TWILIO_PHONE_NUMBER=+5551xxxxxxx

# Testar SMS:
TWILIO_TEST_MODE=false  # true = não cobra
```

### Atualizar .env
```bash
# Arquivo local (NÃO commitar depois)
cd /workspaces/termino
vim backend/.env

# Ou copiar de .env.example:
cp backend/.env.example backend/.env
# Editar valores

# Validar (não salvar stdout):
grep -v "^#" backend/.env | grep -v "^$"
```

---

## 3️⃣ TESTAR EMAIL

### Setup

```bash
# 1. Instalar dependência (se não tiver)
cd backend
npm install nodemailer

# 2. Verificar .env está preenchido
cat .env | grep SMTP

# 3. Iniciar backend
npm run dev

# Deve ver:
# ✓ Email service ready on smtp.gmail.com:587
```

### Teste Manual via API

```bash
# Terminal 1: Backend rodando
cd /workspaces/termino/backend && npm run dev

# Terminal 2: Chamar endpoint de teste
curl -X POST http://localhost:3001/api/notifications/test-email \
  -H "Content-Type: application/json" \
  -d '{
    "to": "seu-email@gmail.com",
    "subject": "Test Email",
    "template": "booking_confirmation",
    "data": {
      "userName": "João Silva",
      "bookingId": "123",
      "date": "2026-02-14",
      "time": "10:00"
    }
  }'

# Resposta esperada:
# {"status": "enviado", "messageId": "xxxxx@google.com"}

# Verificar seu email inbox (pode levar até 1 min)
```

### Teste em Teste de Unidade

**Arquivo**: `backend/src/services/__tests__/NotificationService.test.js`

```javascript
describe('Email Sending', () => {
  it('should send email to valid address', async () => {
    const result = await NotificationService.sendEmail({
      to: 'test@example.com',
      subject: 'Test',
      template: 'booking_confirmation'
    });
    
    expect(result.status).toBe('enviado');
    expect(result.messageId).toBeDefined();
  });
});

// Rodar:
npm run test -- NotificationService.test.js
```

### Troubleshooting

| Erro | Solução |
|------|---------|
| `ECONNREFUSED` | SMTP_HOST incorreto. Verificar SMTP_HOST=smtp.gmail.com |
| `Invalid login` | SMTP_USER ou SMTP_PASS errado. Google App Password é 16 chars |
| `SSL Certificate problem` | Adicionar `rejectUnauthorized: false` (apenas dev) |
| `Email não chega` | Verificar spam, Gmail pode classificar como spam |

---

## 4️⃣ TESTAR SMS COM TWILIO

### Setup

```bash
# 1. Instalar
cd backend
npm install twilio

# 2. Verificar .env
cat .env | grep TWILIO

# 3. Backend rodando
npm run dev

# Ideal: Modo teste (não cobra)
TWILIO_TEST_MODE=true
```

### Teste via API

```bash
# Importância: Substitute +5551xxxxxxxxx com número real
curl -X POST http://localhost:3001/api/notifications/test-sms \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+5551xxxxxxxxx",
    "message": "Olá! Sua limpeza está agendada para amanhã às 10:00",
    "type": "sms"
  }'

# Resposta:
# {"status": "enviado", "sid": "SMxxxx..."}

# SMS chega em até 30 segundos
```

### WhatsApp (Mesmo Twilio)

```bash
curl -X POST http://localhost:3001/api/notifications/test-whatsapp \
  -H "Content-Type: application/json" \
  -d '{
    "phone": "+5551xxxxxxxxx",
    "message": "Olá! Sua limpeza está agendada para amanhã às 10:00",
    "type": "whatsapp"
  }'

# Resposta similar
# {"status": "enviado", "sid": "WHxxxx..."}
```

### Troubleshooting

| Erro | Solução |
|------|---------|
| `Twilio_Error: Authentication failed` | TWILIO_ACCOUNT_SID ou AUTH_TOKEN incorreto |
| `invalid_phone_number` | Adicionar +55 no começo: +551998033... |
| `Country not supported` (Brasil não suporta) | Usar outro número ou ajustar endpoint |

---

## 5️⃣ INTEGRAR QR CODE PIX

### Setup

```bash
cd frontend
npm install qrcode
```

### Implementar em Checkout

**Arquivo**: `frontend/src/pages/checkout.jsx`

```jsx
import QRCode from 'qrcode.react';

export default function Checkout() {
  const [qrCode, setQrCode] = useState(null);
  const [expiresIn, setExpiresIn] = useState(600); // 10 min

  useEffect(() => {
    // Após gerar BRCode do server
    const brCode = '00020126360014br.gov.bcb.brcode01051.0.0...';
    setQrCode(brCode);

    // Timer para expirar
    const interval = setInterval(() => {
      setExpiresIn(prev => {
        if (prev <= 1) clearInterval(interval);
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="checkout-pix">
      <h2>Escanear com seu Banco</h2>
      
      {qrCode && (
        <>
          <QRCode
            value={qrCode}
            size={300}
            level="H"
            includeMargin={true}
            renderAs="svg"
          />
          
          <p className="expires">Expira em: {Math.floor(expiresIn / 60)}:{String(expiresIn % 60).padStart(2, '0')}</p>
          
          <div className="or-divider">OU</div>
          
          <div className="pix-manual">
            <p>Copiar código PIX:</p>
            <input 
              type="text" 
              value={qrCode} 
              readOnly 
              onFocus={e => e.target.select()}
            />
            <button onClick={() => navigator.clipboard.writeText(qrCode)}>
              Copiar
            </button>
          </div>
        </>
      )}
    </div>
  );
}
```

### Testar

```bash
# Frontend rodando com HMR:
cd frontend
npm run dev

# Abrir http://localhost:3000/checkout
# Verificar QR code aparece
# Escanear com câmera do celular
# Deve abrir app do banco
```

---

## 6️⃣ SETUP DASHBOARD COM DADOS REAIS

### Endpoints da API (já existem)

```bash
# Obter estatísticas
GET /api/admin/stats

# Retorno:
{
  "revenue": 12500.50,  // total últimos 30 dias
  "bookings": 45,
  "customers": 32,
  "pending_payments": 2500
}

# Histórico mensal
GET /api/admin/stats/monthly

# Retorno:
[
  {"mes": "2025-12", "receita": 8000},
  {"mes": "2026-01", "receita": 10000},
  {"mes": "2026-02", "receita": 4500}
]
```

### Integrar no Frontend

```jsx
// frontend/src/pages/admin/dashboard.jsx

import { LineChart, Line, BarChart, Bar } from 'recharts';
import { useEffect, useState } from 'react';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);
  const [monthlyData, setMonthlyData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchStats() {
      try {
        const [statsRes, monthlyRes] = await Promise.all([
          fetch('/api/admin/stats').then(r => r.json()),
          fetch('/api/admin/stats/monthly').then(r => r.json())
        ]);

        setStats(statsRes);
        setMonthlyData(monthlyRes);
      } finally {
        setLoading(false);
      }
    }

    fetchStats();
  }, []);

  if (loading) return <div>Carregando...</div>;

  return (
    <div className="admin-dashboard">
      <h1>Dashboard Admin</h1>

      {/* Cards de KPI */}
      <div className="kpi-cards">
        <Card title="Receita" value={`R$ ${stats.revenue}`} />
        <Card title="Agendamentos" value={stats.bookings} />
        <Card title="Clientes" value={stats.customers} />
        <Card title="Pagamentos Pendentes" value={`R$ ${stats.pending_payments}`} />
      </div>

      {/* Gráfico de Receita */}
      <div className="chart-container">
        <h3>Receita Mensal</h3>
        <LineChart data={monthlyData}>
          <Line type="monotone" dataKey="receita" stroke="#22c55e" />
        </LineChart>
      </div>
    </div>
  );
}
```

---

**📌 Próximas ações**: Executar esses guias em sequência (Semana 1) e testar cada um!
