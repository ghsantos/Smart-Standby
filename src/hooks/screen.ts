import { useEffect, useState } from 'react'
import { Dimensions } from 'react-native'

export function useScreenDimensions() {
  const [{ width, height }, setDimensions] = useState({
    ...Dimensions.get('screen'),
  })

  useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ screen }) => {
      setDimensions(screen)
    })
    return () => subscription?.remove()
  })

  return { width, height }
}
