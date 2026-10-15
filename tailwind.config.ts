import type { Config } from 'tailwindcss';

/**
 * Design tokens for the neo-brutalist torn-paper collage style.
 * Mirrors the CSS variables declared in app/globals.css.
 */
const config: Config = {
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          red: '#E32A1A',
          blue: '#0047FF',
          black: '#111111',
          paper: '#E8E5E0',
          paperDark: '#DEDAD4',
        },
      },
      fontFamily: {
        display: ['var(--font-anton)', 'Impact', 'sans-serif'],
        sans: ['var(--font-montserrat)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        hand: ['var(--font-marker)', 'cursive'],
      },
      boxShadow: {
        brutal: '6px 6px 0px #000000',
        'brutal-lg': '10px 10px 0px #000000',
        'brutal-blue': '6px 6px 0px #0047FF',
        'brutal-white': '5px 5px 0px #FFFFFF',
      },
    },
  },
  plugins: [],
};

export default config;
