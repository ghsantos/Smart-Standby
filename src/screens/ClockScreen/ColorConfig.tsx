import React from 'react'
import { StyleSheet, View, useWindowDimensions } from 'react-native'
import Animated, { useSharedValue } from 'react-native-reanimated'

import ColorPicker, {
  Panel1,
  Swatches,
  OpacitySlider,
  HueSlider,
  colorKit,
  Preview,
  returnedResults,
} from 'reanimated-color-picker'

interface ColorConfigProps {
  currentColor: string
  defaultColor: string
}

export default function ColorConfig({
  currentColor,
  defaultColor,
}: ColorConfigProps) {
  const { height, width } = useWindowDimensions()

  const customSwatches = new Array(width < 600 ? 5 : 6)
    .fill('#fff')
    .map(() => colorKit.randomRgbColor().hex())

  customSwatches[0] = currentColor
  customSwatches[1] = defaultColor

  const selectedColor = useSharedValue(currentColor)

  const onColorSelect = (color: returnedResults) => {
    selectedColor.value = color.hex
  }

  const painelHeight = height * 0.47

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer]}>
        <ColorPicker
          value={selectedColor.value}
          sliderThickness={25}
          thumbSize={24}
          thumbShape="circle"
          onChange={onColorSelect}
          boundedThumb
        >
          <View style={styles.pickerContent}>
            <Preview style={styles.previewStyle} />
            <Panel1 style={[styles.panelStyle, { height: painelHeight }]} />
            <HueSlider style={styles.sliderStyle} />
            <OpacitySlider style={styles.sliderStyle} />
            <Swatches
              style={styles.swatchesContainer}
              swatchStyle={styles.swatchStyle}
              colors={customSwatches}
            />
          </View>
        </ColorPicker>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  animatedContainer: {
    flex: 1,
    marginBottom: 12,
  },
  pickerContent: {
    justifyContent: 'space-between',
    height: '100%',
  },
  panelStyle: {
    borderRadius: 16,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  sliderStyle: {
    borderRadius: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  swatchesContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
  previewStyle: {
    height: 38,
    borderRadius: 12,
    width: '99.9%',
  },
})
