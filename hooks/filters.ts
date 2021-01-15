import { reactive } from '@nuxtjs/composition-api'

type SearchFilters = {
  q: string
  sortBy: 'stars' | 'forks' | 'updated' | 'help-wanted-issues'
  orderAscending: boolean
}

export const filters = reactive<SearchFilters>({
  q: '',
  sortBy: 'stars',
  orderAscending: false,
})
