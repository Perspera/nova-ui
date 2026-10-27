#!/bin/bash
# Headless screenshot of a running dev server page.
# usage: scripts/shot.sh <path> <name> [width] [height]
# e.g.   scripts/shot.sh /f/query/A query-A 1440 900   → /tmp/shots/query-A.png
set -u
W=${3:-1440}
H=${4:-900}
PORT=${PORT:-4317}
mkdir -p /tmp/shots
PROFILE=$(mktemp -d /tmp/shot-profile.XXXXXX)
timeout 30 google-chrome --headless=new --disable-gpu --no-sandbox --hide-scrollbars \
  --user-data-dir="$PROFILE" --force-device-scale-factor=1 --window-size="$W,$H" \
  --virtual-time-budget=8000 --screenshot="/tmp/shots/$2.png" \
  "http://127.0.0.1:$PORT$1" >/dev/null 2>&1
rm -rf "$PROFILE"
echo "/tmp/shots/$2.png"
