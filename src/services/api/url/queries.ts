import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { urlService } from ".";
import type { FindManyLinksQueries } from "./types";

export function useFindManyUrlPaginated (queries: FindManyLinksQueries) {
  return useInfiniteQuery({
    queryKey: ['links', queries],
    queryFn: ({ pageParam }) => urlService.findManyPaginated({ ...queries, cursor: pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
  })
}

export function useCreateUrlMutation () {
  return useMutation({
    mutationFn: urlService.create,
    mutationKey: ['create-link']
  })
}