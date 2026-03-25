import { api } from "..";
import type { FindManyLinksQueries } from "./types";

function findManyPaginated (queries: FindManyLinksQueries) {
  return api.get('/url', {
    params: queries
  })
}

export const urlService = {
  findManyPaginated
}