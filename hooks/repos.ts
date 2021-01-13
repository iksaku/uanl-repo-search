import { inject, reactive } from '@nuxtjs/composition-api'
import { octokit, per_page, Repository } from '~/hooks/octokit'

type RepoStore = {
  pagination: {
    total: number
    current: number
  }
  sortBy: 'stars' | 'forks' | 'updated' | 'help-wanted-issues'
  orderAscending: boolean
  list: Set<Repository>
}

const repos = reactive<RepoStore>({
  pagination: {
    total: 1,
    current: 1,
  },
  sortBy: 'stars',
  orderAscending: false,
  list: new Set(),
})

async function search() {
  if (repos.pagination.current > repos.pagination.total) return

  const response = await octokit.search.repos({
    q: 'topic:uanl',
    sort: repos.sortBy,
    order: repos.orderAscending ? 'asc' : 'desc',
    page: repos.pagination.current,
    per_page,
  })

  repos.pagination.total = Math.ceil(response.data.total_count / per_page)

  response.data.items.forEach((repo) => {
    repos.list.add(repo)
  })
}

export const useRepos = () =>
  inject('RepoStore', {
    repos,
    search,
  })
