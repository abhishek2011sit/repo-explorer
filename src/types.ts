export type Repository = {
  id: number
  fullName: string
  description: string | null
  stars: number
  language: string | null
  url: string
}

export type RepositoryPage = {
  repositories: Repository[]
  nextPage: number | null
}
