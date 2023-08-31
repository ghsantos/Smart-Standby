import React from 'react'
import {
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewStyle,
} from 'react-native'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

import { useTime } from '../../hooks/time'
import Animated from 'react-native-reanimated'
import { useClockSettingsStorage } from '../../hooks/storage'

dayjs.locale('pt-br')

export interface ClockProps {
  styleAnimated: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
}

export const Clock = ({ styleAnimated }: ClockProps) => {
  const time = useTime()
  const [clockSettings] = useClockSettingsStorage()

  const dayTime = dayjs(time)

  return (
    <Animated.View
      style={[styles.clockBackground, styleAnimated]}
      sharedTransitionTag="tag"
    >
      <View
        style={[
          styles.container,
          { backgroundColor: clockSettings.background },
        ]}
      >
        <Text
          style={[
            styles.time,
            {
              fontSize: clockSettings.timeSize,
              color: clockSettings.timeColor,
              fontFamily: clockSettings.timeFont,
            },
          ]}
          adjustsFontSizeToFit
          numberOfLines={1}
        >
          {dayTime.format('HH:mm')}
        </Text>
        <Text
          style={[
            styles.date,
            {
              fontSize: clockSettings.dateSize,
              color: clockSettings.dateColor,
              fontFamily: clockSettings.dateFont,
            },
          ]}
        >
          {`${dayTime.format('dddd, D')} de ${dayTime.format('MMMM')}`}
        </Text>
      </View>
    </Animated.View>
  )
}

const ClockScreen = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.background}
      onLongPress={() => navigation.navigate('ClockConfiguration')}
      activeOpacity={0.9}
    >
      <Clock styleAnimated={{ transform: [{ scale: 1 }] }} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0f1422',
  },
  clockBackground: {
    flex: 1,
  },
  container: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  time: {
    textAlign: 'center',
  },
  date: {
    textAlign: 'center',
  },
})

export default ClockScreen
