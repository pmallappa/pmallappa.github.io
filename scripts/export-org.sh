#!/usr/bin/env bash
set -euo pipefail

# Batch export all org files to Hugo markdown using the local config.
# Intended for CI/CD usage.

ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
CONFIG="$ROOT_DIR/emacs-blog-config.el"

if [[ ! -f "$CONFIG" ]]; then
  echo "Config not found: $CONFIG" >&2
  exit 1
fi

if ! command -v emacs >/dev/null 2>&1; then
  echo "Emacs not found in PATH" >&2
  exit 1
fi

cd "$ROOT_DIR"

# Use batch mode; do not load user init; load our project config only.
emacs --batch \
  --no-init-file \
  --load "$CONFIG" \
  --funcall pmallappa/export-all-blog-posts
