import React from 'react'
import {
  Image,
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

const image0 = require('../../../assets/animeClock/s-animated/0.gif')
const image1 = require('../../../assets/animeClock/s-animated/1.gif')
const image2 = require('../../../assets/animeClock/s-animated/2.gif')
const image3 = require('../../../assets/animeClock/s-animated/3.gif')
const image4 = require('../../../assets/animeClock/s-animated/4.gif')
const image5 = require('../../../assets/animeClock/s-animated/5.gif')
const image6 = require('../../../assets/animeClock/s-animated/6.gif')
const image7 = require('../../../assets/animeClock/s-animated/7.gif')
const image8 = require('../../../assets/animeClock/s-animated/8.gif')
const image9 = require('../../../assets/animeClock/s-animated/9.gif')
const colon = require('../../../assets/animeClock/s-animated/colon.gif')

const images = [
  image0,
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
]

dayjs.locale('pt-br')

export interface ClockProps {
  styleAnimated: StyleProp<Animated.AnimateStyle<StyleProp<ViewStyle>>>
}

export const Clock = ({ styleAnimated }: ClockProps) => {
  const time = useTime()
  const [clockSettings] = useClockSettingsStorage()

  const dayTime = dayjs(time)

  const test = dayTime
    .format('HHmm')
    .split('')
    .map(item => Number(item))

  return (
    <Animated.View
      style={[styles.clockBackground, styleAnimated]}
      // sharedTransitionTag="tag"
    >
      <View
        style={[
          styles.container,
          { backgroundColor: clockSettings.background },
        ]}
      >
        <View style={styles.imageNumberContainer}>
          <Image source={images[test[0]]} style={styles.imageNumber} />
          <Image source={images[test[1]]} style={styles.imageNumber} />
          <Image source={colon} style={styles.imageColon} />
          <Image source={images[test[2]]} style={styles.imageNumber} />
          <Image source={images[test[3]]} style={styles.imageNumber} />
        </View>
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

const AnimeClock = ({ navigation }) => {
  return (
    <TouchableOpacity
      style={styles.background}
      onLongPress={() => {}}
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
  imageNumberContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 24,
  },
  imageNumber: {
    height: 170,
    width: 80,
    marginHorizontal: 10,
  },
  imageColon: {
    // height: 100,
    width: 55,
    marginHorizontal: 10,
  },
})

export default AnimeClock
