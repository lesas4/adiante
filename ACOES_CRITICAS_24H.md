# 📋 CHECKLIST AÇÃO IMEDIATA - 24 HORAS

## 🔴 CRÍTICO - NÃO FAZER DEPLOY SEM ISSO

### [ ] 1. Webhook PIX Registrado no Banco
**Ação**: Contactar banco e registrar endpoint  
**Banco**: ? (agência 0435)  
**Endpoint**: `https://seu-dominio.com/api/payments/pix/webhook`  
**Método**: POST  
**Auth**: Bearer [JWT]  
**Status Esperado**: Code 200  

📞 Contactar: +5551 98033-0422 (seu number PIX)  
📧 Email banco: suporte@seu-banco.com.br  

**Next Steps**:
1. Ligar para banco
2. Preencher formulário de webhook
3. Testar com simulador
4. Documentar secret/token recebido

### [ ] 2. Preparar Secrets Seguros
**Arquivo**: `.env` (NÃO commitar)

```bash
# GERADOR: openssl rand -hex 32
JWT_SECRET=<gerar com comando acima>

# Stripe - ir em https://dashboard.stripe.com/apikeys
STRIPE_SECRET_KEY=sk_live_... (obter chave real)
STRIPE_PUBLIC_KEY=pk_live_...
WEBHOOK_SECRET_STRIPE=whsec_... (gerar no dashboard)

# Email Google - https://myaccount.google.com/apppasswords
SMTP_USER=leidycleaner@gmail.com
SMTP_PASS=<gerar app password>

# Twilio - https://console.twilio.com
TWILIO_ACCOUNT_SID=ACxxxxxxxxxxxxxxxx
TWILIO_AUTH_TOKEN=yyyyyyyyyyyyyyyyyy
TWILIO_PHONE_NUMBER=+5551xxxxxxx

# PIX / Banco
BANK_PIX_KEY=51_98033_0422
BANK_ACCOUNT=5961069655-2
BANK_OPERATION=3701
BANK_AGENCY=0435
```

**Action Summary**:
- [ ] Gerar JWT_SECRET com openssl
- [ ] Obter credenciais Stripe reais
- [ ] Criar Google App Password
- [ ] Criar conta Twilio + credenciais
- [ ] Atualizar `.env` local
- [ ] Testar cada um

### [ ] 3. Testar Email em Desenvolvimento
**Arquivo**: `backend/src/services/NotificationService.js`

```bash
# No terminal, testar:
curl -X POST http://localhost:3001/api/notifications/test-email \
  -H "Content-Type: application/json" \
  -d '{"to": "seu-email@gmail.com", "subject": "Test"}'
```

**Resultado Esperado**: Email chega em até 30 segundos

### [ ] 4. Testar SMS/WhatsApp
**Arquivo**: `backend/src/services/TwilioService.js`

```bash
curl -X POST http://localhost:3001/api/notifications/test-sms \
  -H "Content-Type: application/json" \
  -d '{"phone": "+5551xxxxxxxxx", "message": "Test SMS"}'
```

---

## 🟡 ALTO IMPACTO - ANTES DO DEPLOY

### [ ] 5. Dashboard Admin com Dados Reais
**Status**: Mock data hoje  
**Target**: Gráficos com dados reais  

**Arquivo**: `frontend/src/pages/admin/dashboard.jsx`

**To Do**:
```
- [ ] Importar Chart.js
- [ ] Query /api/admin/stats (endpoints prontos)
- [ ] Render 4 gráficos:
    1. Revenue últimos 12 meses
    2. Bookings por status
    3. Top customers
    4. Recent transactions
```

**Esforço**: 3-4 horas

### [ ] 6. QR Code PIX Dinâmico em Checkout
**Status**: Gerador de BRCode pronto, UI falta  
**Arquivo**: `frontend/src/pages/checkout.jsx`

**To Do**:
```javascript
- [ ] npm install qrcode
- [ ] Import QRCode component
- [ ] Gerar QR do BRCode recebido
- [ ] Display com:
    - QR code image
    - Botão Copy (copiar código)
    - Timer (expires em 10 min)
    - Auto-refresh status
```

**Esforço**: 2-3 horas

### [ ] 7. Email Templates Finalizados
**Status**: HTML pronto, não testado  
**Arquivo**: `backend/src/utils/emailTemplates.js`

**To Do**:
```
- [ ] Testar envio real (com Google App Password)
- [ ] Adicionar:
    - Logo da empresa
    - Link de confirmação
    - Footer com contatos
    - Versão mobile-responsive
- [ ] Prever todos os tipos:
    - Confirmação agendamento
    - Lembrete 24h antes
    - Cancelamento
    - Recibo de pagamento
```

**Esforço**: 2-3 horas

### [ ] 8. Payment Webhook com Retries
**Status**: Primeiro envio pronto, retry falta  
**Arquivo**: `backend/src/services/PaymentService.js`

**To Do**:
```
- [ ] npm install bull
- [ ] Setup Redis (ou in-memory)
- [ ] Criar queue: payment-confirmation
- [ ] On webhook:
    1. Tentar confirmar pagamento
    2. Se falhar, adicionar à queue
    3. Retry com backoff: 1m, 5m, 15m, 1h, 6h
    4. Se fizer 5 tentativas, alertar admin
```

**Esforço**: 2-3 horas

---

## 📊 TIMELINE ESTIMADA

| Tarefa | Horas | Dias | Sem |
|--------|-------|------|-----|
| Secrets + Webhook | 3 | 1 | **Hoje** |
| Email/SMS Test | 2 | 0.5 | **Hoje** |
| Dashboard Real | 4 | 1 | **Amanhã** |
| QR Code PIX | 3 | 1 | **Amanhã** |
| Email Templates | 3 | 1 | **Quarta** |
| Webhook Retries | 3 | 1 | **Quarta** |
| **TOTAL** | **18 horas** | **4.5 dias** | Fim desta semana ✓ |

---

## ✅ SUCESSO CRITERIUM

Site está **pronto para produção** quando:

- [x] PIX webhook registrado + testado
- [x] Todos os secrets em `.env` preenchidos
- [x] Email saindo com sucesso
- [x] SMS/WhatsApp testado
- [x] Dashboard mostrando dados reais
- [x] QR code visível em checkout
- [x] Botão "Copiar código PIX" funciona
- [x] Email templates enviados em todos os eventos

---

## 🎯 DEPOIS DO DEPLOY (PRÓXIMAS 2 SEMANAS)

1. **Review System** - Users deixar feedback (3-4h)
2. **Admin Settings** - Configurar preços, horários, etc (3-4h)
3. **Booking Recorrente** - Agendamentos repetidos (5-6h)
4. **Performance** - Lazy load images, otimizar bundle (3h)
5. **SEO** - Meta tags, sitemap, og:image (3h)
6. **E2E Tests** - Playwright automático (4h)
7. **Referral System** - Link compartilható (3h)

---

**📌 PRIORITÁRIO**: Não avançar além desses 8 steps sem completar os 4 primeiros (Críticos)!
