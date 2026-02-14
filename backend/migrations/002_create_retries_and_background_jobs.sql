-- Migration: create webhook_retries and background_jobs tables
-- Run with: sqlite3 backend_data/database.db < 002_create_retries_and_background_jobs.sql

BEGIN TRANSACTION;

CREATE TABLE IF NOT EXISTS webhook_retries (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  retry_id TEXT UNIQUE,
  operation_id TEXT,
  operation_type TEXT,
  payload TEXT,
  metadata TEXT,
  status TEXT DEFAULT 'pending',
  retry_count INTEGER DEFAULT 0,
  next_retry_at TEXT,
  last_error TEXT,
  created_at TEXT DEFAULT (datetime('now')),
  completed_at TEXT,
  failed_at TEXT
);

CREATE INDEX IF NOT EXISTS idx_webhook_retries_next ON webhook_retries(next_retry_at);

CREATE TABLE IF NOT EXISTS background_jobs (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  job_id TEXT UNIQUE,
  job_type TEXT,
  status TEXT,
  scheduled_at TEXT,
  started_at TEXT,
  completed_at TEXT,
  error_message TEXT,
  result TEXT,
  created_at TEXT DEFAULT (datetime('now'))
);

COMMIT;
