import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import {
  Canvas,
  Group,
  LinearGradient,
  Fill,
  vec,
  Rect,
  interpolate,
  Mask,
  Shadow,
  Turbulence,
  rect,
} from '@shopify/react-native-skia'

import { Clock } from '.'
import { useScreenDimensions } from '../../hooks/screen'

// const length = 9
// ["#5a3ec3", "#eba5c5", "#e1d4b7", "#e9b74c", "#cf1403"]

const Wallpaper = () => {
  const { height, width: wWidth } = useScreenDimensions()

  const length = height > wWidth ? 7 : 13
  const STRIPES = new Array(length).fill(0).map((_, i) => i)
  const width = wWidth / length
  const origin = vec(width / 2, height / 2)

  return (
    <Canvas style={{ flex: 1 }}>
      <Fill>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(0, height)}
          colors={['#1A0049', '#2F0604']}
        />
      </Fill>
      <Group>
        <LinearGradient
          start={vec(0, 0)}
          end={vec(0, height)}
          colors={['#5a3ec3', '#eba5c5', '#e1d4b7', '#e9b74c', '#cf1403']}
        />
        <Shadow dx={0} dy={0} blur={20} color="black" />
        {STRIPES.map((_, i) => {
          return (
            <Group
              origin={origin}
              transform={[
                {
                  scaleY: interpolate(
                    i,
                    [0, (length - 1) / 2, length - 1],
                    [1, 0.61, 1],
                  ),
                },
              ]}
              key={i}
            >
              <Mask
                mask={
                  <Rect rect={rect(i * width, 0, width, height)}>
                    <LinearGradient
                      start={vec(0, 0)}
                      end={vec(0, height)}
                      colors={['transparent', 'black', 'black', 'transparent']}
                    />
                  </Rect>
                }
              >
                <Rect
                  origin={origin}
                  rect={rect(i * width, 0, width, height)}
                />
              </Mask>
            </Group>
          )
        })}
      </Group>
      <Fill blendMode="softLight">
        <Turbulence freqX={1} freqY={1} octaves={3} />
      </Fill>
    </Canvas>
  )
}

function WallpaperClock({ navigation }) {
  return (
    <TouchableOpacity
      style={styles.background}
      onLongPress={() => {}}
      activeOpacity={0.9}
    >
      <Wallpaper />
      <View style={styles.clockContainer}>
        <Clock styleAnimated={{ transform: [{ scale: 1 }] }} noBackground />
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#0f1422',
  },
  clockContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },
})

export default WallpaperClock
