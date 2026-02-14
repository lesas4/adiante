Runbook - Termino
=================

Incident triage:

1. Check health endpoints:
   - `GET /health`
   - `GET /health/db`
   - `GET /health/queue`

2. If queues failing:
   - Check Redis: `redis-cli ping`
   - Check worker logs (`pm2 logs retry-worker` or `journalctl -u retry-worker`)

3. If DB errors:
   - Verify backups in `/backups`
   - Restore via `sqlite3` or point to a Postgres instance

4. Payment issues (PIX/Stripe):
   - Verify `WEBHOOK_SECRET_PIX` matches bank configuration
   - Check `/api/payments/pix/webhook` logs and `webhook_events` table

5. Escalation:
   - Notify on-call via Slack, include request id and relevant logs
