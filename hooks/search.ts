import { computed, reactive, useFetch } from '@nuxtjs/composition-api'
import { octokit, per_page } from '~/hooks/octokit'
import { repos } from '~/hooks/repos'

export function useSearch() {
  const searchFilters = reactive({
    q: '',
    sortBy: 'stars' as 'stars' | 'forks' | 'updated' | 'help-wanted-issues',
    orderAscending: false,
  })

  const searchPagination = reactive({
    total: 1,
    current: 1,
  })

  const hasMorePages = computed(() => {
    return searchPagination.current < searchPagination.total
  })

  const { fetch: search, fetchState: searchState } = useFetch(async () => {
    if (searchPagination.current > searchPagination.total) return

    const response = await octokit.search.repos({
      q: 'topic:uanl',
      sort: searchFilters.sortBy,
      order: searchFilters.orderAscending ? 'asc' : 'desc',
      page: searchPagination.current,
      per_page,
    })

    searchPagination.total = Math.ceil(response.data.total_count / per_page)

    response.data.items.forEach((repo) => {
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
    hasMorePages,
    search,
    searchState,
    searchFilters,
  }
}
