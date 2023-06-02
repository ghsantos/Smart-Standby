import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { forecastCondition } from '../../services/weatherApi'

import WeatherIcon from '../WeatherIcon'

function Forecast({ forecast }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.weekday}>{forecast.weekday}</Text>
      <WeatherIcon
        name={forecastCondition[forecast.condition]}
        size={34}
        color="#eee"
      />
      <Text style={styles.max}>{forecast.max}°</Text>
      <Text style={styles.min}>{forecast.min}°</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    alignItems: 'center',
    marginHorizontal: 8,
  },
  max: {
    fontSize: 21,
    fontWeight: '400',
    color: '#eee',
    textAlign: 'center',
    marginVertical: 2,
  },
  weekday: {
    fontSize: 15,
    fontWeight: '400',
    color: '#eee',
    textAlign: 'center',
    marginBottom: 6,
  },
  min: {
    fontSize: 17,
    fontWeight: '400',
    color: '#eee',
    textAlign: 'center',
  },
})

export default Forecast
