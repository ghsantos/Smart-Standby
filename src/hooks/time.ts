import { useEffect, useState } from 'react'

export function useTime(msInterval = 1000) {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setTime(date)
    }, msInterval)

    return function cleanup() {
      clearInterval(interval)
    }
  }, [msInterval])

  return time
}
