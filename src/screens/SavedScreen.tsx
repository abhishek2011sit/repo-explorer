import { FlatList, StyleSheet, Text, View } from 'react-native'

import { RepositoryRow } from '../components/RepositoryRow'
import { useSavedRepositories } from '../store/useSavedRepositories'
import { colors } from '../theme'

export const SavedScreen = () => {
  const saved = useSavedRepositories((state) => state.saved)
  const toggleSaved = useSavedRepositories((state) => state.toggleSaved)

  return (
    <View style={styles.container}>
      <FlatList
        data={saved}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => <RepositoryRow repository={item} isSaved onToggleSaved={toggleSaved} />}
        ListEmptyComponent={<Text style={styles.empty}>Repositories you save will appear here.</Text>}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, paddingHorizontal: 16 },
  empty: { marginTop: 24, textAlign: 'center', color: colors.muted },
})
