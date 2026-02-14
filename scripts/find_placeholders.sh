#!/usr/bin/env bash
set -euo pipefail

echo "Procurando por palavras-chave: TODO|FIXME|PLACEHOLDER"
git grep -n --line-number --no-color -E "TODO|FIXME|PLACEHOLDER" || true

echo "Salvando relatório para .placeholder_report.txt"
git grep -n --line-number --no-color -E "TODO|FIXME|PLACEHOLDER" > .placeholder_report.txt || true
wc -l .placeholder_report.txt || true
