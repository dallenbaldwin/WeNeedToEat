const colors = require('tailwindcss/colors');

module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  colors: {
    lights: {
      primary: colors.cyan,
      secondary: colors.gray,
    },
    darks: {
      primary: colors.fuchsia,
      secondary: colors.gray,
    },
  },
  theme: {
    extend: {
      colors: {
        light: {
          primary: colors.cyan[500],
          secondary: colors.gray[500],
        },
        dark: {
          primary: colors.fuchsia[500],
          secondary: colors.gray[500],
        },
        black: colors.slate[900],
        white: '#FAF9F6',
      },
    },
  },
  plugins: [],
};
