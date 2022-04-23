import type { RequestHandlerOutput } from '@sveltejs/kit'
import { api } from '$lib/util'

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

export async function get(): Promise<RequestHandlerOutput> {
  const token = process.env.GITHUB_TOKEN

  const authors = new Set()
  const languages = new Set()
  let repositories = 0

  let cursor = {
    hasNextPage: false,
    endCursor: null,
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
    status: 200,
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'max-age=300, s-maxage=86400, stale-while-revalidate',
    },
    body: {
      authors: authors.size,
      languages: languages.size,
      repositories,
    },
  }
}
