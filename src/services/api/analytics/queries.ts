import { useQuery } from "@tanstack/react-query";
import { analyticsService } from ".";
import type { FindLocationHitsPaginationParamsDto } from "../dtos";

export function useFindHistCountByLocationQuery (urlId: string) {
  return useQuery({
    queryKey: ["analytics", "hits", "url", urlId, "locations"],
    queryFn: analyticsService.findHistCountByLocation.bind(null, urlId)
  })
}

export function useFindLocationHitsQuery (params: FindLocationHitsPaginationParamsDto) {
  return useQuery({
    queryKey: ['analytics', 'hits', 'location', 'url'],
    queryFn: () => analyticsService.findLocationHits(params)
  })
}