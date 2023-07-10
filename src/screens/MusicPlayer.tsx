/**
 * Monitor App
 * https://github.com/ghsantos/Monitor
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'

import Player from '../components/Player'
import FullScreenPlayer from '../components/Player/FullScreenPlayer'

function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.root}>
      <SafeAreaView style={styles.background}>
        <Player renderPlayer={props => <FullScreenPlayer {...props} />} />
      </SafeAreaView>
    </GestureHandlerRootView>
  )
}

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  background: {
    backgroundColor: '#080B12',
    flex: 1,
  },
})

export default App
