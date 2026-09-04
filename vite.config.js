import path from 'node:path'
import { sveltekit } from '@sveltejs/kit/vite'
import { imagetools } from 'vite-imagetools'

/** @type {import('vite').UserConfig} */
export default {
  resolve: {
    alias: {
      $assets: path.resolve('./src/assets'),
      $components: path.resolve('./src/components'),
    },
  },

  plugins: [
    sveltekit(),
    imagetools({ include: /^[^?]+\.(avif|gif|heif|jpeg|jpg|png|svg|tiff|webp)(\?.*)?$/ }),
  ],
}
