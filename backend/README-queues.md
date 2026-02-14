Queues and Redis (Retry jobs)
================================

This project uses a Bull-based retry queue to reprocess failed webhooks, notifications and reconciliation tasks.

Requirements
- Redis running and reachable via `REDIS_URL` environment variable.

Quick start (development)

1. Install Redis (Ubuntu):

```bash
sudo apt update
sudo apt install redis-server
sudo systemctl enable --now redis-server
```

2. Start the app (ensure `REDIS_URL` set in `backend/.env`):

```bash
cd backend
npm install
export REDIS_URL=redis://127.0.0.1:6379
npm run dev
```

3. Enqueue test job (Node REPL):

```js
const retryQueue = require('./src/queues/retryQueue');
retryQueue.add({ type: 'processWebhook', payload: { webhookId: 123 } });
```

Migration
- Run `sqlite3 backend_data/database.db < backend/migrations/001_create_notifications_and_webhooks.sql`
