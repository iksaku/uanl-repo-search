import adapter from '@sveltejs/adapter-vercel'
import preprocess from 'svelte-preprocess'
import path from 'path'

import DotEnv from './plugins/dotenv.js'
import { imagetools } from 'vite-imagetools'

/** @type {import('@sveltejs/kit').Config} */
const config = {
  // Consult https://github.com/sveltejs/svelte-preprocess
  // for more information about preprocessors
  preprocess: preprocess(),

  kit: {
    adapter: adapter({
      edge: true,
      split: true
    }),

    prerender: {
      default: true,
    },

    vite: () => {
      return {
        resolve: {
          alias: {
            $assets: path.resolve('./src/assets'),
            $components: path.resolve('./src/components'),
          },
        },

        plugins: [DotEnv(), imagetools()],
      }
    },
  },
}

export default config
