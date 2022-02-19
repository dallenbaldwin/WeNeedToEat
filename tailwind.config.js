const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    colors: {
      primary: colors.cyan,
      secondary: colors.fuchsia,
      neutral: colors.gray,
      danger: colors.red,
      warning: colors.yellow,
      success: colors.green,
    },
    extend: {},
  },
  plugins: [],
};
