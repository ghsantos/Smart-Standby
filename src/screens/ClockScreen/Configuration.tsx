import React from 'react'
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
import { useClockSettingsStorage } from '../../hooks/storage'

dayjs.locale('pt-br')

const windowWidth = Math.max(
  Dimensions.get('window').width,
  Dimensions.get('window').height,
)

const Configuration = ({ navigation }) => {
  const [clockSettings, setClockSettings] = useClockSettingsStorage()

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
      <View style={{ flex: 1 }}>
        <ScrollView>
          {fonts.map(font => (
            <TouchableOpacity
              key={font.name}
              onPress={() =>
                setClockSettings({ ...clockSettings, timeFont: font.value })
              }
            >
              <Text style={{ color: '#fff', padding: 8 }}>{font.name}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#0f1422',
    flex: 1,
    flexDirection: 'row',
  },
  clockContainer: {
    width: windowWidth,
    height: '100%',
    position: 'absolute',
  },
  clock: {
    borderRadius: 16,
    transform: [{ scale: 0.5 }, { translateX: -(windowWidth / 2) }],
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
