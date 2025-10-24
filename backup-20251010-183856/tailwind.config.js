/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'white': '#FFFFFF',
        'light-gray': '#D3D3D3',
        'peach': '#F5C6CB',
        'dark-teal': '#1A3C34',
        'dark-gray': '#4A4A4A',
        'tertiary': {
          50: '#f0fffe',
          100: '#d9fffc',
          200: '#c2fff9',
          300: '#abfff6',
          400: '#94fff3',
          500: '#93f2e0',
          600: '#7dd9c7',
          700: '#67c0ae',
          800: '#51a795',
          900: '#3b8e7c',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};