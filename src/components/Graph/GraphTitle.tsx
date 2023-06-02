import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'

function GraphTitle({ coins, selectedCoin, usdValue, brlValue, variation, onPressCoin }): JSX.Element {
  return (
    <View style={styles.container}>
      <View style={styles.coinsContainer}>
        {coins.map(item => (
          <TouchableOpacity
            key={item.id}
            onPress={() => onPressCoin(item)}
            style={[
              styles.coinButton,
              {
                borderColor:
                  item.id === selectedCoin.id ? '#fff' : 'transparent',
              },
            ]}>
            <Text style={styles.title}>{item.name}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={styles.priceContainer}>
        <Text style={styles.price}>
          ${usdValue?.toFixed(usdValue > 10 ? 1 : 6)}
        </Text>
        <Text style={styles.price}>
          R${brlValue?.toFixed(brlValue > 10 ? 1 : 5)}
        </Text>
      </View>
      <Text style={styles.variation}>{variation?.toFixed(2)}%</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    width: '100%',
    justifyContent: 'center',
    alignContent: 'center',
    marginBottom: 8,
  },
  coinsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  coinButton: {
    paddingVertical: 2,
    paddingHorizontal: 6,
    borderColor: '#fff',
    borderWidth: 2,
    borderRadius: 10,
  },
  priceContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 4,
  },
  title: {
    fontSize: 17,
    fontWeight: '500',
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

export default GraphTitle
