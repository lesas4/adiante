#!/usr/bin/env bash
# run-migrations.sh - Executa todos os arquivos .sql em database/migrations
set -euo pipefail

MIGRATIONS_DIR="$(dirname "$0")/../database/migrations"
DB_PATH="${DATABASE_PATH:-./backend_data/database.db}"

if [ ! -d "$MIGRATIONS_DIR" ]; then
  echo "Diretório de migrations não encontrado: $MIGRATIONS_DIR" >&2
  exit 1
fi

if [ ! -f "$DB_PATH" ]; then
  echo "Banco não existe em $DB_PATH. Criando arquivo..."
  mkdir -p "$(dirname "$DB_PATH")"
  sqlite3 "$DB_PATH" ".databases"
fi

for f in $(ls "$MIGRATIONS_DIR"/*.sql | sort); do
  echo "Aplicando migration: $f"
  sqlite3 "$DB_PATH" ".read $f"
done

echo "Todas migrations aplicadas com sucesso. DB: $DB_PATH"
