import { api } from "..";
import type { FindLocationHitsResponse, FindHistCountByLocationResponse } from "./types";

async function findHistCountByLocation (id: string) {
  const { data } = await api.get<FindHistCountByLocationResponse>(`/analytics/locations/hits/url/${id}`);
  return data
}

async function findLocationHits () {
  const { data } = await api.get<FindLocationHitsResponse>('/analytics/locations/hits/url')

  return data
}

export const analyticsService = {
  findHistCountByLocation,
  findLocationHits
}