import type { CursorPaginationParams, CursorPaginationResult } from "../types";

export interface FindManyLinksQueries extends CursorPaginationParams {
  isActive?: string
  search?: string
}


export interface CreateUrlRequestPayload {
  url: string
  slug?: string | null
  title?: string | null
}

export interface UrlNode {
  id: string
  originalUrl: string
  shortUrl: string
  hitsCount: number
  isActive: boolean
  title?: string
  description?: string
  expireAt?: string
  createdAt: string
  updatedAt: string
}

export type FindManyUrlPaginated = CursorPaginationResult<UrlNode>