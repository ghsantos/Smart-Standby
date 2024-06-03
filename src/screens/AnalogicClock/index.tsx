import React, { useCallback, useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'
import { useTime } from '../../hooks/time'
import dayjs from 'dayjs'

interface Point2D {
  x: number
  y: number
}

const transformOriginWorklet = (
  anchorPoint: Point2D,
  originalCenterPoint: Point2D,
  transforms: any,
) => {
  'worklet'
  const result = [
    { translateX: anchorPoint.x - originalCenterPoint.x },
    { translateY: anchorPoint.y - originalCenterPoint.y },
    ...transforms,
    { translateX: -(anchorPoint.x - originalCenterPoint.x) },
    { translateY: -(anchorPoint.y - originalCenterPoint.y) },
  ]
  return result
}

export default function AnalogicClock() {
  const { height } = Dimensions.get('window')

  const time = useTime(998)

  const dayTime = dayjs(time)

  // const [hours, minutes, seconds] = [0, 0, 0]
  const [hours, minutes, seconds] = dayTime
    .format('HH-mm-ss')
    .split('-')
    .map(item => Number(item))

  const secsDeg = useSharedValue(0)
  const minsDeg = useSharedValue(0)
  const hoursDeg = useSharedValue(0)

  const updateValue = useCallback(() => {
    'worklet'
    secsDeg.value = (seconds / 60) * 360 + 180
    minsDeg.value = (minutes / 60) * 360 + (seconds / 60) * 6 + 180
    hoursDeg.value = (hours / 12) * 360 + (minutes / 60) * 30 + 180
  }, [seconds, minutes, hours, secsDeg, minsDeg, hoursDeg])

  useEffect(() => {
    updateValue()
  }, [updateValue])

  const secsStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      backgroundColor: '#aaa',
      width: 2,
      height: 180,
      top: '50%',
      transform: transformOriginWorklet({ x: 2, y: 0 }, { x: 2, y: 90 }, [
        { rotate: `${secsDeg.value}deg` },
      ]),
    }
  })

  const minsStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      backgroundColor: '#fff',
      width: 2,
      height: 160,
      top: '50%',
      transform: transformOriginWorklet({ x: 2, y: 0 }, { x: 2, y: 80 }, [
        { rotate: `${minsDeg.value}deg` },
      ]),
    }
  })

  const hoursStyle = useAnimatedStyle(() => {
    return {
      position: 'absolute',
      backgroundColor: '#fff',
      borderRadius: 3,
      width: 6,
      height: 130,
      top: '50%',
      transform: transformOriginWorklet({ x: 6, y: 0 }, { x: 6, y: 65 }, [
        { rotate: `${hoursDeg.value}deg` },
      ]),
    }
  })

  return (
    <View style={styles.container}>
      <View style={[styles.tick, { height: height * 2.5, transform: [{ rotate: '0deg' }] }]} />
      <View style={[styles.tick, { height: height * 2.5, transform: [{ rotate: '30deg' }] }]} />
      <View style={[styles.tick, { height: height * 2.5, transform: [{ rotate: '60deg' }] }]} />
      <View style={[styles.tick, { height: height * 2.5, transform: [{ rotate: '90deg' }] }]} />
      <View style={[styles.tick, { height: height * 2.5, transform: [{ rotate: '120deg' }] }]} />
      <View style={[styles.tick, { height: height * 2.5, transform: [{ rotate: '150deg' }] }]} />

      <View style={styles.innerFace}>
        <Animated.View style={secsStyle} />
        <Animated.View style={minsStyle} />
        <Animated.View style={hoursStyle} />

        {/* <View style={{ backgroundColor: '#ff7070', width: 12, height: 12, borderRadius: 6, left: 0, top: -1 }} /> */}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f1422',
    justifyContent: 'center',
    alignItems: 'center',
  },
  tick: {
    backgroundColor: '#fff',
    width: 4,
    borderRadius: 2,
    position: 'absolute',
  },
  innerFace: {
    width: '85%',
    height: '80%',
    backgroundColor: '#0f1422',
    justifyContent: 'center',
    alignItems: 'center',
  },
})
