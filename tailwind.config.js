/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './content/**/*.{html,js,md}',
    './layouts/**/*.{html,js}', 
    './themes/**/layouts/**/*.{html,js}',
    './assets/**/*.{html,js}',
    './hugo_stats.json'
  ],
  safelist: [
    // Alpine.js dynamic classes
    'x-show',
    'x-data',
    'x-transition',
    // Ensure critical hero classes are always included
    'hero-title',
    'hero-subtitle', 
    'hero-description',
    'hero-links',
    'hero-section'
  ],
  darkMode: 'media',
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#eff6ff',
          100: '#dbeafe', 
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#172554'
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0', 
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
          950: '#020617'
        },
        accent: {
          50: '#fffbeb',
          100: '#fef3c7',
          200: '#fde68a',
          300: '#fcd34d', 
          400: '#fbbf24',
          500: '#f59e0b',
          600: '#d97706',
          700: '#b45309',
          800: '#92400e',
          900: '#78350f',
          950: '#451a03'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '65ch',
            color: 'rgb(51 65 85)',
            lineHeight: '1.7',
            '[class~="lead"]': {
              color: 'rgb(100 116 139)',
            },
            a: {
              color: 'rgb(37 99 235)',
              textDecoration: 'none',
              fontWeight: '500',
              '&:hover': {
                color: 'rgb(29 78 216)',
                textDecoration: 'underline',
              },
            },
            strong: {
              color: 'rgb(15 23 42)',
              fontWeight: '600',
            },
            'ol[type="A"]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a"]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="A" s]': {
              '--list-counter-style': 'upper-alpha',
            },
            'ol[type="a" s]': {
              '--list-counter-style': 'lower-alpha',
            },
            'ol[type="I"]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i"]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="I" s]': {
              '--list-counter-style': 'upper-roman',
            },
            'ol[type="i" s]': {
              '--list-counter-style': 'lower-roman',
            },
            'ol[type="1"]': {
              '--list-counter-style': 'decimal',
            },
            'ol > li': {
              position: 'relative',
              paddingLeft: '1.75em',
            },
            'ol > li::before': {
              content: 'counter(list-item, var(--list-counter-style, decimal)) "."',
              position: 'absolute',
              fontWeight: '400',
              color: 'rgb(100 116 139)',
              left: '0',
            },
            'ul > li': {
              position: 'relative',
              paddingLeft: '1.75em',
            },
            'ul > li::before': {
              content: '""',
              position: 'absolute',
              backgroundColor: 'rgb(209 213 219)',
              borderRadius: '50%',
              width: '0.375em',
              height: '0.375em',
              top: 'calc(0.875em - 0.1875em)',
              left: '0.25em',
            },
            hr: {
              borderColor: 'rgb(226 232 240)',
              borderTopWidth: 1,
              marginTop: '3em',
              marginBottom: '3em',
            },
            blockquote: {
              fontWeight: '500',
              fontStyle: 'italic',
              color: 'rgb(15 23 42)',
              borderLeftWidth: '0.25rem',
              borderLeftColor: 'rgb(226 232 240)',
              quotes: '"\\201C""\\201D""\\2018""\\2019"',
              marginTop: '1.6em',
              marginBottom: '1.6em',
              paddingLeft: '1em',
            },
            h1: {
              color: 'rgb(15 23 42)',
              fontWeight: '800',
              fontSize: '2.25em',
              marginTop: '0',
              marginBottom: '0.8888889em',
              lineHeight: '1.1111111',
            },
            h2: {
              color: 'rgb(15 23 42)',
              fontWeight: '700',
              fontSize: '1.5em',
              marginTop: '2em',
              marginBottom: '1em',
              lineHeight: '1.3333333',
            },
            h3: {
              color: 'rgb(15 23 42)',
              fontWeight: '600',
              fontSize: '1.25em',
              marginTop: '1.6em',
              marginBottom: '0.6em',
              lineHeight: '1.6',
            },
            h4: {
              color: 'rgb(15 23 42)',
              fontWeight: '600',
              marginTop: '1.5em',
              marginBottom: '0.5em',
              lineHeight: '1.5',
            },
            'figure figcaption': {
              color: 'rgb(100 116 139)',
              fontSize: '0.875em',
              lineHeight: '1.4285714',
              marginTop: '0.8571429em',
            },
            code: {
              color: 'rgb(15 23 42)',
              fontWeight: '600',
              fontSize: '0.875em',
            },
            'code::before': {
              content: '"`"',
            },
            'code::after': {
              content: '"`"',
            },
            'a code': {
              color: 'rgb(37 99 235)',
            },
            'h1 code': {
              fontSize: '0.8888889em',
            },
            'h2 code': {
              fontSize: '0.875em',
            },
            'h3 code': {
              fontSize: '0.9em',
            },
            'h4 code': {
              fontSize: '0.9em',
            },
            pre: {
              color: 'rgb(226 232 240)',
              backgroundColor: 'rgb(30 41 59)',
              overflowX: 'auto',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
              marginTop: '1.7142857em',
              marginBottom: '1.7142857em',
              borderRadius: '0.375rem',
              paddingTop: '0.8571429em',
              paddingRight: '1.1428571em',
              paddingBottom: '0.8571429em',
              paddingLeft: '1.1428571em',
            },
            'pre code': {
              backgroundColor: 'transparent',
              borderWidth: '0',
              borderRadius: '0',
              padding: '0',
              fontWeight: '400',
              color: 'inherit',
              fontSize: 'inherit',
              fontFamily: 'inherit',
              lineHeight: 'inherit',
            },
            'pre code::before': {
              content: 'none',
            },
            'pre code::after': {
              content: 'none',
            },
            table: {
              width: '100%',
              tableLayout: 'auto',
              textAlign: 'left',
              marginTop: '2em',
              marginBottom: '2em',
              fontSize: '0.875em',
              lineHeight: '1.7142857',
            },
            thead: {
              color: 'rgb(15 23 42)',
              fontWeight: '600',
              borderBottomWidth: '1px',
              borderBottomColor: 'rgb(209 213 219)',
            },
            'thead th': {
              verticalAlign: 'bottom',
              paddingRight: '0.5714286em',
              paddingBottom: '0.5714286em',
              paddingLeft: '0.5714286em',
            },
            'tbody tr': {
              borderBottomWidth: '1px',
              borderBottomColor: 'rgb(226 232 240)',
            },
            'tbody tr:last-child': {
              borderBottomWidth: '0',
            },
            'tbody td': {
              verticalAlign: 'top',
              paddingTop: '0.5714286em',
              paddingRight: '0.5714286em',
              paddingBottom: '0.5714286em',
              paddingLeft: '0.5714286em',
            },
          },
        },
        dark: {
          css: {
            color: 'rgb(226 232 240)',
            '[class~="lead"]': {
              color: 'rgb(148 163 184)',
            },
            a: {
              color: 'rgb(96 165 250)',
              '&:hover': {
                color: 'rgb(147 197 253)',
              },
            },
            strong: {
              color: 'rgb(248 250 252)',
            },
            'ol > li::before': {
              color: 'rgb(148 163 184)',
            },
            'ul > li::before': {
              backgroundColor: 'rgb(55 65 81)',
            },
            hr: {
              borderColor: 'rgb(55 65 81)',
            },
            blockquote: {
              color: 'rgb(248 250 252)',
              borderLeftColor: 'rgb(55 65 81)',
            },
            h1: {
              color: 'rgb(248 250 252)',
            },
            h2: {
              color: 'rgb(248 250 252)',
            },
            h3: {
              color: 'rgb(248 250 252)',
            },
            h4: {
              color: 'rgb(248 250 252)',
            },
            'figure figcaption': {
              color: 'rgb(148 163 184)',
            },
            code: {
              color: 'rgb(248 250 252)',
            },
            'a code': {
              color: 'rgb(96 165 250)',
            },
            pre: {
              color: 'rgb(226 232 240)',
              backgroundColor: 'rgb(15 23 42)',
            },
            thead: {
              color: 'rgb(248 250 252)',
              borderBottomColor: 'rgb(75 85 99)',
            },
            'tbody tr': {
              borderBottomColor: 'rgb(55 65 81)',
            },
          },
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
}