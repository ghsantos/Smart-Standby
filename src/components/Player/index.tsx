import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { useStringStorage } from '../../hooks/storage'
import { singletonHook } from 'react-singleton-hook'

const PORT = '3000'
const URL = 'http://192.168.31.75'

const socket = io(`${URL}:${PORT}`)

const INITIAL_TRACK_STATE = {
  isPlaying: false,
  artist: '',
  trackTitle: '',
  albumTitle: '',
}

const INITIAL_PLAYBACK_PROGRESS = {
  progressPercent: 0,
  progressSeconds: 0,
  totalSeconds: 0,
}

const INITIAL_SOCKET_STATE = {
  isConnected: false,
  trackState: INITIAL_TRACK_STATE,
  coverImage: '',
  playbackProgress: INITIAL_PLAYBACK_PROGRESS,
}

const useSocketImpl = () => {
  const [isConnected, setIsConnected] = useState(socket.connected)

  const [storageUrl] = useStringStorage('player.url', URL)

  const [trackState, setTrackState] = useState<ITrackState>(INITIAL_TRACK_STATE)
  const [coverImage, setCoverImage] = useState('')
  const [playbackProgress, setPlaybackProgress] = useState<IPlaybackProgress>(
    INITIAL_PLAYBACK_PROGRESS,
  )

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

    socket.on('trackcover', image => {
      if (image.length) {
        console.log('setimage', image.length)

        setCoverImage(image)
      }
    })

    socket.on('playbackprogress', progress => {
      setPlaybackProgress(progress)
    })

    return () => {
      socket.off('connect')
    }
  }, [])

  return {
    isConnected,
    trackState,
    coverImage,
    playbackProgress,
  }
}

const useSocket = singletonHook(INITIAL_SOCKET_STATE, useSocketImpl)

export interface ITrackState {
  isPlaying: boolean
  artist: string
  trackTitle: string
  albumTitle: string
}

export interface IPlaybackProgress {
  progressPercent: number
  progressSeconds: number
  totalSeconds: number
}

export interface PlayerRenderProps {
  initialUrl: string
  isConnected: boolean
  trackState: ITrackState
  playbackProgress: IPlaybackProgress
  coverImage: string
  onPressPlayPause: () => void
  onPressPrev: () => void
  onPressNext: () => void
  onSubmitUrl: (url: string) => void
  onPressReconnect: () => void
}

interface PlayerProps {
  renderPlayer: (props: PlayerRenderProps) => JSX.Element
}

function Player({ renderPlayer }: PlayerProps): JSX.Element {
  const [storageUrl, setStorageUrl] = useStringStorage('player.url', URL)

  const socketState = useSocket()
  const {
    isConnected = true,
    trackState,
    coverImage,
    playbackProgress,
  } = socketState ? socketState : INITIAL_SOCKET_STATE

  const onReconnectUrl = (url: string): void => {
    SystemNavigationBar.navigationHide()

    setStorageUrl(url)
  }

  const onPressPlayPause = (): void => {
    socket.emit('playpause', '')
  }

  const onPressPrev = (): void => {
    socket.emit('prev', '')
  }

  const onPressNext = (): void => {
    socket.emit('next', '')
  }

  const onPressReconnect = (): void => {
    socket.connect()
  }

  return renderPlayer({
    initialUrl: storageUrl,
    isConnected,
    trackState,
    playbackProgress,
    coverImage,
    onPressPlayPause,
    onPressPrev,
    onPressNext,
    onSubmitUrl: onReconnectUrl,
    onPressReconnect,
  })
}

export default Player
