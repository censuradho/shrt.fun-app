import { useQuery } from "@tanstack/react-query";
import { analyticsService } from ".";

export function useFindHistCountByLocationQuery (urlId: string) {
  return useQuery({
    queryKey: ["analytics", "hits", "url", urlId, "locations"],
    queryFn: analyticsService.findHistCountByLocation.bind(null, urlId)
  })
}