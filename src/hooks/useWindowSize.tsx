import { useEffect, useState } from "react"

export function useWindowSize () {
  const [size, setSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight
  })

  useEffect(() => {
    const handleResize = () => {
      setSize({
        width: window.innerWidth,
        height: window.innerHeight
      })
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])

  const isMobile = size.width < 640
  const isDesktop = size.width >= 1024
  const isTablet = size.width > 768 && !isDesktop

  return {
    size,
    isTablet,
    isMobile,
    isDesktop
  }
}