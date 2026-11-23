# Repo Explorer

A React Native app (Expo, TypeScript) that searches GitHub repositories and lets you save favourites on the device.

## Features

- Search as you type, with a 400 ms debounce so the API is not called on every key press
- Infinite scrolling: the next page loads when you reach the end of the list
- Saved repositories are stored on the device and are still there after the app restarts
- Clear messages for loading, empty results, errors and the GitHub rate limit

## Tech

| Area | Choice |
| - | - |
| App | Expo SDK 58, React Native 0.88, React 19, TypeScript (strict) |
| Server data | TanStack Query (`useInfiniteQuery`) for caching and paging |
| Local data | Zustand with the `persist` middleware on AsyncStorage |
| Tests | Jest with `jest-expo` |

## Structure

```
src/
  api/github.ts                 GitHub search call, maps the response to the app model
  hooks/useDebouncedValue.ts    generic debounce hook
  hooks/useRepositorySearch.ts  TanStack Query hook for paged search
  store/useSavedRepositories.ts Zustand store for saved repositories
  components/RepositoryRow.tsx  memoised list row
  screens/                      Search and Saved screens
__tests__/                      unit tests for the API mapping, the store and formatting
```

## Design notes

- **Server state and client state are kept apart.** Search results belong to GitHub, so TanStack Query owns them. Saved repositories belong to the user, so a Zustand store owns them.
- **The API layer maps GitHub's response to a small app model**, so the rest of the app does not depend on GitHub's field names.
- **List rows are memoised** and the row callback is stable, so saving one repository does not re-render every row.

## Run

```bash
npm install
npm start
```

Requires Node 22.13 or newer. No API key is needed; the public GitHub search API allows about 10 searches a minute.

## Checks

```bash
npm test
npm run typecheck
```
