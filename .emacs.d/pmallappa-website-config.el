;; Personal Website Org-Publish Configuration
;; Add this to your Emacs configuration

(require 'ox-publish)

;; Custom HTML export settings
(setq org-html-doctype "html5"
      org-html-html5-fancy t
      org-html-validation-link nil
      org-html-head-include-scripts nil
      org-html-head-include-default-style nil)

;; Define the publishing project
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
<script src=\"/static/js/main.js\" defer></script>"
         :html-preamble nil
         :html-postamble "<footer class=\"article-footer\">
  <nav class=\"footer-nav\">
    <a href=\"/\">Home</a> |
    <a href=\"/blog/\">Blog</a> |
    <a href=\"/projects/\">Projects</a> |
    <a href=\"/resume/\">Resume</a>
  </nav>
  <p>Last updated: %d</p>
</footer>"
         
         ;; Content processing
         :auto-sitemap t
         :sitemap-filename "sitemap.org"
         :sitemap-title "Site Map"
         :sitemap-format-entry (lambda (entry style project)
                                 (format "[[file:%s][%s]] - %s"
                                         entry
                                         (org-publish-find-title entry project)
                                         (format-time-string "%Y-%m-%d"
                                                             (org-publish-find-date entry project)))))
        
        ("pmallappa-website-static"
         ;; Static files (CSS, JS, images)
         :base-directory "~/Documents/Personal/pmallappa.github.io/static/"
         :base-extension "css\\|js\\|png\\|jpg\\|gif\\|pdf\\|svg"
         :publishing-directory "~/Documents/Personal/pmallappa.github.io/_site/static/"
         :recursive t
         :publishing-function org-publish-attachment)
        
        ("pmallappa-website"
         ;; Combined project
         :components ("pmallappa-website-content" "pmallappa-website-static"))))

;; Custom link types for internal navigation
(org-link-set-parameters
 "blog"
 :export (lambda (path desc format)
           (case format
             (html (format "<a href=\"/blog/%s\" class=\"internal-link\">%s</a>"
                          path (or desc path))))))

(org-link-set-parameters
 "project"
 :export (lambda (path desc format)
           (case format
             (html (format "<a href=\"/projects/%s\" class=\"internal-link\">%s</a>"
                          path (or desc path))))))

;; Publishing functions
(defun pmallappa/publish-website ()
  "Publish the entire website."
  (interactive)
  (org-publish-project "pmallappa-website" t))

(defun pmallappa/publish-content-only ()
  "Publish only content (not static files)."
  (interactive)
  (org-publish-project "pmallappa-website-content" t))

;; Keybindings (optional)
(global-set-key (kbd "C-c p w") 'pmallappa/publish-website)
(global-set-key (kbd "C-c p c") 'pmallappa/publish-content-only)