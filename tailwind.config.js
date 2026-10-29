/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#ecfdf4',
          100: '#d1fae4',
          200: '#a7f3cf',
          300: '#6ee7b7',
          400: '#34d399',
          500: '#10b981',
          600: '#059669',
          700: '#047857',
          800: '#065f46',
          900: '#064e3b',
          950: '#022c22',
          neon: '#00ff88',
        },
        dark: {
          bg: '#070a08',
          card: '#0e1612',
          cardHover: '#14201a',
          surface: '#18261f',
          border: '#1f3328',
          borderMuted: '#15241c',
          text: '#e6f3ec',
          muted: '#8ba697'
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['Fira Code', 'JetBrains Mono', 'Consolas', 'monospace']
      },
      boxShadow: {
        'neon': '0 0 15px -3px rgba(0, 255, 136, 0.3), 0 0 6px -2px rgba(16, 185, 129, 0.4)',
        'neon-sm': '0 0 8px -2px rgba(0, 255, 136, 0.4)',
        'neon-lg': '0 0 25px -4px rgba(0, 255, 136, 0.35)',
      }
    },
  },
  plugins: [],
}
