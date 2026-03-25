import type { PaginationParams, PaginationResult } from "../types";

export interface FindManyLinksQueries extends PaginationParams {
  isActive?: boolean
  search?: string
}


export interface CreateUrlRequestPayload {
  url: string
  slug?: string | null
}

export interface UrlNode {
  id: string
  originalUrl: string
  shortUrl: string
  hitsCount: number
  isActive: boolean
  description?: string
  expireAt?: string
  createdAt: string
  updatedAt: string
}

export type FindManyUrlPaginated = PaginationResult<UrlNode>