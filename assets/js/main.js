// Alpine.js components for Hugo + Tailwind site
// Alpine.js loaded via CDN, this file contains only our custom components

document.addEventListener('alpine:init', () => {
  // Navbar component
  Alpine.data('navbar', () => ({
    hidden: false,
    lastScrollY: 0,
    
    init() {
      window.addEventListener('scroll', this.handleScroll.bind(this), { passive: true })
    },
    
    handleScroll() {
      const currentScrollY = window.scrollY
      
      if (currentScrollY < 100) {
        this.hidden = false
      } else if (currentScrollY > this.lastScrollY && currentScrollY > 100) {
        // Scrolling down
        this.hidden = true
      } else if (currentScrollY < this.lastScrollY) {
        // Scrolling up
        this.hidden = false
      }
      
      this.lastScrollY = currentScrollY
    }
  }))

  // Search component
  Alpine.data('search', () => ({
    open: false,
    query: '',
    results: [],
    searchIndex: null,
    
    async init() {
      // Load search index
      try {
        const response = await fetch('/index.json')
        this.searchIndex = await response.json()
      } catch (error) {
        console.warn('Failed to load search index:', error)
      }
      
      // Keyboard shortcuts
      document.addEventListener('keydown', (e) => {
        if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
          e.preventDefault()
          this.toggleSearch()
        }
        if (e.key === 'Escape' && this.open) {
          this.closeSearch()
        }
      })
    },
    
    toggleSearch() {
      this.open = !this.open
      if (this.open) {
        this.$nextTick(() => this.$refs.searchInput?.focus())
      }
    },
    
    closeSearch() {
      this.open = false
      this.query = ''
      this.results = []
    },
    
    performSearch() {
      if (!this.searchIndex || !this.query.trim()) {
        this.results = []
        return
      }
      
      const query = this.query.toLowerCase()
      this.results = this.searchIndex.filter(item => 
        item.title.toLowerCase().includes(query) ||
        item.content.toLowerCase().includes(query) ||
        (item.tags && item.tags.some(tag => tag.toLowerCase().includes(query)))
      ).slice(0, 10)
    },
    
    highlightMatch(text, query) {
      if (!query.trim()) return text
      const regex = new RegExp(`(${query})`, 'gi')
      return text.replace(regex, '<mark class="bg-accent-200 dark:bg-accent-800">$1</mark>')
    }
  }))

  // TOC component
  Alpine.data('toc', () => ({
    open: false,
    headings: [],
    activeId: '',
    
    init() {
      this.generateTOC()
      this.setupScrollSpy()
      
      // Keyboard shortcut
      document.addEventListener('keydown', (e) => {
        if (e.key === 't' && !e.target.matches('input, textarea')) {
          e.preventDefault()
          this.toggleTOC()
        }
      })
    },
    
    generateTOC() {
      const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6')
      this.headings = Array.from(headings).map((heading, index) => {
        if (!heading.id) {
          heading.id = `heading-${index}`
        }
        
        return {
          id: heading.id,
          text: heading.textContent,
          level: parseInt(heading.tagName.charAt(1))
        }
      })
    },
    
    setupScrollSpy() {
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            this.activeId = entry.target.id
          }
        })
      }, {
        rootMargin: '-20% 0% -35% 0%'
      })
      
      this.headings.forEach(heading => {
        const element = document.getElementById(heading.id)
        if (element) observer.observe(element)
      })
    },
    
    toggleTOC() {
      this.open = !this.open
    },
    
    scrollToHeading(headingId) {
      const element = document.getElementById(headingId)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' })
        this.open = false
      }
    }
  }))

  // Code tabs component
  Alpine.data('codeTabs', () => ({
    activeTab: 0,
    
    init() {
      this.setActiveTab(0)
    },
    
    setActiveTab(index) {
      this.activeTab = index
    }
  }))

  // Code block component
  Alpine.data('codeBlock', () => ({
    async copyCode() {
      const code = this.$refs.code.textContent
      try {
        await navigator.clipboard.writeText(code)
        this.$refs.copyBtn.textContent = 'Copied!'
        setTimeout(() => {
          this.$refs.copyBtn.textContent = 'Copy'
        }, 2000)
      } catch (err) {
        console.error('Failed to copy code:', err)
      }
    }
  }))
})