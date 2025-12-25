# AI Agent Rules for Personal Website Development

## Core Vision
A balanced personal website that is **neither too picture-heavy nor purely text-based** - finding the sweet spot between visual appeal and content focus.

## Inspiration Sources
- **fasterthanli.me**: Blog content structure, technical writing style, interactive elements
- **balajis.com**: Clean layout, organized information hierarchy  
- **Hugo framework**: Semantic CSS classes and content organization patterns

## Hosting & Technical Foundation
- **Platform**: GitHub Pages (Jekyll-compatible static generation)
- **Repository**: `pmallappa.github.io`
- **Tech Stack**: 
  - Lightweight, minimal Node.js dependencies
  - Static-first approach (pre-generated HTML/CSS/JS)
  - Modern web standards (ES6+, CSS Grid, Web Components)
  - Progressive enhancement philosophy

## Content Management System

### Source Format: Emacs Org-mode
- **Primary Writing**: All content authored in `.org` files
- **Export Pipeline**: `org-publish` → HTML with custom classes
- **Version Control**: Full content history in Git
- **Workflow**: Write → Export → Review → Deploy

### Content Categories
- **Technology**: Systems programming, languages, architecture, tools
- **Farming**: Agricultural techniques, sustainability, agtech innovations

### Directory Structure
```
content/
├── technology/
│   ├── systems/           # Kernel, virtualization, low-level
│   ├── languages/         # Programming languages, paradigms
│   └── architecture/      # Distributed systems, design patterns
├── farming/
│   ├── techniques/        # Growing methods, permaculture
│   ├── technology/        # Sensors, automation, precision ag
│   └── sustainability/    # Environmental practices, ethics
├── blog/                  # Date-organized posts
│   └── YYYY/MM/DD/name/
│       ├── index.org
│       └── images/
├── series/                # Multi-part content
│   └── series-name/
│       ├── 01-intro/
│       ├── 02-details/
│       └── images/
├── projects/              # Development projects
│   └── project-name/
│       ├── features/      # Feature documentation
│       ├── bugs/         # Bug reports and fixes  
│       ├── pull-requests/ # PR documentation
│       └── images/
└── resume/               # Professional profile
    ├── index.org
    └── portfolio/
```

## Visual Design Philosophy

### Content-First Balance
- **Not Picture-Oriented**: Minimal hero images, focus on typography
- **Not Text-Wall**: Strategic use of:
  - Code snippets with syntax highlighting
  - Diagrams and technical illustrations
  - Callout boxes and info panels
  - Structured lists and tables
  - Pull quotes and key takeaways

### Typography & Layout
- **Reading Experience**: Optimized line length, spacing, contrast
- **Hierarchy**: Clear heading structure, visual rhythm
- **Code Display**: Monospace fonts, syntax highlighting, copy buttons
- **Technical Content**: Equation support (MathJax), formula rendering

## Interactive Features (fasterthanli.me Inspired)

### JavaScript Class-Based Modals
- **Table of Contents**: Sidebar modal with section navigation
- **Search Interface**: Fuzzy search popup with keyboard shortcuts
- **Code Interactions**: Expandable snippets, language switching
- **Image Galleries**: Lightbox-style viewing (when images are needed)

### Animations & Micro-interactions
- **Navbar Behavior**: 
  - Hidden by default on scroll down
  - Slides in smoothly on upward scroll
  - Keyboard accessible, mobile-friendly
- **Sidebar TOC**: 
  - Slides in from right on desktop
  - Full-screen overlay on mobile
  - Smooth scroll to sections with progress indication
- **Search Popup**:
  - Keyboard shortcut activation (Ctrl+K)
  - Fuzzy matching with result highlighting
  - Category-based filtering
  - Escape key dismissal

## Technical Implementation

### Hugo-Inspired CSS Classes
```css
/* Content Structure */
.article-header, .article-meta, .article-body
.content-section, .content-sidebar
.post-list, .post-preview, .post-meta

/* Interactive Elements */
.modal-overlay, .modal-content, .modal-close
.search-popup, .search-input, .search-results
.toc-sidebar, .toc-item, .toc-active

/* Content Types */
.code-block, .code-inline, .code-copy-btn
.callout-info, .callout-warning, .callout-tip
.series-nav, .series-prev, .series-next
.tag-list, .tag-item, .category-badge
```

### Org-mode Export Configuration
```elisp
;; Custom org-publish setup for website
(setq org-publish-project-alist
      '(("pmallappa-website"
         :base-directory "~/pmallappa.github.io/content/"
         :publishing-directory "~/pmallappa.github.io/_site/"
         :recursive t
         :publishing-function org-html-publish-to-html
         :html-head-include-default-style nil
         :html-head "<link rel=\"stylesheet\" href=\"/assets/css/main.css\" />"
         :section-numbers nil
         :with-toc nil
         :html-postamble nil)))
```

### Performance Standards
- **Bundle Size**: < 150KB total (HTML+CSS+JS)
- **Load Time**: First meaningful paint < 1.5s
- **Lighthouse**: 95+ performance score
- **Accessibility**: WCAG 2.1 AA compliance
- **Mobile**: Touch-friendly, responsive design

## Content Strategy

### Writing Style (fasterthanli.me approach)
- **Technical Depth**: In-depth exploration of topics
- **Personal Voice**: First-person perspective, authentic tone
- **Code Examples**: Working, tested code snippets
- **Progressive Disclosure**: Complex topics broken into digestible sections
- **Cross-linking**: Rich internal navigation between related content

### Content Types & Templates
1. **Blog Posts**: Personal thoughts, experiences, tutorials
2. **Series Articles**: Multi-part deep dives (with navigation)
3. **Project Documentation**: Features, bugs, development process
4. **Resume/Portfolio**: Professional showcase with projects

## Development Workflow

### Daily Workflow
1. **Write**: Compose in Emacs Org-mode
2. **Preview**: Local org-export to HTML
3. **Refine**: Edit content and styling
4. **Export**: Full site generation via org-publish
5. **Deploy**: Git push → GitHub Actions → Live site

### Maintenance
- **Content Updates**: Regular posting schedule
- **Technical Debt**: Minimal dependencies, regular audits
- **Performance**: Monthly Lighthouse audits
- **Accessibility**: Keyboard navigation testing, screen reader validation

## Agent Guidelines

### Decision Making Principles
1. **Simplicity Over Complexity**: Choose the simpler solution when functionality is equivalent
2. **Performance First**: Every addition must justify its performance impact
3. **Accessibility Always**: No feature ships without keyboard and screen reader support
4. **Content Focus**: Technical decisions should enhance content consumption
5. **Maintainability**: Prefer solutions that reduce long-term maintenance burden

### Code Quality Standards
- **Vanilla JavaScript**: Avoid heavy frameworks, use Web APIs directly
- **Semantic HTML**: Proper document structure, heading hierarchy
- **Progressive CSS**: Mobile-first, graceful enhancement
- **Performance Budgets**: Monitor bundle size, loading times
- **Browser Support**: Modern browsers, graceful degradation for older ones

---

*This specification guides all AI agents working on the personal website. Every decision should align with the core philosophy: lightweight, content-focused, technically excellent, and user-friendly.*