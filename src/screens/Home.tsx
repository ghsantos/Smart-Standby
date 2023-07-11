/**
 * Monitor App
 * https://github.com/ghsantos/Monitor
 *
 * @format
 */

import React, { useState, useEffect } from 'react'
import {
  Dimensions,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native'
import SystemNavigationBar from 'react-native-system-navigation-bar'

import Clock from '../components/Clock'
import Player from '../components/Player'
import Graph from '../components/Graph'
import Weather from '../components/Weather'
import SmallPlayer from '../components/Player/SmallPlayer'

const windowWidth = Dimensions.get('window').width
const windowHeight = Dimensions.get('window').height

function App(): JSX.Element {
  SystemNavigationBar.navigationHide()
  console.log(windowWidth)

  const [isLandscape, setIsLandscape] = useState(windowWidth > windowHeight)

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setIsLandscape(window.width > window.height)
    })
    return () => subscription?.remove()
  })

  return (
    <SafeAreaView style={styles.root}>
      <StatusBar translucent={true} hidden={true} />
      {isLandscape ? (
        <View style={styles.landscapeContainer}>
          <Weather />
          <View style={styles.landscapeCenter}>
            <Clock />
            <Player renderPlayer={props => <SmallPlayer {...props} />} />
          </View>
          <Graph />
        </View>
      ) : (
        <View style={styles.portraitContainer}>
          <Clock />
          <View style={styles.graphContainer}>
            <Graph />
          </View>
          <Player renderPlayer={props => <SmallPlayer {...props} />} />
        </View>
      )}
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  root: {
    backgroundColor: '#080B12',
    flex: 1,
  },
  landscapeContainer: {
    flex: 1,
    flexDirection: 'row',
  },
  landscapeCenter: {
    flex: 1,
  },
  portraitContainer: {
    flex: 1,
    flexDirection: 'column',
  },
  graphContainer: {
    flex: 4,
  },
})

export default App
