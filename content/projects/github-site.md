---
title: "Personal Portfolio & Blog - pmallappa.github.io"
date: 2024-12-25
draft: false
type: "projects"
tags: ["hugo", "static-site", "tailwind", "github-pages", "web-development"]
categories: ["technology"]
summary: "Modern static website built with Hugo, featuring dual landing pages for technology portfolio and farming content, with custom layouts and Tailwind CSS styling."
project_type: "personal"
status: "ongoing"
series_count: 2
github: "https://github.com/pmallappa/pmallappa.github.io"
tech_stack: ["Hugo", "Tailwind CSS", "GitHub Pages", "Markdown", "HTML/CSS", "JavaScript"]
---

## Project Overview

This project represents a complete rebuild of my personal portfolio and blog using Hugo, the fastest static site generator. The site showcases a unique dual-landing page approach, serving both technology-focused content and agricultural/farming content from a single Hugo instance.

## Architecture & Design

### Dual Landing Page System

The site features two distinct landing pages with separate visual identities:

1. **Technology Portfolio** (`/`) - Main landing page featuring:
   - Software engineering expertise showcase
   - 23 years of experience highlight
   - Tech stack and skills display
   - Professional social links
   - Dark theme with modern typography

2. **Farming & Agriculture** (`/farming/`) - Alternative landing page with:
   - Agricultural technology focus
   - Green nature-inspired theme
   - Three main focus areas: Sustainability, Techniques, Technology
   - Separate navigation and content structure

### Content Structure

The site organizes content into a hierarchical structure:

```
Articles (Blog Posts)
  └── Individual technical articles
  
Series (Collections of Articles)  
  ├── Modern Systems Architecture
  └── Microservices Patterns
  
Projects (Collections of Series)
  ├── IoT Edge Computing Platform
  └── GitHub Site (this project)
  
Farming (Separate Content Tree)
  ├── Sustainability
  ├── Techniques
  └── Technology
```

## Technical Implementation

### Hugo Configuration

- **Content Management**: Organized sections with custom taxonomies
- **Templating**: Custom layouts for each content type
- **Performance**: Optimized build with Hugo stats and cache busting
- **SEO**: Structured data and semantic HTML

### Styling Approach

**Tailwind CSS** integration with custom components:
- Responsive grid layouts
- Custom color schemes per section
- Glassmorphism effects for farming section
- Dark mode considerations
- Mobile-first responsive design

### Key Features

#### Section-Specific Layouts
Each content type has custom list and single page layouts:
- **Articles**: Card-based layout with tags and reading time
- **Series**: Collection view with article counts
- **Projects**: Detailed project cards with tech stack badges
- **Farming**: Category-based organization with subsections

#### Navigation System
- Main menu for primary sections (hidden farming)
- Cross-site navigation between tech and farming landing pages
- Breadcrumb navigation within sections
- Previous/Next article navigation

#### Content Enhancements
- Syntax highlighting for code blocks
- Table of contents generation
- Social sharing links
- Related content suggestions
- Series progression tracking

## Development Workflow

### Tools & Environment
- **Hugo**: v0.152.2+extended
- **Tailwind CSS**: JIT compilation
- **PostCSS**: CSS processing pipeline
- **Git**: Version control
- **GitHub Pages**: Deployment target

### Build Process

```bash
# Development server
hugo server --bind 0.0.0.0 --port 1313

# Production build
hugo --minify

# Deploy to GitHub Pages
git push origin main
```

### Content Creation

Articles use front matter for metadata:
```yaml
---
title: "Article Title"
date: 2024-12-25
type: "articles"
tags: ["tag1", "tag2"]
categories: ["technology"]
series: ["Series Name"]
---
```

## Challenges & Solutions

### Challenge 1: Dual Landing Pages
**Problem**: Hugo typically has one homepage layout
**Solution**: Created custom layout type for farming section with `layout: "farming-home"` and separate template

### Challenge 2: Section Isolation
**Problem**: Keeping farming content separate from main navigation
**Solution**: Commented out farming from menu config but maintained all layouts and content structure

### Challenge 3: Consistent Theming
**Problem**: Different visual identities for tech vs farming
**Solution**: Created section-specific CSS classes with Tailwind's @layer components

### Challenge 4: Content Organization
**Problem**: Managing hierarchical relationships (Projects → Series → Articles)
**Solution**: Used Hugo's taxonomy system and custom front matter parameters

## Performance Metrics

- **Build Time**: ~1.4 seconds for 81 pages
- **Lighthouse Score**: Target 95+ across all categories
- **Bundle Size**: Optimized with Tailwind purge
- **Page Load**: <1 second on modern connections

## Future Enhancements

### Planned Features
- [ ] Full-text search functionality
- [ ] Dark/light theme toggle
- [ ] Comments system (possibly utterances)
- [ ] RSS feed customization
- [ ] Social media card previews
- [ ] Analytics integration
- [ ] Newsletter signup integration

### Content Expansion
- [ ] Complete microservices series
- [ ] Add more farming articles
- [ ] Technical deep-dives on systems programming
- [ ] Project case studies
- [ ] Tutorial series for beginners

### Technical Improvements
- [ ] Implement service worker for offline access
- [ ] Add progressive web app features
- [ ] Optimize image loading with WebP
- [ ] Implement lazy loading for images
- [ ] Add animations and transitions
- [ ] Accessibility audit and improvements

## Lessons Learned

1. **Hugo's Flexibility**: Hugo's template system is powerful once you understand the lookup order
2. **Content Architecture**: Planning content hierarchy upfront saves refactoring later
3. **Styling Strategy**: Tailwind + custom CSS provides best balance of utility and customization
4. **Build Performance**: Hugo's speed enables rapid iteration and experimentation
5. **Static Site Benefits**: No server, database, or complex deployments needed

## Resources & References

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [GitHub Pages Guide](https://pages.github.com/)
- [HugoBricks Theme](https://github.com/jhvanderschee/hugobricks) - Inspiration for component system

## Project Stats

- **Lines of Code**: ~2,500 (templates, styles, configs)
- **Content Files**: 81 pages
- **Custom Layouts**: 12 templates
- **CSS Components**: 25+ custom classes
- **Build Time**: 1.4 seconds
- **Deployment**: Automated via GitHub Actions

---

This project demonstrates modern static site generation techniques, content management strategies, and the power of Hugo for building fast, maintainable websites with complex content structures.
