/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        brand: {
          primary: '#0C6BAF',
          secondary: '#71C8F3',
          navy: '#002C5F',
          blue: '#187CC1',
          dark: '#005A9C',
        },
        gray: {
          50: '#F8F9FA',
          100: '#F1F3F4',
          200: '#E8EAED',
          300: '#DADCE0',
          400: '#9AA0A6',
          500: '#5F6368',
          600: '#4A4A4A',
          700: '#2D2D2D',
          800: '#1F2937',
          900: '#1A1A1A',
        },
        text: {
          primary: 'var(--text-primary)',
          secondary: 'var(--text-secondary)',
          tertiary: 'var(--text-tertiary)',
          muted: 'var(--text-muted)',
        }
      },
      fontFamily: {
        inter: ['var(--font-inter)', 'sans-serif'],
        cormorant: ['var(--font-cormorant)', 'serif'],
        montserrat: ['var(--font-montserrat)', 'sans-serif'],
        'open-sans': ['var(--font-open-sans)', 'sans-serif'],
        headline: ['var(--font-montserrat)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
      spacing: {
        'section-sm': '3rem',
        'section-md': '4rem',
        'section-lg': '6rem',
        'section-xl': '8rem',
      },
      boxShadow: {
        'card-sm': '0 4px 12px rgba(0, 0, 0, 0.05)',
        'card-md': '0 8px 24px rgba(0, 0, 0, 0.12)',
        'card-lg': '0 16px 48px rgba(0, 0, 0, 0.15)',
        'interactive': '0 4px 20px rgba(12, 107, 175, 0.15)',
      },
      borderRadius: {
        'card': '16px',
        'button': '8px',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'skeleton': 'skeleton 1.5s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        skeleton: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.4' },
        },
      },
    },
  },
  plugins: [
    function({ addUtilities }) {
      addUtilities({
        '.sr-only': {
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: '0',
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: '0',
        },
      })
    }
  ],
};
