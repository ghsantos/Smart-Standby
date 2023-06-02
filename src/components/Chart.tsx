import React from 'react'
import { StyleSheet, View } from 'react-native'

import { LineChart } from 'react-native-chart-kit'

function Chart(): JSX.Element {
  return (
    <View style={styles.container}>
      <LineChart
        data={{
          labels: ['Jan', 'Feb', 'Mar', 'Apr'],
          datasets: [
            {
              data: [
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
                Math.random() * 100,
              ],
            },
          ],
        }}
        width={260} // from react-native
        height={220}
        yAxisLabel={''}
        chartConfig={{
          backgroundColor: '#1cc910',
          backgroundGradientFrom: '#151515', //#eff3ff',
          backgroundGradientTo: '#151515',
          decimalPlaces: 2, // optional, defaults to 2dp
          color: (opacity = 255) => `rgba(244, 244, 244, ${opacity})`,
          style: {
            borderRadius: 16,
          },
          propsForVerticalLabels: {
            fill: '#eee',
          },
          propsForHorizontalLabels: {
            fill: '#eee',
          },
          // propsForDots: {
          //   r: '0',
          // },
        }}
        withDots={false}
        // withInnerLines={false}
        withOuterLines={false}
        withVerticalLines={false}
        bezier
        withHorizontalLabels={true}
        style={{
          marginVertical: 8,
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
})

export default Chart
