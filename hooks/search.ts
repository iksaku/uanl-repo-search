import { computed, reactive, useFetch } from '@nuxtjs/composition-api'
import {
  octokit,
  per_page,
  rateLimit,
  Repository,
  RepositorySearchParameters,
} from '~/hooks/octokit'
import { repos } from '~/hooks/repos'

export const searchFilters = reactive({
  q: '',
  sort: undefined as RepositorySearchParameters['sort'],
  order: undefined as RepositorySearchParameters['order'],
})

export const searchPagination = reactive({
  total: 1,
  current: 1,
})

export const hasMorePages = computed(() => {
  return searchPagination.current < searchPagination.total
})

export function useSearch() {
  const { fetch: search, fetchState: searchState } = useFetch(async () => {
    if (searchPagination.current > searchPagination.total) return

    const response = await octokit.search.repos({
      q: `${searchFilters.q} topic:uanl`.trim(),
      sort: searchFilters.sort,
      order: searchFilters.order,
      page: searchPagination.current,
      per_page,
    })

    rateLimit.abused = rateLimit.limited = false

    searchPagination.total = Math.ceil(response.data.total_count / per_page)

    response.data.items.forEach((repo: Repository) => {
      repos.set(repo.id, repo)
    })
  })

  function loadMore() {
    if (searchState.pending) return
    if (!hasMorePages.value) return

    ++searchPagination.current

    search()
  }

  return {
    loadMore,
    search,
    searchState,
  }
}
