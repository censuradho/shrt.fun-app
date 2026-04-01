import { format } from "date-fns"
import { ptBR  } from "date-fns/locale"

export function formatDate(dateString: string, options?: Intl.DateTimeFormatOptions): string {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
    ...options
  })
}

export function dFormat (date: string | Date, pattern: string) {
  return format(date, pattern, {
    locale: ptBR
  })
}