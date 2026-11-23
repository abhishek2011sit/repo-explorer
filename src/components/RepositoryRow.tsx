import { memo } from 'react'
import { Linking, Pressable, StyleSheet, Text, View } from 'react-native'

import { colors } from '../theme'
import type { Repository } from '../types'
import { formatCount } from '../utils/formatCount'

type Props = {
  repository: Repository
  isSaved: boolean
  onToggleSaved: (repository: Repository) => void
}

const RepositoryRowComponent = ({ repository, isSaved, onToggleSaved }: Props) => (
  <Pressable style={styles.card} onPress={() => Linking.openURL(repository.url)}>
    <View style={styles.header}>
      <Text style={styles.name} numberOfLines={1}>
        {repository.fullName}
      </Text>
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={isSaved ? 'Remove from saved' : 'Save repository'}
        hitSlop={12}
        onPress={() => onToggleSaved(repository)}
      >
        <Text style={[styles.save, isSaved && styles.saved]}>{isSaved ? 'Saved' : 'Save'}</Text>
      </Pressable>
    </View>
    {repository.description ? (
      <Text style={styles.description} numberOfLines={2}>
        {repository.description}
      </Text>
    ) : null}
    <Text style={styles.meta}>
      {formatCount(repository.stars)} stars{repository.language ? `  ·  ${repository.language}` : ''}
    </Text>
  </Pressable>
)

export const RepositoryRow = memo(RepositoryRowComponent)

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.card,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: colors.border,
    padding: 14,
    marginBottom: 10,
  },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  name: { flex: 1, fontSize: 16, fontWeight: '600', color: colors.text, marginRight: 12 },
  save: { fontSize: 14, fontWeight: '600', color: colors.accent },
  saved: { color: colors.muted },
  description: { marginTop: 6, fontSize: 14, color: colors.muted },
  meta: { marginTop: 8, fontSize: 13, color: colors.muted },
})
