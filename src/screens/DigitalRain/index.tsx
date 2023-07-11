import {
  BlurMask,
  Canvas,
  Fill,
  Group,
  useClockValue,
  useFont,
} from '@shopify/react-native-skia'
import React from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'

import { COLS, ROWS, Symbol } from './Symbol'
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from '@react-navigation/native'

const cols = new Array(COLS).fill(0).map((_, i) => i)
const rows = new Array(ROWS).fill(0).map((_, i) => i)

const randomArray = (from: number, to: number, blank?: boolean) => {
  const size = Math.round(from + Math.random() * (to - from))
  const a = new Array(size).fill(0).map((_, i) => (blank ? 0 : i / size))
  return a.reverse()
}

const streams = cols.map(() =>
  new Array(3)
    .fill(0)
    .map(() => [
      ...randomArray(1, 4, true),
      ...randomArray(4, 16),
      ...randomArray(2, 8, true),
    ])
    .flat(),
)

interface DigitalRainProps {
  navigation: NavigationProp<ParamListBase>
}

export default function DigitalRain({}: DigitalRainProps) {
  const clock = useClockValue()
  const { width, height } = useWindowDimensions()
  const symbol = { width: width / COLS, height: height / ROWS }
  const font = useFont(require('./matrix-code-nfi.otf'), symbol.height)

  const isFocused = useIsFocused()

  if (font === null || !isFocused) {
    return <View style={styles.background} />
  }

  const symbols = font.getGlyphIDs('abcdefghijklmnopqrstuvwxyz')

  return (
    <View style={styles.background}>
      <Canvas style={styles.canvas}>
        <Fill color="black" />
        <Group>
          <BlurMask blur={8} style="solid" />
          {cols.map((_i, i) =>
            rows.map((_j, j) => (
              <Symbol
                symbols={symbols}
                font={font}
                timestamp={clock}
                key={`${i}-${j}`}
                i={i}
                j={j}
                stream={streams[i]}
                symbol={symbol}
              />
            )),
          )}
        </Group>
      </Canvas>
    </View>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#080B12',
    flex: 1,
  },
  canvas: {
    flex: 1,
  },
})
