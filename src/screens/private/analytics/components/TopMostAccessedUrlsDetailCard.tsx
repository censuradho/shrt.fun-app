import { Select } from "@/components/Select"
import { Skeleton } from "@/components/ui/skeleton"

import { URL_ACTIVE_OPTIONS } from "@/constants/url"
import { useTopMostAccessedUrlsDetailQuery } from "@/services/api/analytics/queries"
import { clearHttp, getDomain } from "@/utils/getDomain"
import { useState } from "react"
import type { BaseCardProps } from "./types"


export function TopMostAccessedUrlsDetailCard ({ className }: BaseCardProps) {
  const [isActive, setIsActive] = useState<string>('true')

  const { 
    data,
    isPending,
    isFetched
  } = useTopMostAccessedUrlsDetailQuery({
    isActive: isActive === '*' ? undefined : isActive === 'true'
  })

  const formatClicks = (hitsCount: number) => {
    if (hitsCount >= 1_000) return (hitsCount / 1_000).toFixed(1) + 'K'
    return hitsCount
  }

  const renderItems = data?.map((item, index) => {
    const city = item.city || "Cidade Desconecida"
    const country = item.country || "País Desconecido"
    const os = item.os || "SO Desconecido"
    const device = item.device || "Dispositivo Desconecido"

    return (
      <li key={index} className="flex flex-col md:flex-row md:items-center bg-popover rounded-md border border-outline px-2 py-4 md:py-1 md:px-2 justify-between gap-2 md:gap-4">
        <div className="flex flex-col flex-1">
          <span className="text-xs text-card-foreground">{item.title || `${getDomain(item.originalUrl)} - Sem título`}</span>
          <strong className="text-xs text-foreground truncate flex-1">{index + 1}. {clearHttp(item.shortUrl)}</strong>
        </div>
        <span className="text-xs text-card-foreground">{`${country} - ${city} (${os} - ${device})`}</span>
        <span className="text-sm text-card-foreground whitespace-nowrap">{formatClicks(item.hitsCount)} cliques</span>
      </li>
    )
  })

  return (
    <section className={`p-4 card w-full flex flex-col gap-8 ${className}`}>
      <div className="flex justify-between items-center">
        <h2 className="text-xxs uppercase">Acessos detalhados por URL</h2>
        <Select 
          options={[
            ...URL_ACTIVE_OPTIONS,
            {
              label: 'Exibindo: Todos',
              value: '*'
            }
          ]}
          value={isActive}
          onValueChange={(value) => setIsActive(value)}
        />
      </div>
      {isFetched && !data?.length && (
        <div className="flex flex-col items-center gap-4 flex-1 justify-center">
          <span className="text-sm text-card-foreground">Nenhum dado disponível</span>
        </div>
      )}
      {isPending && (
        <div className="flex flex-col gap-3.5">
          <Skeleton className="w-full h-[30px] rounded-md" />
          <Skeleton className="w-full h-[30px] rounded-md" />
          <Skeleton className="w-full h-[30px] rounded-md" />
        </div>
      )}
      {!isPending && (
        <ul className="flex flex-col gap-3.5">
          {renderItems}
        </ul>
      )}
    </section>
  )
}