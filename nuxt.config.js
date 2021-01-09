export default {
  ssr: false,

  target: 'static',

  modern: 'client',

  head: {
    title: 'Repositorios UANL',
    meta: [
      { charset: 'utf-8' },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1',
      },
      {
        hid: 'description',
        name: 'description',
        content:
          'Descubre proyectos creados por alumnos y docentes de la Universidad Autónoma de Nuevo León',
      },
    ],
    link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    script: [
      {
        src: 'https://hey.jorgeglz.io/js/index.js',
        'data-domain': 'uanl-repos.jorgeglz.io',
        async: true,
        defer: true,
      },
    ],
  },

  css: [],

  plugins: ['~/plugins/octokit'],

  components: true,

  buildModules: [
    '@nuxt/typescript-build',
    '@nuxtjs/composition-api',
    '@nuxtjs/tailwindcss',
  ],

  modules: [],
}
