import React, { useRef } from 'react'
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native'

import { FontType } from '../../utils/fonts'

interface FontItemProps {
  font: FontType
  selected: boolean
  onPress: () => void
}

const FontItem = ({ font, selected, onPress }: FontItemProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.touchable,
        { backgroundColor: selected ? '#080B12' : 'transparent' },
      ]}
    >
      <Text
        style={[styles.textItem, { fontFamily: font.family }]}
        adjustsFontSizeToFit
        numberOfLines={1}
      >
        12:34
      </Text>
    </TouchableOpacity>
  )
}

interface FontConfigProps {
  fonts: FontType[]
  selected: string
  onPress: (font: FontType) => void
}

export default function FontConfig({
  fonts,
  selected,
  onPress,
}: FontConfigProps) {
  const listRef = useRef<FlatList>(null)

  // useEffect(() => {
  //   listRef.current?.scrollToIndex({
  //     index: fonts.findIndex(item => item.family === selected) || 0,
  //     animated: true,
  //   })
  // }, [fonts])

  return (
    <View style={styles.container}>
      <FlatList
        ref={listRef}
        data={fonts}
        renderItem={({ item }) => (
          <FontItem
            font={item}
            selected={selected === item.family}
            onPress={() => onPress(item)}
          />
        )}
        keyExtractor={item => item.family}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  touchable: {
    borderRadius: 8,
    marginHorizontal: 10,
    height: 80,
    justifyContent: 'center',
  },
  textItem: {
    color: '#fff',
    fontSize: 40,
    textAlign: 'center',
  },
  container: {
    flex: 1,
  },
})
