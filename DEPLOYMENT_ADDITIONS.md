## Variáveis necessárias e passos adicionais

Adições feitas para produção e manutenção:

1. Variáveis de ambiente (veja `.env.example`)
   - `REDIS_URL`, `EMAIL_*`, `TWILIO_*`, `JWT_SECRET`, `STRIPE_*`, `FRONTEND_URL`, `SENTRY_DSN`

2. Migrar banco (SQLite):

```bash
# instalar sqlite3
./scripts/run-migrations.sh
```

3. Backup automático (exemplo via cron):

```
# ex: crontab -e
0 3 * * * /workspaces/mmmm/scripts/backup-db.sh
```

4. Painel de filas (Bull Board)
- A rota segura está disponível em `/admin/queues` (requer autenticação JWT + role `admin`).
- Recomendado proteger com TLS e acesso interno somente.

5. CI/CD
- Pipeline básico em `.github/workflows/ci.yml` já configurado para lint, test e build.

6. Observability
- Adicionar `SENTRY_DSN` em `.env` e configurar Sentry no `src/index.js`.

7. Execução local

```bash
# aplicar migrations
chmod +x ./scripts/run-migrations.sh
./scripts/run-migrations.sh

# start backend
cd backend && npm ci && NODE_ENV=development node src/index.js

# start frontend
cd frontend && npm ci && npm run dev
```

8. Segurança
- Configure `JWT_SECRET` forte e rotacione as chaves
- Limite de requests por IP configurado em middleware de rate limit

9. Próximos passos sugeridos
- Implementar dashboard admin para aprovar reviews/saques
- Automatizar pagamentos para afiliados (PIX)
- Habilitar monitoramento (Prometheus/Grafana)
