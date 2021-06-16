const colors = require('tailwindcss/colors')
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode: 'jit',

  purge: [
    './src/**/*.{astro,vue}'
  ],

  darkMode: false,

  theme: {
    extend: {
      colors: {
        blueGray: colors.blueGray,
      },
      fontFamily: {
        sans: ['DM Sans', ...defaultTheme.fontFamily.sans],
      },
    },
  },

  variants: {
    extend: {},
  },

  plugins: [
    require('@tailwindcss/line-clamp'),
    require('@tailwindcss/forms'),
  ],
}
