/**
 * Personal Website - Main JavaScript
 * Component-oriented interactions and animations
 */

class PersonalWebsite {
  constructor() {
    this.init();
  }

  init() {
    this.setupNavbar();
    this.setupSearch();
    this.setupTOC();
    this.setupModals();
    this.setupCodeBlocks();
    this.setupKeyboardShortcuts();
    this.setupScrollProgress();
  }

  // Navbar Animation (fasterthanli.me inspired)
  setupNavbar() {
    const header = document.querySelector('.site-header');
    if (!header) return;

    let lastScrollY = window.scrollY;
    let ticking = false;

    const updateNavbar = () => {
      const currentScrollY = window.scrollY;
      
      if (currentScrollY < 100) {
        header.classList.remove('hidden');
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        header.classList.add('hidden');
      } else if (currentScrollY < lastScrollY) {
        // Scrolling up
        header.classList.remove('hidden');
      }
      
      lastScrollY = currentScrollY;
      ticking = false;
    };

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(updateNavbar);
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
  }

  // Search Popup with Fuzzy Matching
  setupSearch() {
    const searchOverlay = this.createSearchPopup();
    document.body.appendChild(searchOverlay);

    const searchInput = searchOverlay.querySelector('.search-input');
    const searchResults = searchOverlay.querySelector('.search-results');
    
    let searchIndex = [];
    this.buildSearchIndex().then(index => {
      searchIndex = index;
    });

    // Search functionality
    const performSearch = (query) => {
      if (!query.trim()) {
        searchResults.innerHTML = '<div class="search-result">Start typing to search...</div>';
        return;
      }

      const results = this.fuzzySearch(query, searchIndex);
      
      if (results.length === 0) {
        searchResults.innerHTML = '<div class="search-result">No results found</div>';
        return;
      }

      searchResults.innerHTML = results.slice(0, 10).map(result => `
        <a href="${result.url}" class="search-result">
          <div class="search-result-title">${this.highlightMatch(result.title, query)}</div>
          <div class="search-result-excerpt">${this.highlightMatch(result.excerpt, query)}</div>
        </a>
      `).join('');
    };

    searchInput.addEventListener('input', (e) => {
      performSearch(e.target.value);
    });

    // Close search on escape or outside click
    searchOverlay.addEventListener('click', (e) => {
      if (e.target === searchOverlay) {
        this.hideSearch();
      }
    });
  }

  createSearchPopup() {
    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay search-overlay';
    overlay.innerHTML = `
      <div class="search-popup">
        <input type="text" class="search-input" placeholder="Search articles, projects, and content..." />
        <div class="search-results">
          <div class="search-result">Start typing to search...</div>
        </div>
      </div>
    `;
    return overlay;
  }

  async buildSearchIndex() {
    // In a real implementation, this would fetch from a search index
    // For now, we'll simulate with some sample data
    return [
      {
        title: "Building Efficient Systems",
        excerpt: "Exploring low-level system optimization techniques and performance considerations.",
        url: "/blog/2024/01/15/building-efficient-systems/",
        category: "technology",
        tags: ["systems", "performance"]
      },
      {
        title: "Modern Farming Techniques",
        excerpt: "Sustainable agriculture practices using precision farming and IoT sensors.",
        url: "/blog/2024/01/10/modern-farming-techniques/",
        category: "farming",
        tags: ["sustainability", "iot"]
      }
      // More entries would be dynamically loaded
    ];
  }

  fuzzySearch(query, items) {
    const normalizedQuery = query.toLowerCase();
    return items.filter(item => {
      const titleMatch = item.title.toLowerCase().includes(normalizedQuery);
      const excerptMatch = item.excerpt.toLowerCase().includes(normalizedQuery);
      const tagMatch = item.tags?.some(tag => tag.toLowerCase().includes(normalizedQuery));
      return titleMatch || excerptMatch || tagMatch;
    }).sort((a, b) => {
      // Simple relevance scoring - title matches rank higher
      const aScore = a.title.toLowerCase().includes(normalizedQuery) ? 2 : 1;
      const bScore = b.title.toLowerCase().includes(normalizedQuery) ? 2 : 1;
      return bScore - aScore;
    });
  }

  highlightMatch(text, query) {
    if (!query.trim()) return text;
    const regex = new RegExp(`(${query})`, 'gi');
    return text.replace(regex, '<mark>$1</mark>');
  }

  showSearch() {
    const overlay = document.querySelector('.search-overlay');
    const input = overlay.querySelector('.search-input');
    overlay.classList.add('active');
    setTimeout(() => input.focus(), 100);
  }

  hideSearch() {
    const overlay = document.querySelector('.search-overlay');
    const input = overlay.querySelector('.search-input');
    overlay.classList.remove('active');
    input.value = '';
    input.blur();
  }

  // Table of Contents Sidebar
  setupTOC() {
    const tocSidebar = this.createTOCSidebar();
    if (tocSidebar) {
      document.body.appendChild(tocSidebar);
      this.populateTOC();
    }
  }

  createTOCSidebar() {
    // Only create TOC if we have headings
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    if (headings.length < 2) return null;

    const sidebar = document.createElement('div');
    sidebar.className = 'toc-sidebar';
    sidebar.innerHTML = `
      <div class="toc-content">
        <div class="modal-header">
          <h3 class="modal-title">Table of Contents</h3>
          <button class="modal-close toc-close" aria-label="Close table of contents">×</button>
        </div>
        <nav class="toc-nav">
          <ul class="toc-list"></ul>
        </nav>
      </div>
    `;

    // Close TOC functionality
    sidebar.querySelector('.toc-close').addEventListener('click', () => {
      this.hideTOC();
    });

    sidebar.addEventListener('click', (e) => {
      if (e.target === sidebar) {
        this.hideTOC();
      }
    });

    return sidebar;
  }

  populateTOC() {
    const tocList = document.querySelector('.toc-list');
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    
    if (!tocList || headings.length < 2) return;

    headings.forEach((heading, index) => {
      // Generate ID if not present
      if (!heading.id) {
        heading.id = `heading-${index}`;
      }

      const level = parseInt(heading.tagName.charAt(1));
      const listItem = document.createElement('li');
      listItem.className = `toc-item level-${level}`;
      
      const link = document.createElement('a');
      link.href = `#${heading.id}`;
      link.textContent = heading.textContent;
      link.addEventListener('click', (e) => {
        e.preventDefault();
        this.smoothScrollTo(heading);
        this.hideTOC();
      });

      listItem.appendChild(link);
      tocList.appendChild(listItem);
    });

    // Add scroll spy functionality
    this.setupScrollSpy();
  }

  setupScrollSpy() {
    const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
    const tocLinks = document.querySelectorAll('.toc-item a');

    const updateActiveTOC = () => {
      let current = '';
      headings.forEach(heading => {
        const rect = heading.getBoundingClientRect();
        if (rect.top <= 100) {
          current = heading.id;
        }
      });

      tocLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
          link.classList.add('active');
        }
      });
    };

    window.addEventListener('scroll', updateActiveTOC, { passive: true });
  }

  showTOC() {
    const sidebar = document.querySelector('.toc-sidebar');
    if (sidebar) {
      sidebar.classList.add('active');
    }
  }

  hideTOC() {
    const sidebar = document.querySelector('.toc-sidebar');
    if (sidebar) {
      sidebar.classList.remove('active');
    }
  }

  // Modal System
  setupModals() {
    // Handle modal triggers
    document.addEventListener('click', (e) => {
      if (e.target.matches('[data-modal]')) {
        e.preventDefault();
        const modalId = e.target.dataset.modal;
        this.showModal(modalId);
      }
      
      if (e.target.matches('.modal-close') || e.target.matches('.modal-overlay')) {
        this.hideAllModals();
      }
    });
  }

  showModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.classList.add('active');
    }
  }

  hideAllModals() {
    document.querySelectorAll('.modal-overlay.active').forEach(modal => {
      modal.classList.remove('active');
    });
  }

  // Code Block Enhancements
  setupCodeBlocks() {
    document.querySelectorAll('.code-block').forEach(block => {
      this.enhanceCodeBlock(block);
    });
  }

  enhanceCodeBlock(block) {
    const copyBtn = block.querySelector('.code-copy-btn');
    const code = block.querySelector('pre code');
    
    if (copyBtn && code) {
      copyBtn.addEventListener('click', async () => {
        try {
          await navigator.clipboard.writeText(code.textContent);
          const originalText = copyBtn.textContent;
          copyBtn.textContent = 'Copied!';
          setTimeout(() => {
            copyBtn.textContent = originalText;
          }, 2000);
        } catch (err) {
          console.error('Failed to copy code:', err);
        }
      });
    }
  }

  // Keyboard Shortcuts
  setupKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
      // Ctrl+K or Cmd+K for search
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.showSearch();
      }
      
      // Escape to close modals/overlays
      if (e.key === 'Escape') {
        this.hideSearch();
        this.hideTOC();
        this.hideAllModals();
      }
      
      // T for TOC
      if (e.key === 't' && !e.target.matches('input, textarea')) {
        e.preventDefault();
        this.showTOC();
      }
    });
  }

  // Scroll Progress Indicator
  setupScrollProgress() {
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 0%;
      height: 3px;
      background: var(--color-primary);
      z-index: 1001;
      transition: width 0.1s ease;
    `;
    document.body.appendChild(progressBar);

    const updateProgress = () => {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      progressBar.style.width = scrolled + '%';
    };

    window.addEventListener('scroll', updateProgress, { passive: true });
  }

  // Utility Methods
  smoothScrollTo(element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start'
    });
  }

  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  }
}

// Component: Code Tabs
class CodeTabs {
  constructor(element) {
    this.element = element;
    this.tabs = element.querySelectorAll('.code-tab');
    this.panels = element.querySelectorAll('.code-panel');
    this.init();
  }

  init() {
    this.tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => {
        this.showTab(index);
      });
    });
    
    // Show first tab by default
    this.showTab(0);
  }

  showTab(index) {
    this.tabs.forEach((tab, i) => {
      tab.classList.toggle('active', i === index);
    });
    
    this.panels.forEach((panel, i) => {
      panel.classList.toggle('active', i === index);
    });
  }
}

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  new PersonalWebsite();
  
  // Initialize code tabs
  document.querySelectorAll('.code-tabs').forEach(element => {
    new CodeTabs(element);
  });
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { PersonalWebsite, CodeTabs };
}