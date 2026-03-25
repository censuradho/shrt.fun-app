export function useIntersectionObserver (
  callback: IntersectionObserverCallback, 
  options?: IntersectionObserverInit
) {
  const observer = new IntersectionObserver(callback, options)

  const observe = (element: Element) => {
    observer.observe(element)
  }

  const unobserve = (element: Element) => {
    observer.unobserve(element)
  }

  return { observe, unobserve }
}