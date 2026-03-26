import { useEffect, useRef } from "react"

export function useIntersectionObserver(
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) {
  const callbackRef = useRef(callback)
  callbackRef.current = callback

  const observerRef = useRef<IntersectionObserver | null>(null)

  if (!observerRef.current) {
    observerRef.current = new IntersectionObserver(
      (entries, obs) => callbackRef.current(entries, obs),
      options
    )
  }

  useEffect(() => {
    return () => observerRef.current?.disconnect()
  }, [])

  return observerRef.current
}