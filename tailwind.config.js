const theme = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

module.exports = {
  purge: [],
  darkMode: false, // or 'media' or 'class'
  theme: {
    colors: {
      white: colors.white,
      blueGray: colors.blueGray,
      gray: colors.coolGray,
      amber: colors.amber,
      blue: colors.blue,
    },
    extend: {
      fontFamily: {
        sans: ['DM Sans', ...theme.fontFamily.sans],
      },
    },
  },
  variants: {
    extend: {
      boxShadow: ['hocus'],
    },
  },
  plugins: [
    require('@iksaku/tailwindcss-plugins/src/hocus'),
    require('@iksaku/tailwindcss-plugins/src/smoothScroll'),
  ],
}
