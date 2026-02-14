#!/usr/bin/env bash
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
DEST="$ROOT/tests_disabled"
mkdir -p "$DEST"

echo "Procurando arquivos de teste com __PLACEHOLDER..."
FILES=$(git grep -l -- "__PLACEHOLDER" -- '*.test.js' '*.spec.js' || true)

if [ -z "$FILES" ]; then
  echo "Nenhum teste com __PLACEHOLDER encontrado. Saindo.";
  exit 0
fi

echo "Movendo arquivos para $DEST"
for f in $FILES; do
  echo "- $f"
  mkdir -p "$DEST/$(dirname "$f")"
  git mv "$f" "$DEST/$f" || mv "$f" "$DEST/$f"
done

echo "Arquivos movidos. Atualize ou reabilite manualmente em tests_disabled/."
