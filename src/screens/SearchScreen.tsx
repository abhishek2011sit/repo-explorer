import { useCallback, useMemo, useState } from 'react'
import { ActivityIndicator, FlatList, StyleSheet, Text, TextInput, View } from 'react-native'

import { RepositoryRow } from '../components/RepositoryRow'
import { useDebouncedValue } from '../hooks/useDebouncedValue'
import { useRepositorySearch } from '../hooks/useRepositorySearch'
import { useSavedRepositories } from '../store/useSavedRepositories'
import { colors } from '../theme'
import type { Repository } from '../types'

export const SearchScreen = () => {
  const [searchText, setSearchText] = useState('')
  const debouncedSearchText = useDebouncedValue(searchText, 400)
  const { data, error, isLoading, isFetchingNextPage, hasNextPage, fetchNextPage } =
    useRepositorySearch(debouncedSearchText)
  const saved = useSavedRepositories((state) => state.saved)
  const toggleSaved = useSavedRepositories((state) => state.toggleSaved)

  const repositories = useMemo(() => data?.pages.flatMap((page) => page.repositories) ?? [], [data])
  const savedIds = useMemo(() => new Set(saved.map((item) => item.id)), [saved])

  const renderItem = useCallback(
    ({ item }: { item: Repository }) => (
      <RepositoryRow repository={item} isSaved={savedIds.has(item.id)} onToggleSaved={toggleSaved} />
    ),
    [savedIds, toggleSaved],
  )

  const loadNextPage = () => {
    if (hasNextPage && !isFetchingNextPage) fetchNextPage()
  }

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Search GitHub repositories"
        placeholderTextColor={colors.muted}
        autoCapitalize="none"
        autoCorrect={false}
        value={searchText}
        onChangeText={setSearchText}
      />
      {isLoading ? <ActivityIndicator style={styles.status} /> : null}
      {error ? <Text style={[styles.status, styles.error]}>{error.message}</Text> : null}
      <FlatList
        data={repositories}
        keyExtractor={(item) => String(item.id)}
        renderItem={renderItem}
        onEndReached={loadNextPage}
        onEndReachedThreshold={0.5}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          !isLoading && !error ? (
            <Text style={styles.status}>
              {debouncedSearchText.trim().length < 2 ? 'Type at least two letters to search.' : 'No repositories found.'}
            </Text>
          ) : undefined
        }
        ListFooterComponent={isFetchingNextPage ? <ActivityIndicator style={styles.status} /> : undefined}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  input: {
    backgroundColor: colors.card,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 10,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 16,
    color: colors.text,
    marginBottom: 12,
  },
  status: { marginVertical: 16, textAlign: 'center', color: colors.muted },
  error: { color: colors.danger },
})
