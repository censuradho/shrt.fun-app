export interface IApiErrorMessage {
  title?: string
  description: string
}

export interface PaginationParams {
  cursor?: string | null
  limit?: number | null
}

export interface PaginationResult<T> {
  data: T[]
  nextCursor: string | null
}