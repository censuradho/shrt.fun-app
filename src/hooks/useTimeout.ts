import { useCallback, useEffect, useRef } from "react"

export function useTimeout (callback: () => void, delay: number) {
  const timeoutRef = useRef<number | null>(null)

  const set = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      callback()
    }, delay)
  }, [callback, delay])

  const clear = useCallback(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
  }, [])

  useEffect(() => {
    set()

    return () => {
      clear()
    }
  }, [set, clear])

  return { set, clear }
}