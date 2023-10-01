import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import dayjs from 'dayjs'
import 'dayjs/locale/pt-br'
import { useTime } from '../../hooks/time'

dayjs.locale('pt-br')

function Clock(): JSX.Element {
  const time = useTime()

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
