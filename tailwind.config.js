/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        gold: {
          300: '#E8D28A',
          400: '#D4B862',
          500: '#C9A84C',
          600: '#A88B35',
          700: '#8B7020',
        },
        cream: {
          50:  '#FDFCF8',
          100: '#F5F0E8',
          200: '#EDE5D4',
          300: '#E0D5BE',
        },
        dark: {
          900: '#0D0600',
          800: '#130B02',
          700: '#1A0A00',
          600: '#241204',
          500: '#2E1A08',
        },
      },
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans:  ['Inter', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        widest2: '0.3em',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'scroll-left': 'scroll-left 30s linear infinite',
      },
    },
  },
  plugins: [],
}
