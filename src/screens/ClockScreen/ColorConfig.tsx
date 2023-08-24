import React, { useRef } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import ColorPicker, {
  Panel1,
  Swatches,
  OpacitySlider,
  HueSlider,
  colorKit,
  PreviewText,
} from 'reanimated-color-picker'

export default function ColorConfig() {
  const customSwatches = new Array(6)
    .fill('#fff')
    .map(() => colorKit.randomRgbColor().hex())

  const selectedColor = useSharedValue(customSwatches[0])
  const backgroundColorStyle = useAnimatedStyle(() => ({
    backgroundColor: selectedColor.value,
  }))

  const onColorSelect = color => {
    selectedColor.value = color.hex
  }

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.animatedContainer]}>
        <View style={styles.pickerContainer}>
          <ColorPicker
            value={selectedColor.value}
            sliderThickness={25}
            thumbSize={24}
            thumbShape="circle"
            onChange={onColorSelect}
            boundedThumb
          >
            <Panel1 style={styles.panelStyle} />
            <HueSlider style={styles.sliderStyle} />
            <OpacitySlider style={styles.sliderStyle} />
            <Swatches
              style={styles.swatchesContainer}
              swatchStyle={styles.swatchStyle}
              colors={customSwatches}
            />
            <View style={styles.previewTxtContainer}>
              <PreviewText style={{ color: '#707070' }} />
            </View>
          </ColorPicker>
        </View>
      </Animated.View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 4,
    // backgroundColor: '#f00',
    paddingHorizontal: 4,
    paddingVertical: 10,
  },
  animatedContainer: {
    flex: 1,
  },
  pickerContainer: {
    // alignSelf: 'center',
    // width: 300,
    // backgroundColor: '#fff',
    // padding: 8,
    borderRadius: 20,
    // shadowColor: '#000',
    // shadowOffset: {
    //   width: 0,
    //   height: 5,
    // },
    // shadowOpacity: 0.34,
    // shadowRadius: 6.27,

    // elevation: 10,
  },
  panelStyle: {
    // flex: 1,
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
    marginTop: 20,

    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,

    elevation: 5,
  },
  previewTxtContainer: {
    marginTop: 20,
  },
  swatchesContainer: {
    marginTop: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
    flexWrap: 'nowrap',
    // gap: 8,
  },
  swatchStyle: {
    borderRadius: 20,
    height: 30,
    width: 30,
    margin: 0,
    marginBottom: 0,
    marginHorizontal: 0,
    marginVertical: 0,
  },
})
