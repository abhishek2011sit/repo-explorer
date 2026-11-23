import type { Repository, RepositoryPage } from '../types'

const SEARCH_URL = 'https://api.github.com/search/repositories'
export const PAGE_SIZE = 20

type GithubRepository = {
  id: number
  full_name: string
  description: string | null
  stargazers_count: number
  language: string | null
  html_url: string
}

type GithubSearchResponse = {
  total_count: number
  items: GithubRepository[]
}

const toRepository = (item: GithubRepository): Repository => ({
  id: item.id,
  fullName: item.full_name,
  description: item.description,
  stars: item.stargazers_count,
  language: item.language,
  url: item.html_url,
})

export const searchRepositories = async (query: string, page: number): Promise<RepositoryPage> => {
  const url = `${SEARCH_URL}?q=${encodeURIComponent(query)}&sort=stars&per_page=${PAGE_SIZE}&page=${page}`
  const response = await fetch(url, { headers: { Accept: 'application/vnd.github+json' } })

  if (response.status === 403) {
    throw new Error('GitHub rate limit reached. Please wait a minute and try again.')
  }
  if (!response.ok) {
    throw new Error(`GitHub search failed with status ${response.status}`)
  }

  const body = (await response.json()) as GithubSearchResponse
  const hasMore = page * PAGE_SIZE < body.total_count

  return {
    repositories: body.items.map(toRepository),
    nextPage: hasMore ? page + 1 : null,
  }
}
