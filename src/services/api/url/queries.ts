import { useInfiniteQuery, useMutation, useQueryClient, type InfiniteData } from "@tanstack/react-query";
import type { AxiosResponse } from "axios";
import { urlService } from ".";
import type { FindManyLinksQueries, FindManyUrlPaginated, UrlNode } from "./types";
import { toastifyApiErrorMessage } from "../toastifyApiErrorMessage";

type LinksCache = InfiniteData<AxiosResponse<FindManyUrlPaginated>>

function toggleLinkInCache(old: LinksCache | undefined, id: string): LinksCache | undefined {
  if (!old) return old
  return {
    ...old,
    pages: old.pages.map(page => ({
      ...page,
      data: {
        ...page.data,
        data: page.data.data.map((link: UrlNode) =>
          link.id === id ? { ...link, isActive: !link.isActive } : link
        )
      }
    }))
  }
}

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

export function useToggleLinkIsActiveMutation () {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: urlService.toggleIsActive,
    mutationKey: ['toggle-link-is-active'],
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ['links'] })

      const snapshots = queryClient.getQueriesData<LinksCache>({ queryKey: ['links'] })

      queryClient.setQueriesData<LinksCache>(
        { queryKey: ['links'] },
        (old) => toggleLinkInCache(old, id)
      )

      return { snapshots }
    },
    onError: (error, _, context) => {
      context?.snapshots.forEach(([queryKey, data]) => {
        queryClient.setQueryData(queryKey, data)
      })
      toastifyApiErrorMessage(error)
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ['links'] })
    }
  })
}