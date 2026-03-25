import type { PaginationParams } from "../types";

export interface FindManyLinksQueries extends PaginationParams {
  isActive?: boolean
}


export interface CreateUrlRequestPayload {
  url: string
  slug?: string | null
}