#!/usr/bin/env bash
set -euo pipefail

if [ -z "${1:-}" ]; then
  echo "Usage: $0 <domain>" >&2
  exit 1
fi

DOMAIN=$1

echo "Installing certbot and requesting cert for $DOMAIN"
sudo apt-get update
sudo apt-get install -y certbot

sudo certbot certonly --standalone -d "$DOMAIN" --non-interactive --agree-tos -m admin@$DOMAIN

echo "Certificates stored in /etc/letsencrypt/live/$DOMAIN"
