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

type Stats = {
  authors: number
  languages: number
  repositories: number
}

export const prerender = false

async function fetchStats(token: string): Promise<Stats> {
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

  return {
    authors: authors.size,
    languages: languages.size,
    repositories,
  }
}

const STATS_KV_KEY = 'stats'
const STATS_TTL_SECONDS = 86400 // 24h — ties the KV TTL to s-maxage below

function parseStats(stored: string | null | undefined): Stats | null {
  try {
    const parsed = JSON.parse(stored ?? '')

    if (
      Number.isFinite(parsed?.authors) &&
      Number.isFinite(parsed?.languages) &&
      Number.isFinite(parsed?.repositories)
    ) {
      return parsed
    }
  } catch {
    // fall through: corrupt/unexpected KV data is treated as a miss
  }

  return null
}

export const GET: RequestHandler = async ({ request, platform }) => {
  // Tier 1 (CDN-side): caches.default edge cache; absent under plain vite dev
  const cache = globalThis.caches?.default

  if (cache) {
    const cached = await cache.match(request)

    if (cached) {
      return cached
    }
  }

  // Tier 2: KV holds the computed stats with a 24h TTL, surviving edge-cache
  // eviction and serving regions without a warm cache
  const kv = platform?.env.STATS_KV
  const stored = parseStats(await kv?.get(STATS_KV_KEY))
  let stats: Stats

  if (stored) {
    stats = stored
  } else {
    const token = platform?.env.GITHUB_TOKEN

    if (!token) {
      return json({ message: 'GITHUB_TOKEN binding is not configured' }, { status: 500 })
    }

    stats = await fetchStats(token)

    const persist = kv?.put(STATS_KV_KEY, JSON.stringify(stats), {
      expirationTtl: STATS_TTL_SECONDS,
    })

    if (persist) {
      platform?.ctx?.waitUntil(persist)
    }
  }

  const response = json(stats, {
    headers: {
      // Tier 3 (client): max-age=300 caches in the browser for 5 minutes;
      // s-maxage lets the edge cache (tier 1) keep it for STATS_TTL_SECONDS
      'Cache-Control': `max-age=300, s-maxage=${STATS_TTL_SECONDS}, stale-while-revalidate`,
    },
  })

  // Only successful responses reach this point: a failed GitHub fetch throws
  // in fetchStats, so neither the edge cache nor KV is ever poisoned.
  const persist = cache?.put(request, response.clone())

  if (persist) {
    platform?.ctx?.waitUntil(persist)
  }

  return response
}
