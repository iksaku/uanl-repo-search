import { reactive } from '@nuxtjs/composition-api'
import { octokit, per_page, Repository } from '~/hooks/octokit'

import { filters } from '~/hooks/filters'

type RepoStore = {
  pagination: {
    total: number
    current: number
  }
  list: Map<Repository['id'], Repository>
}

export const repos = reactive<RepoStore>({
  pagination: {
    total: 1,
    current: 1,
  },
  list: new Map(),
})

export async function search(): Promise<void> {
  if (repos.pagination.current > repos.pagination.total) return

  const response = await octokit.search.repos({
    q: 'topic:uanl',
    sort: filters.sortBy,
    order: filters.orderAscending ? 'asc' : 'desc',
    page: repos.pagination.current,
    per_page,
  })

  repos.pagination.total = Math.ceil(response.data.total_count / per_page)

  response.data.items.forEach((repo) => {
    repos.list.set(repo.id, repo)
  })
}
