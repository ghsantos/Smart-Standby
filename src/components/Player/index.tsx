import { useState, useEffect } from 'react'
import io from 'socket.io-client'
import SystemNavigationBar from 'react-native-system-navigation-bar'
import { useStringStorage } from '../../hooks/storage'

const PORT = '3000'
const URL = 'http://192.168.31.75'

const socket = io(`${URL}:${PORT}`)

export interface ITrackState {
  isPlaying: boolean
  artist: string
  trackTitle: string
  albumTitle: string
}

export interface PlayerRenderProps {
  initialUrl: string
  isConnected: boolean
  trackState: ITrackState
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
  const [isConnected, setIsConnected] = useState(socket.connected)

  const [storageUrl, setStorageUrl] = useStringStorage('player.url', URL)

  const [trackState, setTrackState] = useState<ITrackState>({
    isPlaying: false,
    artist: '',
    trackTitle: '',
    albumTitle: '',
  })

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

  return renderPlayer({
    initialUrl: storageUrl,
    isConnected,
    trackState,
    onPressPlayPause,
    onPressPrev,
    onPressNext,
    onSubmitUrl: onReconnectUrl,
    onPressReconnect,
  })
}

export default Player
