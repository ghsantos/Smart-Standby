import React, { useEffect } from 'react'
import { Canvas, Circle, Group } from '@shopify/react-native-skia'
import {
  useDerivedValue,
  useSharedValue,
  withRepeat,
  withTiming,
} from 'react-native-reanimated'
import { StyleSheet, View } from 'react-native'

export const HelloWorld = () => {
  const size = 256
  const r = useSharedValue(0)
  const c = useDerivedValue(() => size - r.value)

  useEffect(() => {
    r.value = withRepeat(withTiming(size * 0.33, { duration: 2000 }), -1)
  }, [r, size])

  return (
    <View style={styles.background}>
      <Canvas style={{ flex: 1 }}>
        <Group blendMode="multiply">
          <Circle cx={r} cy={r} r={r} color="cyan" />
          <Circle cx={c} cy={r} r={r} color="magenta" />
          <Circle cx={size / 2} cy={c} r={r} color="yellow" />
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
})
