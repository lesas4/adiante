#!/usr/bin/env bash
# backup-db.sh - Faz dump do banco SQLite para backups/ com timestamp
set -euo pipefail

DB_PATH="${DATABASE_PATH:-./backend_data/database.db}"
BACKUP_DIR="${BACKUP_DIR:-./backups}"

mkdir -p "$BACKUP_DIR"
TS=$(date +"%Y%m%d_%H%M%S")
OUT="$BACKUP_DIR/db_backup_$TS.sqlite"

if [ ! -f "$DB_PATH" ]; then
  echo "Erro: banco não encontrado em $DB_PATH" >&2
  exit 1
fi

echo "Fazendo backup de $DB_PATH -> $OUT"
cp "$DB_PATH" "$OUT"

# Opcional: compactar
gzip -f "$OUT"

echo "Backup concluído: $OUT.gz"
