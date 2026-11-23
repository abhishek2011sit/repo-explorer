import { useSavedRepositories } from '../src/store/useSavedRepositories'
import type { Repository } from '../src/types'

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
)

const repository: Repository = {
  id: 7,
  fullName: 'expo/expo',
  description: null,
  stars: 30000,
  language: 'TypeScript',
  url: 'https://github.com/expo/expo',
}

describe('useSavedRepositories', () => {
  beforeEach(() => useSavedRepositories.setState({ saved: [] }))

  it('saves a repository', () => {
    useSavedRepositories.getState().toggleSaved(repository)

    expect(useSavedRepositories.getState().saved).toEqual([repository])
  })

  it('removes a repository that is already saved', () => {
    useSavedRepositories.getState().toggleSaved(repository)
    useSavedRepositories.getState().toggleSaved(repository)

    expect(useSavedRepositories.getState().saved).toEqual([])
  })
})
