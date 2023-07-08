import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native'
import Icon from 'react-native-vector-icons/Ionicons'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated'

import { PlayerRenderProps } from '.'
import { formatTime } from '../../utils'

function FullScreenPlayer({
  isConnected,
  trackState,
  playbackProgress,
  coverImage,
  onPressPlayPause,
  onPressPrev,
  onPressNext,
}: PlayerRenderProps): JSX.Element {
  const sharedPercentage = useSharedValue(0)

  const progressStyle = useAnimatedStyle(() => {
    return {
      height: '100%',
      width: `${sharedPercentage.value}%`,
      backgroundColor: '#fff',
    }
  })

  useEffect(() => {
    sharedPercentage.value = playbackProgress.progressPercent
  }, [playbackProgress, sharedPercentage])

  return (
    <View style={styles.container}>
      {isConnected && (
        <>
          <View style={styles.coverContainer}>
            <View style={{ width: 270, height: 270 }}>
              {!!coverImage && (
                <Image
                  source={{ uri: coverImage }}
                  style={styles.coverImage}
                  resizeMode="stretch"
                />
              )}
            </View>
          </View>
          <View style={styles.trackContainer}>
            <View style={{ height: 60 }} />

            <View style={styles.titleContainer}>
              <Text style={styles.title} numberOfLines={1}>
                {trackState.trackTitle}
              </Text>
              <Text style={styles.subTitle} numberOfLines={1}>
                {trackState.artist}
              </Text>
            </View>

            <View style={styles.controls}>
              <TouchableOpacity onPress={onPressPrev}>
                <Icon name="play-skip-back-outline" size={54} color="#eee" />
              </TouchableOpacity>

              <TouchableOpacity onPress={onPressPlayPause}>
                {trackState.isPlaying ? (
                  <Icon name="pause-outline" size={60} color="#eee" />
                ) : (
                  <Icon name="play-outline" size={60} color="#eee" />
                )}
              </TouchableOpacity>
              <TouchableOpacity onPress={onPressNext}>
                <Icon name="play-skip-forward-outline" size={54} color="#eee" />
              </TouchableOpacity>
            </View>

            <View style={styles.playbackContainer}>
              <View style={styles.progressContainer}>
                <Animated.View style={progressStyle} />
              </View>

              <View style={styles.trackTimeContainer}>
                <Text style={styles.trackTime}>
                  {formatTime(playbackProgress.progressSeconds)}
                </Text>
                <Text style={styles.trackTime}>
                  {formatTime(playbackProgress.totalSeconds)}
                </Text>
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  coverContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  coverImage: {
    width: 270,
    height: 270,
    borderRadius: 12,
  },
  trackContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
  },
  titleContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    color: '#eee',
    marginBottom: 8,
  },
  subTitle: {
    fontSize: 14,
    fontWeight: '500',
    color: '#eeeb',
  },
  controls: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    gap: 30,
  },
  playbackContainer: {
    width: '100%',
    paddingHorizontal: 8,
    marginTop: 10,
  },
  progressContainer: {
    width: '100%',
    height: 8,
    backgroundColor: '#aaa9',
    borderRadius: 4,
    overflow: 'hidden',
  },
  trackTimeContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 6,
  },
  trackTime: {
    fontSize: 12,
    fontWeight: '500',
    color: '#eeeb',
  },
})

export default FullScreenPlayer
