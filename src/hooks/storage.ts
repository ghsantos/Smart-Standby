import { useMMKVString } from 'react-native-mmkv'

type StorageKeys = 'player.url' | 'player.port'

export function useStringStorage(
  key: StorageKeys,
  defaultValue: string,
): [string, Function] {
  const [value, setValue] = useMMKVString(key)

  return [value || defaultValue, setValue]
}
