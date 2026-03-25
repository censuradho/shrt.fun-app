import { useEffect, useState } from "react"

/**
 * Retorna o valor apenas após o tempo de debounce.
 * @param value Valor a ser "debounced"
 * @param delay Tempo em ms
 */
export function useDebounce<T>(value: T, delay: number = 500, callback?: () => void): T {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value)
      callback?.();

    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [value, delay])

  return debouncedValue
}