const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.cyan[400],
          dark: colors.cyan[800],
        },
        secondary: {
          light: colors.gray[400],
          dark: colors.gray[800],
        },
        black: colors.slate[900],
        white: colors.gray[100],
      },
    },
  },
  plugins: [],
};
