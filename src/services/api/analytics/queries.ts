import { useQuery } from "@tanstack/react-query";
import { analyticsService } from ".";
import type { OffsetPaginationParams } from "../types";
import type { TopMostAccessedUrlsQuery } from "./types";

export function useFindHistCountByLocationQuery (urlId: string) {
  return useQuery({
    queryKey: ["analytics", "hits", "url", urlId, "locations"],
    queryFn: analyticsService.findHistCountByLocation.bind(null, urlId)
  })
}


export function useFindHitsByCityQuery (params?: OffsetPaginationParams, enabled?: boolean) {
  return useQuery({
    queryKey: ['analytics', 'hits', 'city', params],
    queryFn: () => analyticsService.findHitsByCity(params),
    enabled
  })
}

export function useFindHitsByCountryQuery (params?: OffsetPaginationParams, enabled?: boolean) {
  return useQuery({
    queryKey: ['analytics', 'hits', 'country', params],
    queryFn: () => analyticsService.findHitsByCountry(params),
    enabled
  })
}

export function useTopMostAccessedUrlsQuery (params?: TopMostAccessedUrlsQuery) {
  return useQuery({
    queryKey: ['analytics', 'url', 'ranking', params],
    queryFn: () => analyticsService.topMostAccessedUrls(params)
  })
}

export function useTopMostAccessedUrlsDetailQuery (params?: TopMostAccessedUrlsQuery) {
  return useQuery({
    queryKey: ['analytics', 'url', 'ranking', 'detail', params],
    queryFn: () => analyticsService.topMostAccessedUrlsDetail(params)
  })
}

export function useReferrerDistributionQuery () {
  return useQuery({
    queryKey: ['analytics', 'url', 'referrer-distribution'],
    queryFn: analyticsService.referrerDistribution
  })
}