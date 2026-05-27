# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## What this is

Personal blog (pmallppa.github.io) built with [dodeca](https://github.com/bearcove/dodeca), deployed to GitHub Pages on every push to `main`.

The visual shell is adapted from the Hugo Porto demo at https://hugo-porto.netlify.app/.
Keep the Roboto/Poppins typography pairing and three-line hero treatment aligned with that source unless intentionally redesigning.

## Commands

```bash
# Install dodeca (once)
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/bearcove/dodeca/releases/download/v0.2.13/dodeca-installer.sh | sh

# Install home-drawio (optional — only needed for .drawio diagrams)
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/bearcove/home-drawio/releases/latest/download/home-drawio-installer.sh | sh

# Convert .drawio diagrams to .svg
./scripts/build-drawio.sh

# Local dev server with live reload
ddc serve

# Build into public/
ddc build
```

Validate content changes with `ddc build` before committing; use `ddc serve` to inspect rendering, links, and diagrams.

## Content structure

- `content/posts/` — standalone Markdown posts
- `content/series/<slug>/` — multi-part series: `_index.md` for the landing page, `partN.md` per part (each needs `weight = N` in frontmatter for prev/next nav)
- `content/**/*.drawio` — Draw.io diagrams; converted to sibling `.svg` by `scripts/build-drawio.sh`

`public/` is the build output directory; never commit it.

## Deployment

Push to `main`. The workflow at `.github/workflows/deploy.yml` installs the pinned `DODECA_VERSION`, converts diagrams, runs `ddc build`, and publishes `public/` to GitHub Pages. To upgrade dodeca, bump `DODECA_VERSION` in that workflow.

## Template architecture

Templates use [Tera](https://keats.github.io/tera/) (Jinja2-like). All templates extend `templates/base.html` via `{% extends "base.html" %}` and fill `{% block body %}`.

| Template | Used for |
|---|---|
| `base.html` | Site shell: fonts, CSS vars, dark-mode script, navbar, footer |
| `index.html` | Homepage — hero word cloud + recent posts from `/posts/` subsection |
| `section.html` | List pages (`/posts/`, `/series/`, series landing pages) |
| `page.html` | Individual post or series part |

Theme toggle cycles `system → dark → light` via `window.__cyclePreferredTheme()` (stored in `localStorage`). CSS custom properties live in `base.html`; Tailwind utility classes in `static/css/tailwind.css`.

The hero background words in `templates/index.html` are hardcoded. Update them there when changing the homepage tagline keywords.

## Frontmatter conventions

Posts and series parts use TOML frontmatter (`+++ … +++`). Required fields:

```toml
title = "…"

[extra]
description = "…"   # shown in card previews
date = "YYYY-MM-DD"
draft = false
```

Series parts additionally need `weight = N` (integer) for prev/next navigation ordering.

## Shell scripts

Scripts in `scripts/` use `set -euo pipefail`, quoted variables, and degrade gracefully when optional tools or directories are absent.
