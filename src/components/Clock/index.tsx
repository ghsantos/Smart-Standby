import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'

import { getDate } from '../../utils'

function Clock(): JSX.Element {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setTime(date)
    }, 1000)

    return function cleanup() {
      clearInterval(interval)
    }
  }, [])

  return (
    <View style={styles.container}>
      <Text style={styles.time}>
        {time.toLocaleTimeString('pt-BR').slice(0, -3)}
      </Text>
      <Text style={styles.date}>{getDate(time)}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 2,
    justifyContent: 'center',
    alignContent: 'center',
  },
  time: {
    fontSize: 70,
    fontWeight: '600',
    color: '#eee',
    textAlign: 'center',
  },
  date: {
    fontSize: 19,
    fontWeight: '400',
    color: '#ccc',
    textAlign: 'center',
  },
})

export default Clock
