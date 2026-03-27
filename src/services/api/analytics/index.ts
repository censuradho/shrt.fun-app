import { api } from "..";
import type { OffsetPaginationParams } from "../types";
import type { FindHistCountByLocationResponse, FindHitsByCityResponse, FindHitsByCountryResponse } from "./types";

async function findHistCountByLocation (id: string) {
  const { data } = await api.get<FindHistCountByLocationResponse>(`/analytics/locations/hits/url/${id}`);
  return data
}


async function findHitsByCity (params?: OffsetPaginationParams) {
  const { data } = await api.get<FindHitsByCityResponse>('/analytics/locations/hits/cities', {
    params
  })

  return data
}

async function findHitsByCountry (params?: OffsetPaginationParams) {
  const { data } = await api.get<FindHitsByCountryResponse>('/analytics/locations/hits/countries', {
    params
  })

  return data
}


export const analyticsService = {
  findHistCountByLocation,
  findHitsByCity,
  findHitsByCountry
}