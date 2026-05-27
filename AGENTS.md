# Repository Guidelines

## Project Structure & Module Organization

This repository contains a personal blog built with `dodeca` and deployed to GitHub Pages. The root includes `README.md` for setup notes, `.github/workflows/deploy.yml` for CI deployment, and `scripts/` for local helper scripts.

Author content under `content/` when present:

- `content/posts/`: standalone Markdown posts.
- `content/series/<slug>/`: multi-part series with `_index.md` plus `partN.md` files.
- `content/**/*.drawio`: source diagrams converted to sibling SVG files.

Generated output goes to `public/` and should not be committed. Build artifacts such as `target/`, `node_modules/`, and generated `content/**/*.drawio.svg` files are ignored.

## Build, Test, and Development Commands

- `./scripts/build-drawio.sh`: converts `content/**/*.drawio` diagrams to `.svg` when `home-drawio` is installed. It exits cleanly if `content/` or `home-drawio` is missing.
- `./scripts/build-drawio.sh content`: explicitly converts diagrams under `content/`.
- `ddc serve`: starts the local live-reload development server.
- `ddc build`: builds the static site into `public/`, matching the GitHub Pages workflow.

Install `dodeca` before local development. Install `home-drawio` only if editing Draw.io diagrams.

## Coding Style & Naming Conventions

Write Markdown posts with clear headings, fenced code blocks with language hints, and frontmatter consistent with nearby content. Series parts should use `partN.md` naming and include `weight = N` so navigation sorts correctly.

Shell scripts use Bash, `set -euo pipefail`, quoted variables, and simple portable commands. Keep helper scripts in `scripts/` and make them safe to run when optional tools or directories are absent.

## Testing Guidelines

There is no dedicated test suite in this repository. Validate changes by running `./scripts/build-drawio.sh` and `ddc build` before submitting. For content-only changes, also use `ddc serve` to inspect rendered pages, links, diagrams, and code highlighting.

## Commit & Pull Request Guidelines

This checkout does not expose Git history, so no project-specific commit convention can be inferred. Use short, imperative commit subjects such as `Add series landing page` or `Update deploy workflow`.

Pull requests should describe the content or build change, mention any generated assets, and include screenshots for visual layout changes. Link related issues when applicable and confirm the local validation commands you ran.

## Deployment Notes

Pushing to `main` triggers `.github/workflows/deploy.yml`, installs pinned `DODECA_VERSION`, converts diagrams, runs `ddc build`, and publishes `public/` through GitHub Pages. Update the workflow pin intentionally when adopting a new dodeca release.
