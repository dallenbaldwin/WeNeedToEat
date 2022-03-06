const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          light: colors.cyan[300],
          dark: colors.cyan[800],
        },
        secondary: {
          light: colors.gray[300],
          dark: colors.gray[700],
        },
        black: colors.slate[900],
        white: colors.gray[100],
        danger: {
          light: colors.red[600],
          dark: colors.red[800],
        },
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
