// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
  namespace App {
    interface Platform {
      env: {
        GITHUB_TOKEN?: string
      }
    }
  }
}

export {}
