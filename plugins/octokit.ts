import { Octokit } from '@octokit/rest'
import { Plugin } from '@nuxt/types'

declare module '@nuxt/types' {
  interface Context {
    $octokit: Octokit
  }
}

declare module 'vuex/types/index' {
  interface Store<S> {
    $octokit: Octokit
  }
}

const octokitPlugin: Plugin = (_, inject) => {
  inject('octokit', new Octokit())
}

export default octokitPlugin
