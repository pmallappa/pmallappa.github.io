# pmallppa.github.io

Personal blog built with [dodeca](https://github.com/bearcove/dodeca), deployed
to GitHub Pages on every push to `main`.

## Local development

Install dodeca once:

```bash
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/bearcove/dodeca/releases/download/v0.2.13/dodeca-installer.sh | sh
```

Optional, only if you author `.drawio` diagrams locally:

```bash
curl --proto '=https' --tlsv1.2 -LsSf \
  https://github.com/bearcove/home-drawio/releases/latest/download/home-drawio-installer.sh | sh
```

Then:

```bash
./scripts/build-drawio.sh   # converts content/**/*.drawio -> *.svg
ddc serve                   # live-reload dev server
ddc build                   # one-shot build into public/
```

## Authoring

- **Standalone posts:** drop a markdown file in `content/posts/`.
- **Series:** make a directory under `content/series/<slug>/`, add `_index.md`
  for the landing page, then one `partN.md` per part. Each part needs a
  `weight = N` in its frontmatter so prev/next nav can sort them.
- **Diagrams:** save `.drawio` files anywhere under `content/` and reference
  the generated `.svg` from markdown. CI runs the conversion automatically.
- **Code blocks:** syntax highlighting is built in via tree-sitter; just use
  fenced blocks with a language hint.

## Deploy

Push to `main`. The workflow at `.github/workflows/deploy.yml` builds the site
and publishes it via GitHub Pages.

In the GitHub repo, set **Settings → Pages → Source: GitHub Actions**.

## Pinning

`DODECA_VERSION` is pinned in the workflow. Bump it when you want to track a
new release — dodeca is pre-1.0 and iterates fast.
