// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  interface CacheStorage {
    // Cloudflare Workers edge cache; absent under vite dev and in browsers
    default?: Cache
  }

  namespace App {
    interface Platform {
      env: {
        GITHUB_TOKEN?: string
      }
      ctx?: {
        waitUntil(promise: Promise<unknown>): void
      }
    }
  }
}

export {}
