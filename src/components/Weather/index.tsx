import React, { useState, useEffect } from 'react'
import { ScrollView, StyleSheet, Text, View } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'

import { fetchWeather, weatherConditions } from '../../services/weatherApi'
import Forecast from './Forecast'
import WeatherIcon from '../WeatherIcon'

function Weather(): JSX.Element {
  const [weather, setWeather] = useState(null)

  const fetchData = async () => {
    try {
      const data = await fetchWeather()

      // console.log('data.forecast', data)
      setWeather({ ...data, forecast: data.forecast.slice(1) })
    } catch (error) {
      console.log('error', error)
    }
  }

  useEffect(() => {
    fetchData()

    const interval = setInterval(() => {
      fetchData()
    }, 1000 * 60 * 5)

    return function cleanup() {
      clearInterval(interval)
    }
  }, [])

  return (
    <View style={styles.container}>
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={styles.temp}>{weather?.temp}°</Text>

        <View style={styles.conditionContainer}>
          <WeatherIcon
            name={weatherConditions[weather?.condition_code]?.icon ?? 'wi-na'}
            size={40}
            color="#eee"
          />
          <Text style={styles.text}>{weather?.description}</Text>
        </View>

        <View style={styles.variationContainer}>
          <Icon name="arrow-up-outline" size={24} color="#eee" />
          <Text style={styles.text}>{weather?.forecast[0].max}°</Text>

          <Icon name="arrow-down-outline" size={24} color="#eee" />
          <Text style={styles.text}>{weather?.forecast[0].min}°</Text>
        </View>
        {/* <Text style={styles.text}>{weather?.forecast[0].max} max, {weather?.forecast[0].min} mim</Text> */}
        {/* <Text style={styles.text}>{weather?.forecast[0].rain_probability}% de chuva</Text> */}
      </View>
      <View style={styles.forecastContainer}>
        <ScrollView horizontal>
          <View style={styles.forecastItems}>
            {weather?.forecast.map(item => (
              <Forecast key={item.date} forecast={item} />
            ))}
          </View>
        </ScrollView>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  temp: {
    fontSize: 66,
    fontWeight: '400',
    color: '#eee',
    textAlign: 'center',
  },
  conditionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  variationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 19,
    fontWeight: '500',
    color: '#eee',
    textAlign: 'center',
  },
  forecastContainer: {
    marginBottom: 10,
  },
  forecastItems: {
    flexDirection: 'row',
  },
})

export default Weather
