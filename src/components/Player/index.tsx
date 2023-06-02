import React, { useState, useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import io from 'socket.io-client'

const socket = io('http://192.168.31.248:3000')

function Player(): JSX.Element {
  const [isConnected, setIsConnected] = useState(socket.connected)
  const [trackState, setTrackState] = useState({
    isPlaying: false,
    artist: '',
    trackTitle: '',
    albumTitle: '',
  })

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
      <Text style={styles.title}>{trackState.trackTitle}</Text>
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
})

export default Player
