import { useEffect } from "react";

/**
 * Retorna o valor apenas após o tempo de debounce.
 * @param value Valor a ser "debounced"
 * @param delay Tempo em ms
 */
export function useDebounceCallback(callback?: () => void, delay: number = 500) {

  useEffect(() => {
    const handler = setTimeout(() => {
      callback?.();

    }, delay)

    return () => {
      clearTimeout(handler)
    }
  }, [delay, callback])
}