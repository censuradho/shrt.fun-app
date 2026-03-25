import { useMutation, useQuery } from "@tanstack/react-query";
import type { FindManyLinksQueries } from "./types";
import { urlService } from ".";

export function useFindManyUrlPaginated (queries: FindManyLinksQueries) {
  return useQuery({
    queryKey: ['links', queries],
    queryFn: () => urlService.findManyPaginated(queries)
  })
}

export function useCreateUrlMutation () {
  return useMutation({
    mutationFn: urlService.create,
    mutationKey: ['create-link']
  })
}