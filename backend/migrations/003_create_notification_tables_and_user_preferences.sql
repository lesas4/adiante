-- Migration: create user_preferences, notification_queue, notification_logs
-- Run with: sqlite3 backend/backend_data/database.sqlite < 003_create_notification_tables_and_user_preferences.sql

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS user_preferences (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER UNIQUE,
  email_enabled INTEGER DEFAULT 1,
  sms_enabled INTEGER DEFAULT 0,
  whatsapp_enabled INTEGER DEFAULT 0,
  push_enabled INTEGER DEFAULT 1,
  reminder_2days INTEGER DEFAULT 1,
  reminder_1day INTEGER DEFAULT 1,
  reminder_1hour INTEGER DEFAULT 0,
  phone_number TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  updated_at TEXT
);

CREATE TABLE IF NOT EXISTS notification_queue (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  bookingId INTEGER,
  notification_type TEXT,
  scheduled_send_time TEXT,
  delivery_channels TEXT,
  status TEXT DEFAULT 'pending',
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS notification_logs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  userId INTEGER,
  bookingId INTEGER,
  type TEXT,
  status TEXT,
  recipient TEXT,
  message_template TEXT,
  message_content TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_notif_queue_scheduled ON notification_queue(scheduled_send_time);

COMMIT;
