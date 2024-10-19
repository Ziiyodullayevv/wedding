/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        greatVibes: ['Great Vibes', 'cursive'],
        parisienne: ['Parisienne', 'cursive'],
        allura: ['Allura', 'cursive'],
        poppins: ['Poppins', 'sans-serif'],
        qwigley: ['Qwigley', 'cursive'],
      },
      colors: {
        'ar-gold': '#d3b15f',
      },
    },
  },
  plugins: [],
};
