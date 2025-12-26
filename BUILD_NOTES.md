# Hugo + Tailwind Development Notes

## Efficient Build Process

### What Gets Built When:

**Never rebuilt (cached):**
- Alpine.js (served from CDN - 15KB, cached by browsers)
- Tailwind utilities (only rebuilt when CSS classes change in content)

**Only rebuilt when changed:**
- Tailwind CSS (Hugo detects content changes automatically)
- Custom JS (only when assets/js/main.js changes)
- Content (only when .md files change)

### Development Workflow:

```bash
# One-time setup
npm install

# Start development (automatic rebuilds)
hugo server --buildDrafts

# Production build (one command)
hugo --minify
```

### How Hugo Optimizes:

1. **Asset Pipeline**: Hugo automatically processes Tailwind via PostCSS
2. **Smart Rebuilds**: Only rebuilds changed assets/content
3. **CSS Purging**: Tailwind automatically removes unused CSS in production
4. **Fingerprinting**: Cache busting only when assets actually change
5. **CDN Delivery**: Alpine.js loads once, cached forever

### Build Times:

- **First build**: ~2-3 seconds (includes Tailwind processing)
- **Incremental builds**: ~50-200ms (only changed files)
- **CSS-only changes**: ~100-500ms (Tailwind rebuild)
- **Content-only changes**: ~10-50ms (Markdown processing)

### Bundle Sizes:

- **Alpine.js**: 15KB (CDN cached)
- **Tailwind CSS**: 15-40KB after purging (depends on usage)
- **Custom JS**: 2-5KB (your Alpine components)
- **Total**: ~30-60KB (well under 150KB limit)

## No Manual Building Required!

Hugo handles everything automatically:
- ✅ Tailwind CSS processing with PostCSS
- ✅ Asset minification and fingerprinting
- ✅ Smart incremental rebuilds
- ✅ CSS purging in production
- ✅ Live reload during development

## Emacs (org-mode → ox-hugo) Quick Start

- Launch in writing profile (no GUI):
	```bash
	emacs -nw --profile writing
	```
- In any org buffer for this site, turn on auto-export to Hugo:
	```elisp
	M-x org-hugo-auto-export-mode
	```
- To export everything manually: `C-c h e` (from emacs-blog-config.el bindings)
- To preview: `C-c h s` starts `hugo server --buildDrafts --navigateToChanged`