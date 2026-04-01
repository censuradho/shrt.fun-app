import { api } from "..";
import type { OffsetPaginationParams } from "../types";
import type { FindHistCountByLocationResponse, FindHitsByCityResponse, FindHitsByCountryResponse, ReferrerDistributionResponse, TopMostAccessedUrlDetailResponse, TopMostAccessedUrlResponse, TopMostAccessedUrlsQuery } from "./types";

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

async function topMostAccessedUrls (params?: TopMostAccessedUrlsQuery) {
  const { data } = await api.get<TopMostAccessedUrlResponse>('/analytics/url/ranking', {
    params
  })
  return data
}

async function topMostAccessedUrlsDetail (params?: TopMostAccessedUrlsQuery) {
  const { data } = await api.get<TopMostAccessedUrlDetailResponse>('/analytics/url/ranking/details', {
    params
  })
  return data
}

async function referrerDistribution () {
  const { data } = await api.get<ReferrerDistributionResponse>('/analytics/url/referrer-distribution')
  return data
}


export const analyticsService = {
  findHistCountByLocation,
  findHitsByCity,
  findHitsByCountry,
  topMostAccessedUrls,
  topMostAccessedUrlsDetail,
  referrerDistribution
}