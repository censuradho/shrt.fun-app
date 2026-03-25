import { useInfiniteQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { urlService } from ".";
import type { FindManyLinksQueries } from "./types";
import { toastifyApiErrorMessage } from "../toastifyApiErrorMessage";

export function useFindManyUrlPaginated (queries: FindManyLinksQueries) {
  return useInfiniteQuery({
    queryKey: ['links', queries],
    queryFn: ({ pageParam }) => urlService.findManyPaginated({ ...queries, cursor: pageParam }),
    initialPageParam: null as string | null,
    getNextPageParam: (lastPage) => lastPage.data.nextCursor,
  })
}

export function useCreateUrlMutation () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: urlService.create,
    mutationKey: ['create-link'],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    },
    onError: (error) => {
      toastifyApiErrorMessage(error)
    }
  })
}