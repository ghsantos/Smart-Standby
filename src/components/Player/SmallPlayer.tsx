import React, { useState } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import { PlayerRenderProps } from '.'

function SmallPlayer({
  initialUrl,
  isConnected,
  trackState,
  onPressPlayPause,
  onPressPrev,
  onPressNext,
  onSubmitUrl,
  onPressReconnect,
}: PlayerRenderProps): JSX.Element {
  const [isEditing, setIsEditing] = useState(false)
  const [url, setUrl] = useState(initialUrl)

  const onSubmitEditing = () => {
    setIsEditing(false)

    onSubmitUrl(url)
  }

  return (
    <View style={styles.container}>
      {isConnected && (
        <>
          <Text style={styles.title} numberOfLines={1}>
            {trackState.trackTitle}
          </Text>
          <View style={styles.controls}>
            <TouchableOpacity onPress={onPressPrev}>
              <Icon name="play-skip-back-outline" size={54} color="#eee" />
            </TouchableOpacity>

            <TouchableOpacity onPress={onPressPlayPause}>
              {trackState.isPlaying ? (
                <Icon name="pause-outline" size={54} color="#eee" />
              ) : (
                <Icon name="play-outline" size={54} color="#eee" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressNext}>
              <Icon name="play-skip-forward-outline" size={54} color="#eee" />
            </TouchableOpacity>
          </View>
        </>
      )}

      {!isConnected && (
        <>
          {isEditing ? (
            <TextInput
              value={url}
              onChangeText={setUrl}
              style={styles.input}
              onSubmitEditing={onSubmitEditing}
            />
          ) : (
            <Text style={styles.title}>No connection available</Text>
          )}

          <View style={styles.controls}>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Icon name="ios-create-outline" size={40} color="#eee" />
            </TouchableOpacity>
            <TouchableOpacity onPress={onPressReconnect}>
              <Icon name="ios-refresh" size={40} color="#eee" />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  title: {
    fontSize: 15,
    fontWeight: '500',
    color: '#eee',
    marginBottom: 12,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-end',
    paddingBottom: 16,
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 14,
  },
  input: {
    color: '#000',
    backgroundColor: '#ddd',
    fontSize: 12,
    width: '74%',
    height: 38,
    borderRadius: 4,
    marginBottom: 8,
  },
})

export default SmallPlayer
