import { reactive } from '@nuxtjs/composition-api'
import { Repository } from '~/hooks/octokit'

type RepoStore = {
  list: Map<Repository['id'], Repository>
}

export const repos = reactive<RepoStore>({
  list: new Map(),
})
