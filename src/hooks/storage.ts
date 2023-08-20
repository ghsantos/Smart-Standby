import { useMMKVObject, useMMKVString } from 'react-native-mmkv'

type StorageKeys = 'player.url' | 'player.port'

export function useStringStorage(
  key: StorageKeys,
  defaultValue: string,
): [string, Function] {
  const [value, setValue] = useMMKVString(key)

  return [value || defaultValue, setValue]
}

type ClockSettings = {
  background: string
  timeSize: number
  timeFont: string
  timeColor: string
  dateSize: number
  dateFont: string
  dateColor: string
}

const defaultClockSettings: ClockSettings = {
  background: '#080B12',
  timeSize: 160,
  timeFont: 'Josefin Sans',
  timeColor: '#eee',
  dateSize: 32,
  dateFont: 'Josefin Sans',
  dateColor: '#ccc',
}

export function useClockSettingsStorage(): [
  ClockSettings,
  (value: ClockSettings) => void,
] {
  const [value, setValue] = useMMKVObject<ClockSettings>('clock.settings')

  return [value || defaultClockSettings, setValue]
}
