#!/usr/bin/env bash
# Simple SQLite backup script
set -euo pipefail

DB_PATH=${1:-backend/backend_data/database.sqlite}
BACKUP_DIR=${2:-/workspaces/termino/backups}
TIMESTAMP=$(date +%F_%H%M%S)

mkdir -p "$BACKUP_DIR"
echo "Backing up $DB_PATH to $BACKUP_DIR/database_${TIMESTAMP}.sqlite"
cp "$DB_PATH" "$BACKUP_DIR/database_${TIMESTAMP}.sqlite"
echo "Vacuuming copy (optional)"
sqlite3 "$BACKUP_DIR/database_${TIMESTAMP}.sqlite" "VACUUM;"
echo "Backup complete"
