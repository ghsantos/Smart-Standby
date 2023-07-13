import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'

dayjs.locale('pt-br')
// import { getDate } from '../../utils'

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

  const dayTime = dayjs(time)

  return (
    <View style={styles.container}>
      <Text style={styles.time}>{dayTime.format('HH:mm')}</Text>
      <Text style={styles.date}>
        {`${dayTime.format('dddd, D')} de ${dayTime.format('MMMM')}`}
      </Text>
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
