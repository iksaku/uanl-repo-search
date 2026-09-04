// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  interface CacheStorage {
    // Cloudflare Workers edge cache; absent under vite dev and in browsers
    default?: Cache
  }
  // Minimal structural typing for the Cloudflare Workers KV binding
  interface KVNamespace {
    get(key: string): Promise<string | null>
    put(key: string, value: string, options?: { expirationTtl?: number }): Promise<void>
  }

  namespace App {
    interface Platform {
      env: {
        GITHUB_TOKEN?: string
        STATS_KV?: KVNamespace
      }
      ctx?: {
        waitUntil(promise: Promise<unknown>): void
      }
    }
  }
}

export {}
