import { useEffect, useState } from 'react'

export function useTime() {
  const [time, setTime] = useState(new Date())

  useEffect(() => {
    const interval = setInterval(() => {
      const date = new Date()
      setTime(date)
    }, 1000)

    return function cleanup() {
      clearInterval(interval)
    }
  }, [])

  return time
}
