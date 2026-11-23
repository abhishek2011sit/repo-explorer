import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { StatusBar } from 'expo-status-bar'
import { useState } from 'react'
import { Pressable, StyleSheet, Text, View } from 'react-native'
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context'

import { SavedScreen } from './src/screens/SavedScreen'
import { SearchScreen } from './src/screens/SearchScreen'
import { colors } from './src/theme'

const queryClient = new QueryClient()

const TABS = ['Search', 'Saved'] as const
type Tab = (typeof TABS)[number]

export default function App() {
  const [activeTab, setActiveTab] = useState<Tab>('Search')

  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaProvider>
        <SafeAreaView style={styles.container}>
          <Text style={styles.title}>Repo Explorer</Text>
          <View style={styles.tabs}>
            {TABS.map((tab) => (
              <Pressable
                key={tab}
                accessibilityRole="tab"
                style={[styles.tab, activeTab === tab && styles.activeTab]}
                onPress={() => setActiveTab(tab)}
              >
                <Text style={[styles.tabText, activeTab === tab && styles.activeTabText]}>{tab}</Text>
              </Pressable>
            ))}
          </View>
          {activeTab === 'Search' ? <SearchScreen /> : <SavedScreen />}
          <StatusBar style="dark" />
        </SafeAreaView>
      </SafeAreaProvider>
    </QueryClientProvider>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  title: { fontSize: 26, fontWeight: '700', color: colors.text, paddingHorizontal: 16, paddingTop: 8 },
  tabs: { flexDirection: 'row', paddingHorizontal: 16, marginVertical: 12, gap: 8 },
  tab: { paddingVertical: 8, paddingHorizontal: 16, borderRadius: 20, backgroundColor: colors.card },
  activeTab: { backgroundColor: colors.accent },
  tabText: { fontWeight: '600', color: colors.muted },
  activeTabText: { color: '#FFFFFF' },
})
