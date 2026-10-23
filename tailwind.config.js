/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        cream: {
          DEFAULT: '#f7f2ea',
          50: '#fdfbf7',
          100: '#f7f2ea',
          200: '#f1e8db',
          300: '#e6d8c7',
          400: '#d9c6b2',
        },
        taupe: {
          300: '#c9bdb2',
          400: '#b3a598',
          500: '#9b8a7b',
          600: '#877566',
          700: '#6d5c4e',
        },
        cocoa: {
          700: '#5a4b3f',
          800: '#463930',
          900: '#332a24',
        },
        gold: {
          300: '#e6d0a3',
          400: '#d8b97f',
          500: '#c5a15c',
          600: '#a9873f',
          700: '#866a2f',
        },
        blush: '#e9c7c0',
        sage: {
          100: '#e8ede2',
          500: '#7d8a70',
          600: '#67745b',
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', 'Georgia', 'serif'],
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 14px 34px -22px rgba(51, 42, 36, 0.45)',
        lift: '0 18px 40px -20px rgba(51, 42, 36, 0.35)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
};
