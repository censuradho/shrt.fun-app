import { api } from "..";

export async function findHistCountByLocation (id: string) {
  const { data } = await api.get(`/analytics/hits/url/${id}/locations`);
  return data
}

export const analyticsService = {
  findHistCountByLocation
}