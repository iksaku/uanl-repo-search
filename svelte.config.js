import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import path from 'path'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      edge: true,
    }),

    vite: {
      resolve: {
        alias: {
          $assets: path.resolve('./src/assets'),
          $components: path.resolve('./src/components'),
        },
      },
    },
  },
}

export default config
