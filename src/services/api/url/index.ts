import { api } from "..";
import type { CreateUrlRequestPayload, FindManyLinksQueries } from "./types";

function findManyPaginated (queries: FindManyLinksQueries) {
  return api.get('/url', {
    params: queries
  })
}

function create (payload: CreateUrlRequestPayload) {
  return api.post<{ shortUrl: string }>('/url', payload)
}

export const urlService = {
  findManyPaginated,
  create
}