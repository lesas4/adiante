-- Migration: create notifications and webhook_events tables
-- Run with: sqlite3 backend_data/database.db < 001_create_notifications_and_webhooks.sql

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS notifications (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  type TEXT NOT NULL, -- email | sms | whatsapp
  recipient TEXT NOT NULL,
  subject TEXT,
  body TEXT,
  scheduled_for TEXT,
  sent INTEGER DEFAULT 0,
  sent_at TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_notifications_scheduled ON notifications(scheduled_for);

CREATE TABLE IF NOT EXISTS webhook_events (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  provider TEXT,
  event_type TEXT,
  payload TEXT,
  signature TEXT,
  received_at TEXT DEFAULT (datetime('now')),
  processed INTEGER DEFAULT 0,
  processed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_webhook_events_received ON webhook_events(received_at);

COMMIT;
