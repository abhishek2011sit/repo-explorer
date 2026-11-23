import { searchRepositories } from '../src/api/github'

const mockFetch = (status: number, body: unknown) => {
  globalThis.fetch = jest.fn().mockResolvedValue({
    ok: status >= 200 && status < 300,
    status,
    json: async () => body,
  }) as unknown as typeof fetch
}

const item = {
  id: 1,
  full_name: 'facebook/react-native',
  description: 'A framework for building native apps',
  stargazers_count: 120000,
  language: 'C++',
  html_url: 'https://github.com/facebook/react-native',
}

describe('searchRepositories', () => {
  it('maps the GitHub response to the app model', async () => {
    mockFetch(200, { total_count: 1, items: [item] })

    const page = await searchRepositories('react native', 1)

    expect(page.repositories[0]).toEqual({
      id: 1,
      fullName: 'facebook/react-native',
      description: 'A framework for building native apps',
      stars: 120000,
      language: 'C++',
      url: 'https://github.com/facebook/react-native',
    })
    expect(page.nextPage).toBeNull()
  })

  it('returns the next page number when more results exist', async () => {
    mockFetch(200, { total_count: 45, items: [item] })

    const page = await searchRepositories('react', 2)

    expect(page.nextPage).toBe(3)
  })

  it('encodes the query in the request URL', async () => {
    mockFetch(200, { total_count: 0, items: [] })

    await searchRepositories('react native', 1)

    expect((globalThis.fetch as jest.Mock).mock.calls[0][0]).toContain('q=react%20native')
  })

  it('explains a rate limit error', async () => {
    mockFetch(403, {})

    await expect(searchRepositories('react', 1)).rejects.toThrow('rate limit')
  })
})
