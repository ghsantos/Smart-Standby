import React, { useState } from 'react'
import {
  Dimensions,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { fonts } from '../../utils/fonts'
import { Clock } from '.'
import {
  defaultClockSettings,
  useClockSettingsStorage,
} from '../../hooks/storage'
import FontConfig from './FontConfig'
import ColorConfig from './ColorConfig'

dayjs.locale('pt-br')

const windowWidth = Math.max(
  Dimensions.get('window').width,
  Dimensions.get('window').height,
)

const windowHeight = Math.min(
  Dimensions.get('window').width,
  Dimensions.get('window').height,
)

type ConfigTypeItem = 'font' | 'fontSize' | 'color'

type ConfigItem = {
  id: string
  name: string
  type: ConfigTypeItem
}

const configItens: ConfigItem[] = [
  { id: 'background', name: 'Background', type: 'color' },
  { id: 'timeFont', name: 'Font', type: 'font' },
  { id: 'timeSize', name: 'Size', type: 'fontSize' },
  // { name: '', id: '', type: '' },
  // { name: '', id: '', type: '' },
  // { name: '', id: '', type: '' },
  // { name: '', id: '', type: '' },
]

const Configuration = ({ navigation }) => {
  const [clockSettings, setClockSettings] = useClockSettingsStorage()

  const [page, setPage] = useState(0)

  return (
    <View style={styles.background}>
      <View style={{ flex: 1 }}>
        <View style={styles.clockContainer}>
          <Clock styleAnimated={styles.clock} />
        </View>
        <View>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.button}
          >
            <Text style={styles.buttonText}>Back</Text>
          </TouchableOpacity>
        </View>
      </View>
      <View style={{ flex: 1, flexDirection: 'row' }}>
        <View style={{ flex: 4 }}>
          {page === 0 && (
            <ColorConfig
              currentColor={clockSettings.background}
              defaultColor={defaultClockSettings.background}
              onChange={color =>
                setClockSettings({ ...clockSettings, background: color })
              }
            />
          )}
          {page === 1 && (
            <FontConfig
              fonts={fonts}
              selected={clockSettings.timeFont}
              onPress={font =>
                setClockSettings({ ...clockSettings, timeFont: font.family })
              }
            />
          )}
        </View>
        <View style={{ flex: 3 }}>
          <ScrollView>
            {configItens.map((item, index) => (
              <TouchableOpacity key={item.id} onPress={() => setPage(index)}>
                <Text style={{ color: '#fff', padding: 8, fontSize: 20 }}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#1d2028',
    flex: 1,
    flexDirection: 'row',
  },
  clockContainer: {
    width: windowWidth,
    height: '100%',
    // backgroundColor: '#f005',
    position: 'absolute',
    // justifyContent: 'center',
    // alignItems: 'center',
  },
  clock: {
    borderRadius: 16,
    transform: [{ scale: 0.5 }],
    // top: windowHeight / 4,
    left: -(windowWidth / 4),
    // left: -(windowWidth / 4),
    // transform: [{ scale: 0.5 }, { translateX: -(windowWidth / 2) }],
  },
  button: {
    padding: 12,
    alignItems: 'center',
    backgroundColor: '#222939',
    width: 74,
    marginLeft: 20,
    marginTop: 12,
    borderRadius: 8,
  },
  buttonText: {
    color: '#fff',
  },
})

export default Configuration
