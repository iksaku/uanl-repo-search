import { Octokit } from '@octokit/rest'
import { defineNuxtPlugin } from "@nuxtjs/composition-api";

declare module '@nuxt/types' {
  interface Context {
    $octokit: Octokit
  }
}

export default defineNuxtPlugin((_, inject) => {
  inject('octokit', new Octokit())
})
