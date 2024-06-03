import React from 'react'
import { Text, View, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import {
  Canvas,
  // Easing,
  Group,
  LinearGradient,
  RoundedRect,
  // runTiming,
  // useComputedValue,
  // useValue,
  vec,
  mix,
} from '@shopify/react-native-skia'

export interface Graph {
  label: string
  value: number
  // data: {
  //   label: string
  //   minPrice: number
  //   maxPrice: number
  //   percentChange: number
  // }
}
export type Graphs = Graph[]

const buttonWidth = 42

export interface GraphState {
  next: number
  current: number
}

interface SelectionProps {
  graphs: Graphs
  onPressItem: (item: any) => void
}

const getDuration = (current: number, next: number) => {
  return 300 + 80 * Math.abs(current - next)
}

export const Selection = ({ graphs, onPressItem }: SelectionProps) => {
  // const transition = useValue(0)
  // const state = useValue({
  //   next: 0,
  //   current: 0,
  // })

  // const transform = useComputedValue(() => {
  //   const { current, next } = state.current
  //   return [
  //     {
  //       translateX: mix(
  //         transition.current,
  //         current * buttonWidth,
  //         next * buttonWidth,
  //       ),
  //     },
  //   ]
  // }, [state, transition])

  return (
    <View style={styles.root}>
      <View style={styles.container}>
        <Canvas style={StyleSheet.absoluteFill}>
          {/* <Group transform={transform}>
            <RoundedRect x={0} y={0} height={40} width={buttonWidth} r={16}>
              <LinearGradient
                colors={['#009095', '#008e47']}
                start={vec(0, 0)}
                end={vec(buttonWidth, 40)}
              />
            </RoundedRect>
          </Group> */}
        </Canvas>

        {graphs.map((graph, index) => (
          <TouchableWithoutFeedback
            key={index}
            onPress={() => {
              onPressItem(graph)

              // state.current = { current: state.current.next, next: index }
              // transition.current = 0

              // runTiming(transition, 1, {
              //   duration: getDuration(
              //     state.current.current,
              //     state.current.next,
              //   ),
              //   easing: Easing.inOut(Easing.cubic),
              // })
            }}
          >
            <View style={styles.button}>
              <Text style={styles.label}>{graph.label}</Text>
            </View>
          </TouchableWithoutFeedback>
        ))}
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  root: {
    paddingTop: 12,
    alignItems: 'center',
  },
  container: {
    backgroundColor: '#272636',
    borderRadius: 16,
    flexDirection: 'row',
  },
  button: {
    height: 40,
    width: buttonWidth,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
  },
  label: {
    fontFamily: 'Helvetica',
    fontSize: 12,
    color: 'white',
    textAlign: 'center',
  },
})
