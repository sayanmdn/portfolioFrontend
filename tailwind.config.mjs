/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          900: '#020c1b',
          800: '#0a192f',
          700: '#112240',
          600: '#233554',
        },
        slate: {
          light: '#a8b2d1',
          lightest: '#ccd6f6',
          white: '#e6f1ff',
        },
        teal: {
          300: '#64ffda',
          400: '#14b8a6',
        },
      },
      fontFamily: {
        sans: ['Inter', 'San Francisco', 'SF Pro Text', '-apple-system', 'system-ui', 'sans-serif'],
        mono: ['Fira Code', 'Fira Mono', 'SF Mono', 'Roboto Mono', 'monospace'],
      },
      animation: {
        'fade-up': 'fadeUp 1s ease-in-out forwards',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: 0, transform: 'translateY(20px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
