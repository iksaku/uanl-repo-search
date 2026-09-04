import { json } from '@sveltejs/kit'
import { api } from '$lib/util'
import type { RequestHandler } from './$types'

type Repository = {
  owner: {
    id: string
  }
  primaryLanguage: {
    id: string
  }
}

type ApiResponse = {
  data: {
    search: {
      repositoryCount: number
      nodes: Repository[]
      pageInfo: {
        hasNextPage: boolean
        endCursor: string
      }
    }
  }
}

export const prerender = false

export const GET: RequestHandler = async ({ request, platform }) => {
  // caches.default is the Cloudflare edge cache; absent under plain vite dev
  const cache = globalThis.caches?.default

  if (cache) {
    const cached = await cache.match(request)

    if (cached) {
      return cached
    }
  }

  const token = platform?.env.GITHUB_TOKEN

  if (!token) {
    return json({ message: 'GITHUB_TOKEN binding is not configured' }, { status: 500 })
  }

  const authors = new Set()
  const languages = new Set()
  let repositories: number

  let cursor: {
    hasNextPage: boolean
    endCursor: string | null
  }

  do {
    const {
      data: { search },
    } = await api.post<ApiResponse>(
      'https://api.github.com/graphql',
      {
        query: `query {
          search(first: 100, query: "topic:uanl", type: REPOSITORY) {
            repositoryCount
            nodes {
              ... on Repository {
                owner {
                  id
                }
                primaryLanguage {
                  id
                }
              }
            }
            pageInfo {
              hasNextPage
              endCursor
            }
          }
        }`,
      },
      {
        Authorization: `Bearer ${token}`,
        // GitHub rejects requests without a User-Agent; workerd sends none by default
        'User-Agent': 'uanl-repo-search',
      }
    )

    repositories = search.repositoryCount

    for (const repository of search.nodes) {
      authors.add(repository.owner.id)

      if (repository.primaryLanguage) {
        languages.add(repository.primaryLanguage.id)
      }
    }

    cursor = search.pageInfo
  } while (cursor.hasNextPage)

  const response = json(
    {
      authors: authors.size,
      languages: languages.size,
      repositories,
    },
    {
      headers: {
        'Cache-Control': 'max-age=300, s-maxage=86400, stale-while-revalidate',
      },
    }
  )

  // Only successful responses reach this point: a failed GitHub fetch throws
  // above, so the cache is never poisoned. s-maxage=86400 gives the edge cache
  // 24h while browsers keep 5 minutes.
  platform?.ctx.waitUntil(cache?.put(request, response.clone()) ?? Promise.resolve())

  return response
}
