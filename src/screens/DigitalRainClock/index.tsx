import {
  Canvas,
  Fill,
  Glyphs,
  Group,
  Mask,
  Rect,
  useClockValue,
  useFont,
  vec,
} from '@shopify/react-native-skia'
import React from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import {
  NavigationProp,
  ParamListBase,
  useIsFocused,
} from '@react-navigation/native'
import dayjs from 'dayjs'

import { COLS, ROWS, Symbol } from './Symbol'
import { useTime } from '../../hooks/time'

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
  const textFont = useFont(
    require('../../../assets/fonts/kg-second-chances.olid.ttf'),
    240,
  )

  const time = useTime()
  const dayTime = dayjs(time)

  const isFocused = useIsFocused()

  if (font === null || textFont === null || !isFocused) {
    return <View style={styles.background} />
  }

  const symbols = font.getGlyphIDs('abcdefghijklmnopqrstuvwxyz')

  const glyphs = textFont.getGlyphIDs(dayTime.format('HH:mm')).map((id, i) => ({
    id,
    pos: vec(i === 2 ? i * 140 + 100 : i * 140 + 60, 300),
  }))

  return (
    <View style={styles.background}>
      <Canvas style={styles.canvas}>
        <Fill color="black" />
        <Glyphs font={textFont} glyphs={glyphs} />
        <Mask
          mask={
            <Group>
              {/* <Circle cx={128} cy={128} r={128} opacity={1} />
              <Circle cx={128} cy={128} r={64} /> */}
              <Glyphs
                font={textFont}
                glyphs={glyphs}
                color="rgb(0, 255, 70)"
                opacity={1}
              />
              <Rect x={0} y={0} width={width} height={height} opacity={0.16} />
            </Group>
          }
        >
          <Group>
            {/* <Rect x={0} y={0} width={width} height={height} color="lightblue" /> */}
            {/* <Glyphs font={textFont} glyphs={glyphs} color="rgb(0, 255, 70)" /> */}
            {/* <BlurMask blur={8} style="solid" /> */}
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
        </Mask>
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
