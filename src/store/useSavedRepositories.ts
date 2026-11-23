import AsyncStorage from '@react-native-async-storage/async-storage'
import { create } from 'zustand'
import { createJSONStorage, persist } from 'zustand/middleware'

import type { Repository } from '../types'

type SavedRepositoriesState = {
  saved: Repository[]
  toggleSaved: (repository: Repository) => void
}

export const useSavedRepositories = create<SavedRepositoriesState>()(
  persist(
    (set, get) => ({
      saved: [],
      toggleSaved: (repository) => {
        const isSaved = get().saved.some((item) => item.id === repository.id)
        set({
          saved: isSaved
            ? get().saved.filter((item) => item.id !== repository.id)
            : [repository, ...get().saved],
        })
      },
    }),
    { name: 'saved-repositories', storage: createJSONStorage(() => AsyncStorage) },
  ),
)
