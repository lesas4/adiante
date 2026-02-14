Production Secrets
==================

Store these values in your secret manager and never commit them to git.

- STRIPE_SECRET_KEY
- SMTP_HOST
- SMTP_PORT
- SMTP_USER
- SMTP_PASS
- EMAIL_FROM
- TWILIO_ACCOUNT_SID
- TWILIO_AUTH_TOKEN
- TWILIO_FROM
- WEBHOOK_SECRET_PIX
- JWT_SECRET
- REDIS_URL
- DATABASE_URL (Postgres connection string if using Postgres)

Example (environment variables):

```
export STRIPE_SECRET_KEY=sk_live_xxx
export SMTP_PASS=xxxx
export WEBHOOK_SECRET_PIX=supersecretvalue
```
