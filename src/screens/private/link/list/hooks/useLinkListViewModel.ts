import { useIntersectionObserver } from "@/hooks/useIntersectObserver";
import { useFindManyUrlPaginated } from "@/services/api/url/queries";
import type { FindManyLinksQueries } from "@/services/api/url/types";
import { useEffect, useRef, useState } from "react";

export function useLinkListViewModel () {
  const [urlSelected, setUrlSelected] = useState<string[]>([])
  const [queries, setQueries] = useState<FindManyLinksQueries>({})

  const {
    data: links,
    isLoading,
    error,
    fetchNextPage
  } = useFindManyUrlPaginated(queries)

  const sentinelRef = useRef<HTMLDivElement | null>(null)

  const lastPage = links?.pages[links.pages.length - 1]
  const hasNextPage = lastPage ? lastPage.data.nextCursor : false

  const observer = useIntersectionObserver(([entry]) => {
    if (entry.isIntersecting) fetchNextPage()
  }, { threshold: 1 })

  useEffect(() => {
    const node = sentinelRef.current
    if (!node) return
    observer.observe(node)
    return () => observer.unobserve(node)
  }, [observer])

  const handleChangeQueries = <T, K extends keyof T>(
    key: K, 
    value: T[K]
  ) => {
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

  return {
    links,
    isLoading,
    error,
    handleChangeQueries,
    toggleUrlSelected,
    urlSelected,
    sentinelRef,
    handleSelectAllLinks,
    hasNextPage
  }
}