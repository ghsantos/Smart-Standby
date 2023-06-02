import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { LineGraph } from 'react-native-graph'
import { useValue } from '@shopify/react-native-skia'

import { Selection } from './Selection'
import GraphTitle from './GraphTitle'
import CurrencyPrice from './CurrencyPrice'
import { fetchCoinPrice, fetchCoinHistory } from '../../services/cryptoApi'
import { fetchCurrencyPrice } from '../../services/currencyApi'

// const POINT_COUNT = 70
// const POINTS = generateRandomGraphData(30)

const graphs = [
  {
    label: '1D',
    value: 0,
    days: 1,
  },
  {
    label: '1S',
    value: 1,
    days: 7,
  },
  {
    label: '1M',
    value: 2,
    days: 30,
  },
  {
    label: '1Y',
    value: 3,
    days: 365,
  },
  {
    label: 'All',
    value: 4,
    days: 365 * 6,
  },
]

const AxisLabel = ({ text = '', position }) => {
  // const x =
  //       (INDEX_OF_YOUR_MAX_OR_MIN_VALUE / LENGTH_OF_YOUR_POINTS_ARRAY) *
  //       GRAPH_WIDTH;

  return (
    <View
      style={{
        // backgroundColor: '#f0f',
        width: 50,
        transform: [{ translateX: Math.max(position - 32, 5) }],
      }}>
      <Text style={{ fontSize: 12, color: '#fff' }}>${text}</Text>
    </View>
  )
}

const TopAxisLabel = ({ points }) => {
  const max = points.reduce((a,b,i) => a[0].value < b.value ? [b,i] : a, [{ value: Number.MIN_VALUE },-1])
  const x = (max[1] / points.length) * 200 || 0
  // console.log(x, max[0].value)

  return <AxisLabel text={max[0].value.toFixed(5)} position={x} />
}

const BottonAxisLabel = ({ points }) => {
  const min = points.reduce((a,b,i) => a[0].value > b.value ? [b,i] : a, [{ value: Number.MAX_VALUE },-1])
  const x = (min[1] / points.length) * 200 || 0
  // console.log(x, min[0].value)

  return <AxisLabel text={min[0].value.toFixed(5)} position={x} />
}

const COINS = [
  { id: 'klever', name: 'KLV' },
  { id: 'bitcoin', name: 'BTC' },
  { id: 'ethereum', name: 'ETH' },
  { id: 'klever-finance', name: 'KFI' },
]

function Chart(): JSX.Element {
  const [selectedCoin, setSelectedCoin] = useState(COINS[0])
  const [coinPrice, setCoinPrice] = useState({})
  const [currencyPrice, setCurrencyPrice] = useState({})
  const [coinGraphData, setCoinGraphData] = useState([])

  const [selectedGraph, setSelectedGraph] = useState(graphs[0])

  const getCryptoPrice = async (coinId: string) => {
    const price = await fetchCoinPrice(coinId)
    setCoinPrice(price)
  }

  const getCurrencyPrice = async () => {
    const price = await fetchCurrencyPrice('USD', 'BRL')
    setCurrencyPrice(price)
  }

  const fetchGraphData = async (coinId: string, days: number) => {
    console.log('fetchGraphData')
    const data = await fetchCoinHistory(coinId, 'usd', days)
    setCoinGraphData(data)
  }

  useEffect(() => {
    getCryptoPrice(selectedCoin.id)
    getCurrencyPrice()
    fetchGraphData(selectedCoin.id, selectedGraph.days)

    const interval = setInterval(() => {
      getCryptoPrice(selectedCoin.id)
      getCurrencyPrice()
      fetchGraphData(selectedCoin.id, selectedGraph.days)
    }, 1000 * 60 * 2)

    return function cleanup() {
      clearInterval(interval)
    }
  }, [selectedCoin.id, selectedGraph.days])

  // animation value to transition from one graph to the next
  const transition = useValue(0)
  // indicices of the current and next graphs
  const state = useValue({
    next: 0,
    current: 0,
  })

  const showGraph = coinGraphData.length > 0

  return (
    <View style={styles.container}>
      <View style={styles.priceContainer}>
        <CurrencyPrice
          title="Dolar"
          value={currencyPrice?.price || 0}
          variation={currencyPrice?.variation || 0}
        />
        <GraphTitle
          coins={COINS}
          selectedCoin={selectedCoin}
          usdValue={coinPrice?.currentPrice?.usd}
          brlValue={coinPrice?.currentPrice?.brl}
          variation={coinPrice?.priceChange?.c1d}
          onPressCoin={coin => setSelectedCoin(coin)}
        />
      </View>

      <View style={styles.graphContainer}>
        {showGraph && (
          <LineGraph
            points={coinGraphData}
            color="#fff"
            animated={true}
            enablePanGesture={true}
            TopAxisLabel={() => <TopAxisLabel points={coinGraphData} />}
            BottomAxisLabel={() => <BottonAxisLabel points={coinGraphData} />}
            style={{ flex: 1 }}
          />
        )}
      </View>
      <Selection
        state={state}
        transition={transition}
        graphs={graphs}
        onPressItem={item => setSelectedGraph(item)}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  priceContainer: {
    // flex: 1,
    justifyContent: 'space-around',
    marginBottom: 10,
  },
  graphContainer: {
    // width: '100%',
    flex: 1,
  },
})

export default Chart
