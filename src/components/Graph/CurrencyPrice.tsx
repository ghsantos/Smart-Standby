import React from 'react'
import { StyleSheet, Text, View } from 'react-native'

function CurrencyPrice({ title, value, variation }): JSX.Element {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>
        {title} R$ {value}
      </Text>
      <Text style={styles.variation}>{variation}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    marginBottom: 12,
    paddingRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#eee',
  },
  price: {
    fontSize: 19,
    fontWeight: '600',
    color: '#eee',
  },
  variation: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ccc',
  },
})

export default CurrencyPrice
