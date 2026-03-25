import { useDebounceCallback } from "@/hooks/useDebounceCallback";
import { useIntersectionObserver } from "@/hooks/useIntersectObserver";
import { useFindManyUrlPaginated } from "@/services/api/url/queries";
import type { FindManyLinksQueries } from "@/services/api/url/types";
import { urlValidation } from "@/utils/validations";
import { useEffect, useRef, useState } from "react";

export function useLinkListViewModel () {
  const [urlSelected, setUrlSelected] = useState<string[]>([])
  const [search, setSearch] = useState('')
  const [queries, setQueries] = useState<FindManyLinksQueries>({})

  const isSearchValid = !search || urlValidation(search)

  const {
    data: links,
    isPending,
    error,
    fetchNextPage,
    isFetched,
  } = useFindManyUrlPaginated(queries)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const lastPage = links?.pages[links.pages.length - 1]
  const hasNextPage = lastPage ? lastPage.data.nextCursor : false

  const isEmpty = links?.pages[0].data.data.length === 0

  const observer = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) fetchNextPage()
  }, { threshold: 1 })

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    observer.observe(node)
    return () => observer.unobserve(node)
  }, [observer])

  const handleChangeQueries = <T extends FindManyLinksQueries, K extends keyof T>(
    key: K, 
    value: T[K]
  ) => {
    if (!value) return setQueries(prev => {
      return Object
        .fromEntries(
          Object
            .entries(prev)
            .filter(([k]) => k !== key)
        ) as T
    })

    setQueries(prev => ({ ...prev, [key]: value }))
  }

  const toggleUrlSelected = (id: string) => {
    setUrlSelected(prev => {
      if (prev.includes(id)) {
        return prev.filter(urlId => urlId !== id)
      } 
      return [...prev, id]
    })
  }

  const handleSelectAllLinks = () => {
    if (!links) return
    const allLinkIds = links.pages.flatMap(page => page.data.map(link => link.id))
    setUrlSelected(allLinkIds)
  }

  useDebounceCallback(() => {
    if (!isSearchValid) return;

    handleChangeQueries('search', search)
  }, 500)
  
  return {
    links,
    error,
    handleChangeQueries,
    toggleUrlSelected,
    urlSelected,
    sentinelRef,
    handleSelectAllLinks,
    hasNextPage,
    setSearch,
    search,
    isFetched,
    isEmpty,
    isPending,
    isSearchValid
  }
}