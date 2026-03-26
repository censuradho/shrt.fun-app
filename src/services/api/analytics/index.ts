import { api } from "..";
import type { FindHistCountByLocationResponse } from "./types";

export async function findHistCountByLocation (id: string) {
  const { data } = await api.get<FindHistCountByLocationResponse>(`/analytics/hits/url/${id}/locations`);
  return data
}

export const analyticsService = {
  findHistCountByLocation
}