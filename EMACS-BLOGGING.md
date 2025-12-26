# Blogging with Emacs and Org-Mode

A comprehensive guide to writing blog posts, projects, and series using Emacs org-mode with ox-hugo for this Hugo static site.

## Directory Structure Quick Reference

| Content Type | Source Location | Export Location | HUGO_BASE_DIR |
|--------------|-----------------|-----------------|---------------|
| Articles | `content-org/articles/YYYY/MM/DD/` | `content/blog/YYYY/MM/DD/` | `../../../../../` |
| Projects | `content-org/projects/slug/` | `content/projects/slug/` | `../../../` |
| Series Index | `content-org/series/YYYY/name/` | `content/series/YYYY/name/` | `../../../../` |

**Note**: Series articles are regular articles (stored by date) with `:series` front matter linking them to the series index.

## Prerequisites

- **Emacs** (preferably with Doom Emacs or Spacemacs)
- **ox-hugo** package for exporting org-mode to Hugo markdown
- **org-mode** (usually included with Emacs)

### Installing ox-hugo

For Doom Emacs, add to `~/.doom.d/packages.el`:
```elisp
(package! ox-hugo)
```

For vanilla Emacs, install via `package-install`:
```elisp
M-x package-install RET ox-hugo RET
```

## Quick Start

1. **Load the configuration**:
   ```elisp
   M-x load-file RET emacs-blog-config.el RET
   ```

2. **Setup the blog environment**:
   ```elisp
   C-c h S
   ```
   Or: `M-x pmallappa/setup-blog-environment`

3. **Create your first post**:
   ```elisp
   C-c h n
   ```
   Or: `M-x org-capture` then press `a` for article, `p` for project, or `s` for series

## Directory Structure

```
pmallappa.github.io/
├── content/              # Generated Hugo markdown files
│   ├── blog/            # Articles (from org)
│   │   └── YYYY/
│   │       └── MM/
│   │           └── DD/
│   │               ├── slug.md
│   │               └── images/
│   ├── projects/        # Projects (from org)
│   │   └── slug/
│   │       ├── slug.md
│   │       └── images/
│   └── series/          # Series (from org)
│       └── YYYY/
│           └── series-name/
│               ├── series-name.md
│               └── images/
├── contents-org/        # Source org-mode files
│   ├── articles/       # Articles by date
│   │   └── YYYY/
│   │       └── MM/
│   │           └── DD/
│   │               ├── slug.org
│   │               └── images/
│   ├── projects/       # Project org files
│   │   └── slug/
│   │       ├── slug.org
│   │       └── images/
│   └── series/         # Series org files
│       └── YYYY/
│           └── series-name/
│               ├── series-name.org
│               └── images/
└── emacs-blog-config.el # Emacs configuration
```

## Workflow

### The Three-State Workflow

Based on [Armin Darvish's efficient blogging workflow](https://www.armindarvish.com/post/building_an_efficient_blogging_workflow_in_emacs/):

1. **DRAFT** - Capture initial ideas, not exported to markdown yet
2. **POST** - Ready for editing, exports with `draft: true` for preview
3. **PUBLISH** - Finalized, exports with `draft: false` for production

### Working with Series

A series consists of:
1. **Series Index Page** - Overview and list of all articles in the series (in `contents-org/series/YYYY/series-name/`)
2. **Series Articles** - Individual posts that belong to the series (in `contents-org/articles/YYYY/MM/DD/`)

Articles are organized by date (`YYYY/MM/DD`), which allows:
- Multiple implementations on the same day
- Chronological organization
- Clear temporal relationships

Create them in order:
1. First create the series index with `s` (Blog Series) - you'll specify the year
2. Then create articles within that series with `S` (Series Article) - you'll specify the full date

### Changing States

Change TODO state with: `C-c C-t` or `S-<right/left>`

When you change state:
- **DRAFT → POST**: Automatically exports to markdown with `draft: true`
- **POST → PUBLISH**: Automatically exports with `draft: false`
- **PUBLISH → DRAFT**: Sets back to draft mode

## Available Commands

All commands are available under the `C-c h` prefix:

| Key       | Command                              | Description                           |
|-----------|--------------------------------------|---------------------------------------|
| `C-c h S` | `pmallappa/setup-blog-environment`   | Initialize blog environment           |
| `C-c h n` | `pmallappa/new-blog-post`            | Create new post interactively         |
| `C-c h s` | `pmallappa/hugo-server-start`        | Start Hugo dev server                 |
| `C-c h q` | `pmallappa/hugo-server-stop`         | Stop Hugo dev server                  |
| `C-c h e` | `pmallappa/export-all-blog-posts`    | Export all org files to markdown      |
| `C-c h a` | `pmallappa/blog-agenda`              | View all blog posts in agenda         |
| `C-c h f` | `pmallappa/blog-focus-writing`       | Enable distraction-free writing mode  |
| `C-c h u` | `pmallappa/update-blog-agenda-files` | Update org-agenda with blog files     |

## Creating Content

### Using Org Capture (Recommended)

1. Start capture: `M-x org-capture` or `C-c c`
2. Choose content type:
   - `a` - Blog Article
   - `p` - Project
   - `s` - Series (creates series index page)
   - `S` - Series Article (creates article within an existing series)
3. Fill in the prompted fields
4. Start writing!

**For Series**: First create the series index with `s`, then create individual articles with `S`.

### Using Interactive Command

```elisp
M-x pmallappa/new-blog-post
```

Follow the prompts to enter:
- Post title
- Content type (article/project/series)
- Description
- Category
- Tags

## Article/Blog Post Example

Articles are organized by date in `content-org/articles/YYYY/MM/DD/`:

```org
#+TITLE: My Awesome Blog Post
#+DATE: 2025-12-26
#+HUGO_BASE_DIR: ../../../../../
#+HUGO_SECTION: blog/2025/12/26
#+EXPORT_FILE_NAME: my-awesome-blog-post
#+OPTIONS: todo:nil
#+HUGO_DRAFT: true
#+HUGO_CATEGORIES: technology

#+begin_description
A comprehensive guide to building awesome things with modern tools.
#+end_description

* TODO My Awesome Blog Post

** Introduction

This is where you write your content...

** Main Content

More content here...

** Conclusion

Final thoughts...
```

**Note**: `HUGO_BASE_DIR` is `../../../../../` to go up from `articles/YYYY/MM/DD/` to the Hugo root.

## Project Example

```org
#+TITLE: Cool Project
#+DATE: 2025-12-26
#+HUGO_BASE_DIR: ../../
#+HUGO_SECTION: projects
#+EXPORT_FILE_NAME: cool-project
#+HUGO_CATEGORIES: open-source
#+HUGO_TAGS: rust embedded hardware
#+HUGO_CUSTOM_FRONT_MATTER: :project_type personal :status ongoing :tech_stack ["Rust", "Embedded Linux"] :github https://github.com/user/project
#+EXPORT_HUGO_DRAFT: true

#+begin_description
An innovative IoT project for precision agriculture.
#+end_description

* DRAFT Cool Project

** Project Overview
- *Status*: ongoing
- *Tech Stack*: Rust, Embedded Linux, IoT
- *Repository*: [[https://github.com/user/project][GitHub Link]]

** Description

Project details go here...
```

## Series Index Example

Series are organized by year in `content-org/series/YYYY/series-name/`:

```org
#+TITLE: Advent of Code 2015: Rust Solutions
#+DATE: 2015-01-01
#+HUGO_BASE_DIR: ../../../../
#+HUGO_SECTION: series/2015/advent-of-code-2015
#+EXPORT_FILE_NAME: _index
#+OPTIONS: todo:nil
#+HUGO_DRAFT: true
#+HUGO_CATEGORIES: programming

#+begin_description
A complete walkthrough of solving all 25 days of Advent of Code 2015 using Rust.
#+end_description

* TODO Advent of Code 2015: Rust Solutions

Join me as I solve all 25 days of Advent of Code 2015 using Rust!

** Articles in This Series

1. Day 1: Not Quite Lisp
2. Day 2: I Was Told There Would Be No Math
...
```

**Note**: `HUGO_BASE_DIR` is `../../../../` to go up from `series/YYYY/series-name/` to the Hugo root.

## Series Article Example

Articles are organized by date in `content-org/articles/YYYY/MM/DD/`:

```org
#+TITLE: Advent of Code 2015 Day 1: Not Quite Lisp
#+DATE: 2015-12-01
#+HUGO_BASE_DIR: ../../../../../
#+HUGO_SECTION: blog/2015/12/01
#+EXPORT_FILE_NAME: aoc-2015-day-01-not-quite-lisp
#+OPTIONS: todo:nil
#+HUGO_DRAFT: true
#+HUGO_CATEGORIES: programming

#+begin_description
Solving Advent of Code 2015 Day 1 in Rust: navigating floors with parentheses.
#+end_description

* TODO Advent of Code 2015 Day 1: Not Quite Lisp

*Part of the Advent of Code 2015 series*

Article content here...
```

**Note**: Series articles use the date-based structure (`YYYY/MM/DD`), which allows multiple articles per day if needed.

## Focus Writing Mode

Press `C-c h f` to enable focus mode:
- Hides property drawers
- Enables spell-checking (flyspell)
- Goes fullscreen (if available)
- Removes distractions

Exit fullscreen: `F11` or toggle with same command

## Previewing Content

1. Start Hugo server: `C-c h s`
2. Visit http://localhost:1313 in your browser
3. With `--navigateToChanged` flag, Hugo auto-navigates to your latest changes
4. Changes appear live as you save your org file

Stop server: `C-c h q`

## Viewing All Posts

Use the custom agenda view:
```elisp
C-c h a
```

Or from org-agenda:
```elisp
M-x org-agenda RET b
```

This shows all blog posts with DRAFT, POST, or PUBLISH status.

## Adding Images

1. Images should be placed in the `images/` subdirectory of your post
2. Reference them in org-mode:
   ```org
   [[file:images/screenshot.png]]
   ```
3. They will be copied automatically during export

## Front Matter Options

### Common to All Types
- `HUGO_BASE_DIR` - Path to Hugo root
  - Articles: `../../../../` (from `YYYY/MM/DD/`)
  - Projects: `../../` (from `projects/slug/`)
  - Series: `../../../` (from `series/YYYY/series-name/`)
- `HUGO_SECTION` - Hugo section (blog/projects/series)
- `EXPORT_FILE_NAME` - Slug for URL
- `HUGO_CATEGORIES` - Content category
- `HUGO_TAGS` - Space or comma-separated tags
- `EXPORT_HUGO_DRAFT` - true/false (managed by TODO state)

### Project-Specific
- `project_type` - personal/professional/open-source
- `status` - ongoing/completed/archived
- `tech_stack` - Array of technologies
- `github` - GitHub repository URL

### Series-Specific
- `series_count` - Number of articles in series

## Tips and Best Practices

### 1. Use TODO States Consistently
- Start with **DRAFT** for all new ideas
- Move to **POST** when ready to preview
- Only **PUBLISH** when completely done

### 2. Write Descriptive Summaries
The `#+begin_description` block becomes the post summary in Hugo. Make it compelling!

### 3. Organize Images
Keep images in the `images/` subdirectory for each post. This keeps everything organized.

### 4. Tag Appropriately
Use consistent tags across posts for better discoverability:
- Technology areas: `rust`, `golang`, `python`
- Topics: `performance`, `security`, `architecture`
- Post types: `tutorial`, `guide`, `reference`

### 5. Use Focus Mode
When writing long content, use `C-c h f` to minimize distractions.

### 6. Preview Regularly
Keep Hugo server running and preview your changes as you write.

### 7. Leverage Org-Mode Features
- Use org-mode headings (`**`, `***`) for structure
- Use code blocks with syntax highlighting
- Use tables, lists, and other org features
- They all export nicely to markdown

## Keyboard Shortcuts Cheat Sheet

### Org-Mode Basics
- `C-c C-t` - Cycle TODO state
- `S-<left/right>` - Also cycle TODO state
- `C-c C-e` - Export menu (choose `h H` for Hugo)
- `C-c '` - Edit code block in language mode
- `TAB` - Cycle fold/unfold heading
- `S-TAB` - Cycle fold/unfold entire document

### Blog-Specific
- `C-c h S` - Setup blog environment
- `C-c h n` - New blog post
- `C-c h s` - Start Hugo server
- `C-c h q` - Stop Hugo server
- `C-c h e` - Export all posts
- `C-c h a` - Blog agenda
- `C-c h f` - Focus writing mode
- `C-c h u` - Update agenda files

### Capture
- `C-c c` or `M-x org-capture` - Start capture
- `a` - Article template
- `p` - Project template
- `s` - Series template
- `C-c C-c` - Finish capture
- `C-c C-k` - Abort capture

## Troubleshooting

### Export Not Working
1. Make sure ox-hugo is installed: `M-x package-list-packages`
2. Check that `HUGO_BASE_DIR` points to the correct location
3. Verify file path structure matches expected layout

### Hugo Server Not Starting
1. Make sure Hugo is installed: `hugo version`
2. Check that you're in the correct directory
3. Look at the `*blog-hugo-server*` buffer for errors

### Changes Not Appearing
1. Make sure you saved the org file: `C-x C-s`
2. Check TODO state triggers export (POST or PUBLISH)
3. Manually export if needed: `C-c h e` or `C-c C-e h H`

### Images Not Showing
1. Check image path is relative to the org file
2. Ensure images are in the `images/` subdirectory
3. Verify image filename has no spaces

## Resources

- [Ox-Hugo Documentation](https://ox-hugo.scripter.co/)
- [Org-Mode Manual](https://orgmode.org/manual/)
- [Hugo Documentation](https://gohugo.io/documentation/)
- [Armin Darvish's Blogging Workflow](https://www.armindarvish.com/post/building_an_efficient_blogging_workflow_in_emacs/)

## Configuration Reference

The blog configuration file `emacs-blog-config.el` provides:
- Auto-export on TODO state change
- Capture templates with pre-filled front matter
- Custom agenda views
- Hugo server management
- Focus writing mode
- Logging and time tracking

Load it in your Emacs init file or manually each session.

---

Happy blogging! 🚀
