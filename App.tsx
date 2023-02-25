/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState, useEffect } from 'react'
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native'

import { Colors } from 'react-native/Libraries/NewAppScreen'

function App(): JSX.Element {
  const isDarkMode = useColorScheme() === 'dark'

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
    flex: 1,
  }

  const [time, setTime] = useState('00:00')

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      // setTime(`${date.getHours()}:${date.getMinutes()}`);
      // setTime(date.toLocaleTimeString('pt-BR').slice(0, -3));
      setTime(date.toLocaleTimeString('pt-BR'))
    }, 1000)

    // setTime('');
    return function cleanup() {
      clearInterval(interval)
    }
  }, [])

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          alignContent: 'center',
        }}>
        <Text style={styles.time}>{time}</Text>
      </View>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  time: {
    fontSize: 90,
    fontWeight: '600',
    color: '#696969',
    textAlign: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
})

export default App
