import { Octokit } from '@octokit/rest'

const octokit = new Octokit({
  auth: process.env.GITHUB_TOKEN,
})

export default async (_request, response) => {
  const pagination = {
    total: 1,
    current: 1,
  }

  const per_page = 100

  const authors = new Set()
  const languages = new Set()
  let repositories = 0

  do {
    const response = await octokit.search.repos({
      q: 'topic:uanl',
      page: pagination.current,
      per_page,
    })

    repositories = Math.max(response.data.total_count)

    pagination.total = Math.ceil(repositories / per_page)

    response.data.items.forEach((repository) => {
      authors.add(repository.owner.login)

      if (repository.language) {
        languages.add(repository.language)
      }
    })

    ++pagination.current
  } while (pagination.current <= pagination.total)

  response.setHeader(
    'Cache-Control',
    // Cache response on client for 5 minutes and on network for 1 day
    'max-age=300, s-maxage=86400, stale-while-revalidate'
  )
  response.status(200).json({
    authors: authors.size,
    languages: languages.size,
    repositories,
  })
}
