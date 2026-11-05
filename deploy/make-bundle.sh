#!/bin/bash
# Packs the server setup files into gora-server-setup.tar.gz (upload it to the VPS, docs/deploy.md step 3).
set -euo pipefail
cd "$(dirname "$0")"
tar -czf ../gora-server-setup.tar.gz setup-vps.sh server nginx
echo "made gora-server-setup.tar.gz"
