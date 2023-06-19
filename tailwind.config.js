/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}',
            './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      keyframes: {
        marquee: {
          '0%': {left: '100vw'},
          '100%': {left: '-600px'}
        }
      }
    },
  },
  plugins: [require('tailwind-scrollbar')],
}

