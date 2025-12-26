;; Local Hugobricks + ox-hugo Configuration for pmallappa.github.io
;; This file contains project-specific Emacs configuration
;; Load this file when working on the blog: M-x load-file RET emacs-config.el RET

;; Required packages for Doom Emacs:
;; Add these to your ~/.doom.d/packages.el:
;; (package! ox-hugo)

;; Package bootstrap (ensure ox-hugo is available in batch/CI runs)
(require 'package)
(setq package-archives
      '(("gnu"   . "https://elpa.gnu.org/packages/")
        ("melpa" . "https://melpa.org/packages/")))
(package-initialize)
(unless (package-installed-p 'ox-hugo)
  (package-refresh-contents)
  (package-install 'ox-hugo))

;; Ensure ox-hugo and org are loaded
(require 'ox-hugo)
(require 'org)

;; Project-specific variables (local to this session)
(defvar pmallappa/blog-base-dir (expand-file-name "~/Documents/Personal/pmallappa.github.io/")
  "Base directory for the pmallappa.github.io blog project.")

(defvar pmallappa/blog-content-org-dir 
  (expand-file-name "content-org/" pmallappa/blog-base-dir)
  "Directory for org content files.")

(defvar pmallappa/temp-hugo-section nil
  "Temporary variable to store the computed HUGO_SECTION value for capture templates.")

(defvar pmallappa/blog-content-dir
  (expand-file-name "content/" pmallappa/blog-base-dir)
  "Directory for Hugo content markdown files.")

;; Helper function to create organized directory structure
(defun pmallappa/create-blog-directory (type title-slug &optional series-name article-slug date)
  "Create organized directory structure for blog posts based on TYPE.
TYPE can be 'article', 'project', 'series', or 'series-article'.
For articles, uses DATE (YYYY-MM-DD format) to create year/month/day structure.
For series, SERIES-NAME is used with year from DATE.
For series-article, uses DATE for year/month/day and series metadata."
  (let* ((base-dir pmallappa/blog-content-org-dir)
         (date-parts (when date (split-string date "-")))
         (year (when date-parts (nth 0 date-parts)))
         (month (when date-parts (nth 1 date-parts)))
         (day (when date-parts (nth 2 date-parts)))
         (blog-dir (pcase type
                     ('article 
                      (if date-parts
                          (expand-file-name (format "articles/%s/%s/%s" year month day) base-dir)
                        (expand-file-name (format "articles/%s" title-slug) base-dir)))
                     ('project
                      (expand-file-name (format "projects/%s" title-slug) base-dir))
                     ('series
                      (if year
                          (expand-file-name (format "series/%s/%s" year (or series-name title-slug)) base-dir)
                        (expand-file-name (format "series/%s" (or series-name title-slug)) base-dir)))
                     ('series-article
                      (if date-parts
                          (expand-file-name (format "articles/%s/%s/%s" year month day) base-dir)
                        (expand-file-name (format "articles/%s" article-slug) base-dir)))
                     (_ (error "Unknown post type: %s" type))))
         (images-dir (expand-file-name "images" blog-dir)))
    (make-directory blog-dir t)
    (make-directory images-dir t)
    (expand-file-name (format "%s.org" (if (eq type 'series-article) article-slug title-slug)) blog-dir)))

;; Helper function to get current date string
(defun pmallappa/get-date-string ()
  "Get current date in YYYY-MM-DD format."
  (format-time-string "%Y-%m-%d"))

;; Project-specific TODO keywords setup
(defun pmallappa/setup-blog-todo-keywords ()
  "Set up TODO keywords for blog posts in current buffer."
  (setq-local org-todo-keywords
              '((sequence "DRAFT(d)" "POST(p)" "|" "PUBLISH(b)"))))

;; Automated state change handling for hugobricks posts
(defun pmallappa/org-blog-state-change ()
  "Handle blog post state changes for ox-hugo export with hugobricks."
  (when (and (derived-mode-p 'org-mode)
             (string-match pmallappa/blog-content-org-dir (buffer-file-name)))
    (pcase (org-get-todo-state)
      ("PUBLISH" 
       (org-set-property "EXPORT_HUGO_DRAFT" "false")
       (org-hugo-export-wim-to-md t))
      ("POST" 
       (org-set-property "EXPORT_HUGO_DRAFT" "true")
       (org-hugo-export-wim-to-md t))
      ("DRAFT" 
       (org-set-property "EXPORT_HUGO_DRAFT" "true")))))

;; Project-specific capture templates
(defvar pmallappa/blog-capture-templates
  '(("a" "Blog Article" plain
     (file (lambda () 
             (let* ((title (read-string "Article title: "))
                    (slug (read-string "URL slug: " (downcase (replace-regexp-in-string "[^a-z0-9]+" "-" title))))
                    (date (format-time-string "%Y-%m-%d"))
                    (date-path (format-time-string "%Y/%m/%d")))
               (setq pmallappa/temp-hugo-section (format "articles/%s" date-path))
               (pmallappa/create-blog-directory 'article slug nil nil date))))
    (format "#+TITLE: %%^{Title}\n#+DATE: %%t\n#+HUGO_BASE_DIR: ../../../../../\n#+HUGO_SECTION: %s\n#+HUGO_TYPE: articles\n#+EXPORT_FILE_NAME: %%^{URL_SLUG}\n#+OPTIONS: todo:nil\n#+HUGO_DRAFT: true\n#+HUGO_CATEGORIES: %%^{Category}\n#+HUGO_TAGS: %%^{Tags}\n\n#+begin_description\n%%^{Description}\n#+end_description\n\n* TODO %%\\1\n\n%%?\n" (or pmallappa/temp-hugo-section "articles"))
     :empty-lines 1
     :prepend t
     :jump-to-captured t)
    
    ("p" "Blog Project" plain
     (file (lambda () 
             (let* ((title (read-string "Project title: "))
                    (slug (read-string "URL slug: " (downcase (replace-regexp-in-string "[^a-z0-9]+" "-" title)))))
               (pmallappa/create-blog-directory 'project slug))))
    "#+TITLE: %^{Title}\n#+DATE: %t\n#+HUGO_BASE_DIR: ../../../\n#+HUGO_SECTION: projects\n#+EXPORT_FILE_NAME: %^{URL_SLUG}\n#+OPTIONS: todo:nil\n#+HUGO_DRAFT: true\n#+HUGO_CATEGORIES: %^{Category}\n#+HUGO_TAGS: %^{Tags}\n#+HUGO_CUSTOM_FRONT_MATTER: :project_type %^{Type|personal|professional|open-source} :status %^{Status|ongoing|completed|archived} :tech_stack %^{Tech Stack} :github %^{GitHub URL}\n\n#+begin_description\n%^{Description}\n#+end_description\n\n* TODO %\\1\n\n** Project Overview\n- *Status*: %\\5\n- *Tech Stack*: %\\6\n- *Repository*: [[%\\7][GitHub Link]]\n\n%?\n"
     :empty-lines 1
     :prepend t
     :jump-to-captured t)
     
    ("s" "Blog Series" plain
     (file (lambda () 
             (let* ((year (read-string "Year: " (format-time-string "%Y")))
                    (series-name (read-string "Series name (slug): "))
                    (title (read-string "Series title: "))
                    (date (format "%s-01-01" year)))
               (setq pmallappa/temp-hugo-section (format "series/%s" series-name))
               (pmallappa/create-blog-directory 'series series-name series-name nil date))))
    (format "#+TITLE: %%^{Title}\n#+DATE: %%t\n#+HUGO_BASE_DIR: ../../../../\n#+HUGO_SECTION: %s\n#+HUGO_TYPE: series\n#+EXPORT_FILE_NAME: %%^{URL_SLUG}\n#+OPTIONS: todo:nil\n#+HUGO_DRAFT: true\n#+HUGO_CATEGORIES: %%^{Category}\n#+HUGO_TAGS: %%^{Tags}\n#+HUGO_CUSTOM_FRONT_MATTER: :series_count %%^{Article Count|0}\n\n#+begin_description\n%%^{Description}\n#+end_description\n\n* TODO %%\\1\n\n%%?\n" (or pmallappa/temp-hugo-section "series"))
     :empty-lines 1
     :prepend t
     :jump-to-captured t)
     
    ("S" "Series Article" plain
     (file (lambda () 
             (let* ((series-name (read-string "Series name: "))
                    (article-date (read-string "Article date (YYYY-MM-DD): " (format-time-string "%Y-%m-%d")))
                    (article-title (read-string "Article title: "))
                    (article-slug (read-string "Article slug: " (downcase (replace-regexp-in-string "[^a-z0-9]+" "-" article-title))))
                    (date-parts (split-string article-date "-"))
                    (date-path (format "%s/%s/%s" (nth 0 date-parts) (nth 1 date-parts) (nth 2 date-parts))))
               (setq pmallappa/temp-hugo-section (format "articles/%s" date-path))
               (pmallappa/create-blog-directory 'series-article article-slug series-name article-slug article-date))))
    (format "#+TITLE: %%^{Title}\n#+DATE: %%t\n#+HUGO_BASE_DIR: ../../../../../\n#+HUGO_SECTION: %s\n#+HUGO_TYPE: articles\n#+EXPORT_FILE_NAME: %%^{URL_SLUG}\n#+OPTIONS: todo:nil\n#+HUGO_DRAFT: true\n#+HUGO_CATEGORIES: %%^{Category}\n#+HUGO_TAGS: %%^{Tags} %%^{Series Slug}\n#+HUGO_CUSTOM_FRONT_MATTER: :series %%^{Series Name}\n\n#+begin_description\n%%^{Description}\n#+end_description\n\n* TODO %%\\1\n\n*Part of the %%\\8 series*\n\n%%?\n" (or pmallappa/temp-hugo-section "articles"))
     :empty-lines 1
     :prepend t
     :jump-to-captured t))
  "Blog-specific capture templates based on Armin Darvish's workflow.")

;; Custom agenda view for blog posts
(defvar pmallappa/blog-agenda-commands
  '(("b" "Blog Posts"
     ((agenda)
      (todo "DRAFT\\|POST\\|PUBLISH"
            ((org-agenda-overriding-header "Blog Posts: "))))))
  "Custom agenda command for viewing all blog posts.")

;; Function to set up blog environment
(defun pmallappa/setup-blog-environment ()
  "Set up the blog environment with local capture templates and hooks."
  (interactive)
  (message "Setting up pmallappa.github.io blog environment...")
  
  ;; Add blog capture templates to existing ones (temporarily)
  (setq org-capture-templates 
        (append org-capture-templates pmallappa/blog-capture-templates))
  
  ;; Add blog agenda commands
  (setq org-agenda-custom-commands
        (append org-agenda-custom-commands pmallappa/blog-agenda-commands))
  
  ;; Add the state change hook
  (add-hook 'org-after-todo-state-change-hook #'pmallappa/org-blog-state-change)
  
  ;; Set logging options (as per Armin Darvish's workflow)
  (setq org-log-done 'time
        org-log-into-drawer t)
  
  ;; Don't export TODO keywords to markdown
  (setq-default org-export-with-todo-keywords nil)
  
  ;; Set up TODO keywords for blog files
  (add-hook 'org-mode-hook 
            (lambda ()
              (when (and (buffer-file-name)
                         (string-match pmallappa/blog-content-org-dir (buffer-file-name)))
                (pmallappa/setup-blog-todo-keywords))))
  
  (message "Blog environment ready! Use M-x pmallappa/new-blog-post or org-capture with a/p/s keys."))

;; Function to find and update agenda files dynamically
(defun pmallappa/update-blog-agenda-files ()
  "Update org-agenda-files with all blog post org files."
  (interactive)
  (let ((blog-files (directory-files-recursively pmallappa/blog-content-org-dir "\\.org$")))
    (setq org-agenda-files (append org-agenda-files blog-files))
    (message "Added %d blog files to agenda" (length blog-files))))

;; Hugo server management functions
(defun pmallappa/hugo-server-start ()
  "Start Hugo development server with drafts and navigate to changed files."
  (interactive)
  (let ((default-directory pmallappa/blog-base-dir)
        (buffer (get-buffer-create "*blog-hugo-server*")))
    (if (get-buffer-process buffer)
        (message "Hugo server already running!")
      (start-process "hugo-server" buffer "hugo" "server" "--buildDrafts" "--navigateToChanged")
      (message "Hugo server started! Check *blog-hugo-server* buffer."))))

(defun pmallappa/hugo-server-stop ()
  "Stop Hugo development server."
  (interactive)
  (when-let ((proc (get-buffer-process (get-buffer "*blog-hugo-server*"))))
    (delete-process proc)
    (message "Hugo server stopped.")))

;; Export functions
(defun pmallappa/export-all-blog-posts ()
  "Export all blog posts from all org files to Hugo markdown."
  (interactive)
  (let ((files (directory-files-recursively pmallappa/blog-content-org-dir "\\.org$"))
        (exported-count 0))
    (dolist (file files)
      (with-current-buffer (find-file-noselect file)
        (condition-case err
            (progn
              (org-hugo-export-wim-to-md t)
              (setq exported-count (1+ exported-count)))
          (error (message "Error exporting %s: %s" file (error-message-string err))))))
    (message "Exported %d blog posts" exported-count)))

;; Function to create a new blog post manually
(defun pmallappa/new-blog-post (title type)
  "Create a new blog post with specified TITLE and TYPE (article, project, series)."
  (interactive 
   (list (read-string "Post title: ")
         (completing-read "Post type: " '("article" "project" "series"))))
    (let* ((slug (downcase (replace-regexp-in-string "[^a-z0-9]+" "-" title)))
      (date (format-time-string "%Y-%m-%d"))
      (date-parts (split-string date "-"))
      (year (nth 0 date-parts))
      (month (nth 1 date-parts))
      (day (nth 2 date-parts))
      (series-name (when (string= type "series") slug))
      (file-path (pmallappa/create-blog-directory (intern type) slug series-name nil date))
      (hugo-section (pcase type
            ("article" (format "blog/%s/%s/%s" year month day))
            ("project" (format "projects/%s" slug))
            ("series" (format "series/%s/%s" year slug))
            (_ "blog")))
      (hugo-base-dir (pcase type
             ("article" "../../../../../")
             ("project" "../../../")
             ("series" "../../../../")
             (_ "../../")))
         (description (read-string "Description: "))
         (category (read-string "Category: "))
         (tags (read-string "Tags (comma-separated): ")))
    (find-file file-path)
    (insert (format "#+TITLE: %s\n#+DATE: %s\n#+HUGO_BASE_DIR: %s\n#+HUGO_SECTION: %s\n#+EXPORT_FILE_NAME: %s\n#+OPTIONS: todo:nil\n#+HUGO_DRAFT: true\n#+HUGO_CATEGORIES: %s\n#+HUGO_TAGS: %s\n\n#+begin_description\n%s\n#+end_description\n\n* TODO %s\n\n%s\n"
                    title 
                    (format-time-string "%Y-%m-%d") 
                    hugo-base-dir 
                    hugo-section
                    slug 
                    category
                    tags
                    description 
                    title
                    (if (string= type "project") "** Project Overview\n- *Status*: \n- *Tech Stack*: \n- *Repository*: \n\n" "")))
    (pmallappa/setup-blog-todo-keywords)
    (goto-char (point-max))))

;; Blog-specific agenda command
(defun pmallappa/blog-agenda ()
  "Show agenda view for blog posts only."
  (interactive)
  (let ((org-agenda-files (directory-files-recursively pmallappa/blog-content-org-dir "\\.org$")))
    (org-todo-list "DRAFT\\|POST\\|PUBLISH")))

;; Focus on writing mode (inspired by Armin Darvish)
(defun pmallappa/blog-focus-writing ()
  "Enable focus mode for distraction-free writing."
  (interactive)
  (when (fboundp 'toggle-frame-fullscreen)
    (toggle-frame-fullscreen))
  (delete-other-windows nil)
  (when (fboundp 'org-fold-hide-drawer-all)
    (org-fold-hide-drawer-all))
  (when (fboundp 'flyspell-mode)
    (flyspell-mode 1))
  (message "Focus writing mode enabled. Properties hidden, spell-check on."))

;; TODO keyword faces for better visual distinction
(defun pmallappa/setup-todo-faces ()
  "Set up custom faces for blog TODO keywords."
  (add-to-list 'org-todo-keyword-faces
               '("DRAFT" . (:foreground "pink" :weight bold)))
  (add-to-list 'org-todo-keyword-faces
               '("POST" . (:foreground "orange" :weight bold)))
  (add-to-list 'org-todo-keyword-faces
               '("PUBLISH" . (:foreground "green" :weight bold))))

;; Call this when setting up the environment
(pmallappa/setup-todo-faces)

;; Local keymap for blog functions
(defvar pmallappa/blog-keymap (make-sparse-keymap)
  "Keymap for blog functions.")

;; Define key bindings in the blog keymap
(define-key pmallappa/blog-keymap (kbd "s") #'pmallappa/hugo-server-start)
(define-key pmallappa/blog-keymap (kbd "q") #'pmallappa/hugo-server-stop)
(define-key pmallappa/blog-keymap (kbd "e") #'pmallappa/export-all-blog-posts)
(define-key pmallappa/blog-keymap (kbd "n") #'pmallappa/new-blog-post)
(define-key pmallappa/blog-keymap (kbd "u") #'pmallappa/update-blog-agenda-files)
(define-key pmallappa/blog-keymap (kbd "a") #'pmallappa/blog-agenda)
(define-key pmallappa/blog-keymap (kbd "f") #'pmallappa/blog-focus-writing)
(define-key pmallappa/blog-keymap (kbd "S") #'pmallappa/setup-blog-environment)

;; Set up a prefix key for blog commands (only when this config is loaded)
(global-set-key (kbd "C-c h") pmallappa/blog-keymap)

;; Auto-setup when opening blog files
(add-hook 'find-file-hook
          (lambda ()
            (when (and (buffer-file-name)
                       (string-match pmallappa/blog-content-org-dir (buffer-file-name)))
              (pmallappa/setup-blog-todo-keywords))))

;; Welcome message
(message "Pmallappa blog configuration loaded!")
(message "Commands available under C-c h:")
(message "  C-c h S - Setup blog environment (run this first)")
(message "  C-c h n - New blog post")  
(message "  C-c h s - Start Hugo server")
(message "  C-c h q - Stop Hugo server")
(message "  C-c h e - Export all posts")
(message "  C-c h a - Blog agenda view")
(message "  C-c h f - Focus writing mode")
(message "  C-c h u - Update agenda files")
(message "Usage: M-x pmallappa/new-blog-post or org-capture with a/p/s keys for article/project/series")
(message "Based on Armin Darvish's efficient blogging workflow: https://www.armindarvish.com/")