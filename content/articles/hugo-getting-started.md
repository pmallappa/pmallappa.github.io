---
title: "Getting Started with Hugo - Installation and First Site"
date: 2024-12-25
draft: false
type: "articles"
tags: ["hugo", "static-sites", "web-development", "tutorial"]
categories: ["technology"]
series: ["Building Modern Static Sites with Hugo"]
part: 1
summary: "Learn how to install Hugo and create your first static website, understanding the basic project structure and configuration."
---

## Introduction

Hugo is the world's fastest static site generator, capable of building thousands of pages in seconds. In this first part of our series, we'll get Hugo installed and create our first site from scratch.

## Why Hugo?

Before we dive in, let's understand why Hugo has become so popular:

- **Speed**: Builds sites in milliseconds
- **Flexibility**: Complete control over HTML output
- **Simplicity**: No database, just plain text files
- **Security**: Static files mean no server vulnerabilities
- **Cost**: Free hosting on GitHub Pages, Netlify, etc.

## Prerequisites

You'll need:
- A terminal/command line
- A text editor (VS Code, Sublime Text, etc.)
- Git (for version control)
- Basic understanding of HTML and Markdown

## Installing Hugo

### On macOS

Using Homebrew:
```bash
brew install hugo
```

### On Linux

Using package manager (Ubuntu/Debian):
```bash
sudo apt-get install hugo
```

Or download the latest release from [Hugo's GitHub releases](https://github.com/gohugoio/hugo/releases).

### On Windows

Using Chocolatey:
```bash
choco install hugo -confirm
```

Or download the Windows installer from the official website.

### Verify Installation

Check your Hugo version:
```bash
hugo version
```

You should see output like:
```
hugo v0.152.2+extended linux/amd64 BuildDate=unknown
```

**Important**: Make sure you have the **extended** version of Hugo, which includes support for processing Sass/SCSS.

## Creating Your First Site

### Step 1: Generate a New Site

```bash
hugo new site my-portfolio
cd my-portfolio
```

This creates a new Hugo site with the following structure:

```
my-portfolio/
├── archetypes/     # Content templates
├── assets/         # Files to be processed (CSS, JS)
├── content/        # Your content files
├── data/           # Data files for generating content
├── layouts/        # Template files
├── static/         # Static files (images, fonts)
├── themes/         # Theme directory
└── hugo.toml       # Site configuration
```

### Step 2: Understanding the Structure

Let's explore each directory:

**content/** - This is where your Markdown files live. Each file becomes a page on your site.

**layouts/** - HTML templates that define how your content is rendered.

**static/** - Files that are copied directly to the output (images, CSS, JavaScript).

**hugo.toml** - Main configuration file for your site.

### Step 3: Basic Configuration

Open `hugo.toml` and update it:

```toml
baseURL = "https://yourusername.github.io"
languageCode = "en-us"
title = "My Portfolio"
theme = ""  # We'll add this later

[params]
  author = "Your Name"
  description = "Personal portfolio and blog"
```

### Step 4: Create Your First Content

Create a simple homepage:

```bash
hugo new _index.md
```

Edit `content/_index.md`:

```markdown
---
title: "Welcome"
date: 2024-12-25
---

# Welcome to My Site

This is my first Hugo site!
```

### Step 5: Create a Simple Layout

Since we don't have a theme yet, let's create a basic layout.

Create `layouts/_default/baseof.html`:

```html
<!DOCTYPE html>
<html lang="{{ .Site.LanguageCode }}">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{ .Title }} | {{ .Site.Title }}</title>
</head>
<body>
    <header>
        <h1>{{ .Site.Title }}</h1>
        <nav>
            <a href="/">Home</a>
        </nav>
    </header>
    <main>
        {{ block "main" . }}{{ end }}
    </main>
    <footer>
        <p>&copy; {{ now.Year }} {{ .Site.Params.author }}</p>
    </footer>
</body>
</html>
```

Create `layouts/index.html`:

```html
{{ define "main" }}
<div class="content">
    {{ .Content }}
</div>
{{ end }}
```

### Step 6: Run the Development Server

Start Hugo's built-in server:

```bash
hugo server
```

You should see output like:

```
Web Server is available at http://localhost:1313/
Press Ctrl+C to stop
```

Open your browser and visit `http://localhost:1313` - you'll see your site!

## Understanding Hugo's Directory Structure

### Content Organization

Hugo uses the content directory structure to determine URLs:

```
content/
├── _index.md           → /
├── about.md            → /about/
└── blog/
    ├── _index.md       → /blog/
    └── first-post.md   → /blog/first-post/
```

### Front Matter

Every content file starts with front matter - metadata about the page:

```yaml
---
title: "Page Title"
date: 2024-12-25
draft: false
tags: ["hugo", "tutorial"]
---
```

### Template Lookup Order

Hugo looks for templates in a specific order. For the homepage:
1. `layouts/index.html`
2. `layouts/_default/list.html`

For regular pages:
1. `layouts/_default/single.html`

## Next Steps

In this tutorial, you learned:
- ✅ How to install Hugo
- ✅ Creating a new site
- ✅ Understanding the directory structure
- ✅ Basic configuration
- ✅ Creating your first content
- ✅ Running the development server

### Coming Up Next

In **Part 2: Content Organization Strategies**, we'll explore:
- Sections and taxonomies
- Front matter best practices
- Creating multiple content types
- Organizing content for scale

## Quick Reference

```bash
# Create new site
hugo new site mysite

# Create new content
hugo new posts/my-post.md

# Start development server
hugo server

# Build production site
hugo --minify

# Check version
hugo version
```

## Common Issues

**Problem**: `hugo: command not found`
**Solution**: Hugo isn't in your PATH. Reinstall or add Hugo's location to PATH.

**Problem**: Site builds but shows no content
**Solution**: Check that `draft: false` in your content front matter.

**Problem**: Changes not appearing
**Solution**: Hugo server caches. Restart with `hugo server --noHTTPCache`

## Resources

- [Hugo Documentation](https://gohugo.io/documentation/)
- [Hugo Forums](https://discourse.gohugo.io/)
- [Hugo Themes](https://themes.gohugo.io/)

---

Ready to continue? Move on to [Part 2: Content Organization Strategies](#) to learn how to structure your content for growth!
