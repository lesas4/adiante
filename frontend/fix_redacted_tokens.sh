#!/bin/bash

# Corrigir padrões comuns de REDACTED_TOKEN

# 1. function [REDACTED_TOKEN](... -> funcDecoded = (...
find src -type f \( -name "*.jsx" -o -name "*.js" -o -name "*.tsx" -o -name "*.ts" \) | while read file; do
  # const [REDACTED_TOKEN] = -> const decoded = / const fetchData = / const trackEvent = / etc
  sed -i 's/const \[REDACTED_TOKEN\] = /const decoded = /g' "$file"
  sed -i 's/export const \[REDACTED_TOKEN\] = /export const Component = /g' "$file"
  sed -i 's/function \[REDACTED_TOKEN\]/function decodeToken/g' "$file"
  
  # Remover padrões problemáticos em [REDACTED_TOKEN]()
  sed -i 's/\[REDACTED_TOKEN\]()/decodedFunction()/g' "$file"
done

echo "Fix aplicado!"
