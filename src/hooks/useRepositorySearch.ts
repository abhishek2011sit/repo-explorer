import { useInfiniteQuery } from '@tanstack/react-query'

import { searchRepositories } from '../api/github'

export const useRepositorySearch = (query: string) => {
  const trimmedQuery = query.trim()

  return useInfiniteQuery({
    queryKey: ['repositories', trimmedQuery],
    queryFn: ({ pageParam }) => searchRepositories(trimmedQuery, pageParam),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.nextPage,
    enabled: trimmedQuery.length >= 2,
    staleTime: 60_000,
  })
}
