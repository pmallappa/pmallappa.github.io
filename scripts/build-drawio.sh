#!/usr/bin/env bash
# Walk content/ and convert every *.drawio to a sibling *.svg via home-drawio.
# Skips conversion when the SVG is newer than the source.
set -euo pipefail

if ! command -v home-drawio >/dev/null 2>&1; then
  echo "home-drawio not found on PATH; skipping diagram build."
  exit 0
fi

content_root="${1:-content}"

if [[ ! -d "$content_root" ]]; then
  echo "content directory '$content_root' not found; skipping diagram build."
  exit 0
fi

found=0
while IFS= read -r -d '' src; do
  found=1
  dst="${src%.drawio}.svg"
  if [[ -f "$dst" && "$dst" -nt "$src" ]]; then
    echo "  up-to-date: $dst"
    continue
  fi
  echo "  rendering:  $src -> $dst"
  home-drawio "$src" "$dst"
done < <(find "$content_root" -type f -name '*.drawio' -print0)

if [[ "$found" -eq 0 ]]; then
  echo "No .drawio files found under $content_root."
fi
