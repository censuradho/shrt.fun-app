import { api } from "..";
import type { CreateUrlRequestPayload, FindManyLinksQueries, FindManyUrlPaginated } from "./types";

function findManyPaginated (queries: FindManyLinksQueries) {
  return api.get<FindManyUrlPaginated>('/url', {
    params: queries
  })
}

function create (payload: CreateUrlRequestPayload) {
  return api.post<{ shortUrl: string }>('/url', payload)
}

function toggleIsActive (id: string) {
  return api.patch(`/url/${id}/active`)
}

export const urlService = {
  findManyPaginated,
  create,
  toggleIsActive
}