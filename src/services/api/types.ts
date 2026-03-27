export interface IApiErrorMessage {
  title?: string
  description: string
}

export interface CursorPaginationParams {
  cursor?: string | null
  limit?: number | null
}

export interface CursorPaginationResult<T> {
  data: T[]
  nextCursor: string | null
}

export interface OffsetPaginationParams {
  offset?: number
  limit?: number
}

export interface OffsetPaginationResult<T> {
  data: T[]
  total: number
}
