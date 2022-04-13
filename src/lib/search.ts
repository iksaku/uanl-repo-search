import type { Readable } from 'svelte/store'
import { derived, get, writable } from 'svelte/store'
import { api } from './util'

type Repository = {
  id: number
  name: string
  full_name: string
  description: string
  owner: {
    login: string
    avatar_url: string
  }
  html_url: string
  stargazers_count: number
  language?: string
  license?: {
    spdx_id: string
  }
}

type ApiResponse = {
  total_count: number
  items: Repository[]
}

export const filters = writable({
  q: '',
  sort: undefined,
  order: undefined,
})

const per_page = 100

type Store = {
  pagination: {
    total: number
    current: number
    hasMorePages(): boolean
  }
  repositories: Map<Repository['id'], Repository>
  isLoading: boolean
}

const store = writable<Store>({
  pagination: {
    total: 0,
    current: 0,
    hasMorePages() {
      return this.total > this.current
    },
  },
  repositories: new Map(),
  isLoading: false,
})

type SearchFn = Readable<Store> & {
  freshFetch: () => Promise<void>
  loadMore: () => Promise<void>
}

export function useSearch(): SearchFn {
  async function fetchRepositories(page = 1): Promise<void> {
    store.update((store) => {
      store.pagination.current = page
      store.isLoading = true

      return store
    })

    const params = get(filters)

    const response = await api.get<ApiResponse>('https://api.github.com/search/repositories', {
      ...params,
      q: `${params.q} topic:uanl`.trim(),
      page,
      per_page,
    })

    store.update((store) => {
      store.pagination.total = Math.ceil(response.total_count / per_page)

      response.items.forEach((repo) => {
        store.repositories.set(repo.id, repo)
      })

      store.isLoading = false

      return store
    })
  }

  async function freshFetch(): Promise<void> {
    const state = get(store)

    if (state.isLoading) {
      return
    }

    store.update((store) => {
      store.repositories.clear()

      return store
    })

    await fetchRepositories()
  }

  async function loadMore(): Promise<void> {
    const state = get(store)

    if (state.isLoading || !state.pagination.hasMorePages()) {
      return
    }

    await fetchRepositories(state.pagination.current + 1)
  }

  return {
    subscribe: store.subscribe,
    freshFetch,
    loadMore,
  }
}
