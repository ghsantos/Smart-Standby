import React, { useState, useEffect } from 'react'
import {
  StyleSheet,
  Text,
  TextInput,
  View,
  TouchableOpacity,
} from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import io from 'socket.io-client'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { useStringStorage } from '../../hooks/storage'

const PORT = '3000'
const URL = 'http://192.168.31.75'

const socket = io(`${URL}:${PORT}`)

function Player(): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [isEditing, setIsEditing] = useState(false)

  const [storageUrl, setStorageUrl] = useStringStorage('player.url', URL)
  const [url, setUrl] = useState(storageUrl)

  const [trackState, setTrackState] = useState({
    isPlaying: false,
    artist: '',
    trackTitle: '',
    albumTitle: '',
  })

  const onReconnectUrl = () => {
    setIsEditing(false)
    SystemNavigationBar.navigationHide()

    setStorageUrl(url)
  }

  useEffect(() => {
    socket.io.uri = `${storageUrl}:${PORT}`

    socket.disconnect().connect()
  }, [storageUrl])

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true)
    })

    socket.on('disconnect', () => {
      setIsConnected(false)
    })

    socket.on('trackstate', track => {
      setTrackState(track)
    })

    return () => {
      socket.off('connect')
    }
  }, [])

  return (
    <View style={styles.container}>
      {isConnected && (
        <>
          <Text style={styles.title} numberOfLines={1}>
            {trackState.trackTitle}
          </Text>
          <View style={styles.controls}>
            <TouchableOpacity onPress={() => socket.emit('prev', '')}>
              <Icon name="play-skip-back-outline" size={54} color="#eee" />
            </TouchableOpacity>

            <TouchableOpacity onPress={() => socket.emit('playpause', '')}>
              {trackState.isPlaying ? (
                <Icon name="pause-outline" size={54} color="#eee" />
              ) : (
                <Icon name="play-outline" size={54} color="#eee" />
              )}
            </TouchableOpacity>
            <TouchableOpacity onPress={() => socket.emit('next', '')}>
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
              onSubmitEditing={onReconnectUrl}
            />
          ) : (
            <Text style={styles.title}>No connection available</Text>
          )}

          <View style={styles.controls}>
            <TouchableOpacity onPress={() => setIsEditing(!isEditing)}>
              <Icon name="ios-create-outline" size={40} color="#eee" />
            </TouchableOpacity>
            <TouchableOpacity onPress={() => socket.connect()}>
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

export default Player
