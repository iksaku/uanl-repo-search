import { env } from '$env/dynamic/private'
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

export const GET: RequestHandler = async () => {
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
        Authorization: `Bearer ${env.GITHUB_TOKEN}`,
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

  return json(
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
}
