/**
 * Monitor App
 * https://github.com/ghsantos/Monitor
 *
 * @format
 */

import React from 'react'
import { SafeAreaView, StyleSheet } from 'react-native'

import Player from '../components/Player'
import FullScreenPlayer from '../components/Player/FullScreenPlayer'

function App(): JSX.Element {
  return (
    <SafeAreaView style={styles.background}>
      <Player renderPlayer={props => <FullScreenPlayer {...props} />} />
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  background: {
    backgroundColor: '#080B12',
    flex: 1,
  },
})

export default App
