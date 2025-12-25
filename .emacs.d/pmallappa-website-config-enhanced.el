;; Enhanced Personal Website Org-Publish Configuration
;; Component-oriented extensible export system

(require 'ox-publish)
(require 'ox-html)

;; Custom HTML export settings
(setq org-html-doctype "html5"
      org-html-html5-fancy t
      org-html-validation-link nil
      org-html-head-include-scripts nil
      org-html-head-include-default-style nil
      org-html-checkbox-type 'html
      org-html-table-attributes '(:class "table"))

;; Component System: Custom export filters
(defun pmallappa/org-html-special-block (special-block contents info)
  "Convert special blocks to custom HTML components."
  (let* ((type (org-element-property :type special-block))
         (raw-value (org-element-property :raw-value special-block))
         (attributes (org-export-read-attribute :attr_html special-block)))
    (cond
     ;; Callout component
     ((string-match "^callout-\\(.*\\)" type)
      (let ((callout-type (match-string 1 type))
            (title (plist-get attributes :title)))
        (format "<div class=\"callout callout-%s\">%s%s</div>"
                callout-type
                (if title (format "<div class=\"callout-title\">%s</div>" title) "")
                contents)))
     
     ;; Code tabs component
     ((string= type "code-tabs")
      (format "<div class=\"code-tabs\">%s</div>" contents))
     
     ;; Gallery component
     ((string= type "gallery")
      (format "<div class=\"gallery\">%s</div>" contents))
     
     ;; Series navigation
     ((string= type "series-nav")
      (let ((prev (plist-get attributes :prev))
            (next (plist-get attributes :next))
            (title (plist-get attributes :title)))
        (format "<nav class=\"series-nav\">%s%s%s</nav>"
                (if prev (format "<a href=\"%s\" class=\"series-prev\">← %s</a>" prev "Previous") "")
                (if title (format "<div class=\"series-title\">%s</div>" title) "")
                (if next (format "<a href=\"%s\" class=\"series-next\">%s →</a>" next "Next") ""))))
     
     ;; Project status component
     ((string= type "project-status")
      (let ((status (plist-get attributes :status))
            (version (plist-get attributes :version))
            (license (plist-get attributes :license)))
        (format "<div class=\"project-status\">%s</div>"
                (concat
                 (if status (format "<span class=\"status\">Status: %s</span>" status) "")
                 (if version (format "<span class=\"version\">Version: %s</span>" version) "")
                 (if license (format "<span class=\"license\">License: %s</span>" license) "")))))
     
     ;; Default: pass through with class
     (t (format "<div class=\"%s\">%s</div>" type contents)))))

(defun pmallappa/org-html-src-block (src-block contents info)
  "Enhanced source code block with copy button and syntax highlighting."
  (let* ((lang (org-element-property :language src-block))
         (code (org-html-format-code src-block info))
         (label (let ((lbl (org-element-property :name src-block)))
                  (if lbl (format " id=\"%s\"" lbl) ""))))
    (format
     "<div class=\"code-block\"%s>
        <div class=\"code-header\">
          <span class=\"code-language\">%s</span>
          <button class=\"code-copy-btn\" title=\"Copy to clipboard\">Copy</button>
        </div>
        <pre class=\"src src-%s\"><code>%s</code></pre>
      </div>"
     label
     (or lang "text")
     (or lang "example")
     code)))

(defun pmallappa/org-html-link (link desc info)
  "Custom link handler for internal navigation and external resources."
  (let* ((type (org-element-property :type link))
         (raw-path (org-element-property :path link))
         (path (org-link-unescape raw-path)))
    (cond
     ;; Demo links
     ((string= type "demo")
      (format "<a href=\"/demos/%s\" class=\"demo-link\" target=\"_blank\">%s 🚀</a>"
              path (or desc path)))
     
     ;; Blog internal links
     ((string= type "blog")
      (format "<a href=\"/blog/%s\" class=\"internal-link\">%s</a>"
              path (or desc path)))
     
     ;; Project internal links
     ((string= type "project")
      (format "<a href=\"/projects/%s\" class=\"internal-link\">%s</a>"
              path (or desc path)))
     
     ;; Default: use standard link handling
     (t (org-html-link link desc info)))))

(defun pmallappa/org-html-table (table contents info)
  "Enhanced table with responsive styling."
  (let ((caption (org-export-get-caption table)))
    (format "<div class=\"table-container\">%s<table class=\"table\">%s</table></div>"
            (if caption (format "<div class=\"table-caption\">%s</div>" caption) "")
            contents)))

;; Register custom export filters
(setq org-export-filter-special-block-functions '(pmallappa/org-html-special-block))
(setq org-export-filter-src-block-functions '(pmallappa/org-html-src-block))
(setq org-export-filter-link-functions '(pmallappa/org-html-link))
(setq org-export-filter-table-functions '(pmallappa/org-html-table))

;; Enhanced publishing project configuration
(setq org-publish-project-alist
      '(("pmallappa-website-content"
         ;; Content files (.org → .html)
         :base-directory "~/Documents/Personal/pmallappa.github.io/content/"
         :base-extension "org"
         :publishing-directory "~/Documents/Personal/pmallappa.github.io/_site/"
         :recursive t
         :publishing-function org-html-publish-to-html
         
         ;; HTML output settings
         :html-extension "html"
         :body-only nil
         :section-numbers nil
         :with-toc t
         :toc-levels 3
         :html-head "<link rel=\"stylesheet\" href=\"/static/css/main.css\" />
<script src=\"/static/js/main.js\" defer></script>
<meta name=\"viewport\" content=\"width=device-width, initial-scale=1.0\" />
<meta name="description" content="Personal website of Prem Mallappa - Technology and Farming insights" />
         
         :html-preamble
         "<header class=\"site-header\">
            <div class=\"container\">
              <div class=\"header-content\">
                <a href=\"/\" class=\"site-title\">Praveen Mallappa</a>
                <nav class=\"site-nav\">
                  <ul>
                    <li><a href=\"/\">Home</a></li>
                    <li><a href=\"/blog/\">Blog</a></li>
                    <li><a href=\"/projects/\">Projects</a></li>
                    <li><a href=\"/resume/\">Resume</a></li>
                    <li><button onclick=\"window.personalWebsite.showSearch()\" title=\"Search (Ctrl+K)\">🔍</button></li>
                    <li><button onclick=\"window.personalWebsite.showTOC()\" title=\"Table of Contents (T)\">📋</button></li>
                  </ul>
                </nav>
              </div>
            </div>
          </header>
          <main class=\"main-content\">"
         
         :html-postamble
         "</main>
          <footer class=\"article-footer\">
            <div class=\"container\">
              <nav class=\"footer-nav\">
                <a href=\"/\">Home</a> |
                <a href=\"/blog/\">Blog</a> |
                <a href=\"/projects/\">Projects</a> |
                <a href=\"/resume/\">Resume</a> |
                <a href=\"/sitemap.html\">Sitemap</a>
              </nav>
              <p>© 2024 Prem Mallappa. Built with Emacs Org-mode and love.</p>
              <p>Last updated: %d</p>
            </div>
          </footer>"
         
         ;; Content processing
         :auto-sitemap t
         :sitemap-filename "sitemap.org"
         :sitemap-title "Site Map"
         :sitemap-format-entry
         (lambda (entry style project)
           (let ((title (org-publish-find-title entry project))
                 (date (format-time-string "%Y-%m-%d"
                                           (org-publish-find-date entry project))))
             (format "- %s [[file:%s][%s]]" date entry title)))
         
         ;; Exclude drafts and templates
         :exclude "draft\\|template"
         :exclude-tags ("draft" "noexport"))
        
        ("pmallappa-website-static"
         ;; Static files (CSS, JS, images)
         :base-directory "~/Documents/Personal/pmallappa.github.io/static/"
         :base-extension "css\\|js\\|png\\|jpg\\|gif\\|pdf\\|svg\\|ico\\|woff\\|woff2\\|ttf"
         :publishing-directory "~/Documents/Personal/pmallappa.github.io/_site/static/"
         :recursive t
         :publishing-function org-publish-attachment)
        
        ("pmallappa-website-components"
         ;; Reusable components
         :base-directory "~/Documents/Personal/pmallappa.github.io/components/"
         :base-extension "org"
         :publishing-directory "~/Documents/Personal/pmallappa.github.io/_site/components/"
         :recursive t
         :publishing-function org-html-publish-to-html
         :body-only t)
        
        ("pmallappa-website"
         ;; Combined project
         :components ("pmallappa-website-content" 
                     "pmallappa-website-static"
                     "pmallappa-website-components"))))

;; Custom org link types
(org-link-set-parameters
 "blog"
 :export (lambda (path desc format)
           (cl-case format
             (html (format "<a href=\"/blog/%s\" class=\"internal-link\">%s</a>"
                          path (or desc path))))))

(org-link-set-parameters
 "project"
 :export (lambda (path desc format)
           (cl-case format
             (html (format "<a href=\"/projects/%s\" class=\"internal-link\">%s</a>"
                          path (or desc path))))))

(org-link-set-parameters
 "demo"
 :export (lambda (path desc format)
           (cl-case format
             (html (format "<a href=\"%s\" class=\"demo-link\" target=\"_blank\" rel=\"noopener\">%s 🚀</a>"
                          path (or desc path))))))

;; Publishing utility functions
(defun pmallappa/publish-website ()
  "Publish the entire website."
  (interactive)
  (org-publish-project "pmallappa-website" t))

(defun pmallappa/publish-content-only ()
  "Publish only content (not static files)."
  (interactive)
  (org-publish-project "pmallappa-website-content" t))

(defun pmallappa/new-blog-post (title)
  "Create a new blog post with proper structure."
  (interactive "sPost title: ")
  (let* ((date (format-time-string "%Y/%m/%d"))
         (slug (downcase (replace-regexp-in-string "[^a-zA-Z0-9]+" "-" title)))
         (dir (format "~/Documents/Personal/pmallappa.github.io/content/blog/%s/%s" date slug))
         (file (format "%s/index.org" dir)))
    (make-directory dir t)
    (find-file file)
    (insert (format "#+TITLE: %s
#+AUTHOR: Praveen Mallappa
#+DATE: %s
#+HTML_HEAD: <link rel=\"stylesheet\" href=\"/static/css/main.css\" />
#+OPTIONS: toc:t num:nil
#+TAGS: 

* Introduction

Write your introduction here...

* Main Content

Your main content sections...

* Conclusion

Key takeaways and next steps...

---

/Tags:/ 
/Category:/ 
/Updated:/ %s"
                    title
                    (format-time-string "%Y-%m-%d")
                    (format-time-string "%Y-%m-%d")))))

(defun pmallappa/new-project (name)
  "Create a new project documentation structure."
  (interactive "sProject name: ")
  (let* ((slug (downcase (replace-regexp-in-string "[^a-zA-Z0-9]+" "-" name)))
         (base-dir (format "~/Documents/Personal/pmallappa.github.io/content/projects/%s" slug)))
    (make-directory (format "%s/features" base-dir) t)
    (make-directory (format "%s/bugs" base-dir) t)
    (make-directory (format "%s/pull-requests" base-dir) t)
    (make-directory (format "%s/images" base-dir) t)
    
    ;; Create main project file
    (find-file (format "%s/index.org" base-dir))
    (insert (format "#+TITLE: %s - Project Documentation
#+AUTHOR: Praveen Mallappa
#+DATE: %s
#+HTML_HEAD: <link rel=\"stylesheet\" href=\"/static/css/main.css\" />
#+OPTIONS: toc:t num:nil
#+TAGS: project

#+BEGIN_project-status
:status: Active Development
:version: 0.1.0
:license: MIT
#+END_project-status

* Project Overview

** Description
Brief description of what the project does...

** Key Features
- Feature 1
- Feature 2
- Feature 3

* Getting Started

** Prerequisites
List requirements...

** Installation
Installation instructions...

* Development

See [[./features/][features]], [[./bugs/][bugs]], and [[./pull-requests/][pull requests]] for detailed development information.

* Links

- [[https://github.com/username/%s][GitHub Repository]]
- [[demo:%s][Live Demo]]"
                    name
                    (format-time-string "%Y-%m-%d")
                    slug
                    slug))))

;; Keybindings
(global-set-key (kbd "C-c p w") 'pmallappa/publish-website)
(global-set-key (kbd "C-c p c") 'pmallappa/publish-content-only)
(global-set-key (kbd "C-c p b") 'pmallappa/new-blog-post)
(global-set-key (kbd "C-c p p") 'pmallappa/new-project)

;; Auto-publish on save (optional - comment out if not desired)
;; (add-hook 'after-save-hook
;;           (lambda ()
;;             (when (string-match "pmallappa\\.github\\.io/content" (buffer-file-name))
;;               (pmallappa/publish-content-only))))

(provide 'pmallappa-website-config)