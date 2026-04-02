import { CopyButton } from "@/components/CopyButton"
import { Icon } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { formatDate } from "@/lib/date"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { getDomain, getLinkFavicon } from "@/utils/getDomain"
import type { UrlNode } from "@/services/api/url/types"
import { Skeleton } from "@/components/ui/skeleton"

interface LinkInfoSectionProps {
  data?: UrlNode
  loading?: boolean
}

export function LinkInfoSection ({ data, loading }: LinkInfoSectionProps) {

  if (loading) return (
    <div className="bg-card rounded-md p-4 mt-6 flex flex-col md:grid md:grid-cols-[64px_1fr_auto] gap-4 h-[242px] md:h-[162px]">
      <Skeleton className="size-[64px] rounded-full"/>
      <div className="flex flex-col gap-2">
        <Skeleton className="h-[32px] w-full rounded-xl" />
        <Skeleton className="h-[20px] w-[80%]" />
        <Skeleton className="h-[20px] w-[80%" />
      </div>
    </div>
  )
  if (!data) return null

  return (
    <section className="bg-card rounded-md p-4 mt-6 flex flex-col gap-4">
      <div className="grid md:grid-cols-[64px_1fr_auto] gap-4">
        <Avatar size="xl" className="rounded-sm">
          <AvatarImage
            src={getLinkFavicon(data.originalUrl, 64)}
            alt=""
          />
          <AvatarFallback className="rounded-sm text-xs">
            {getDomain(data.originalUrl).charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="col-span-2">
          <h1 className="text-2xl">{data.title ? data.title : getDomain(data.originalUrl) + ' - Sem título'}</h1>
          <div className="grid grid-cols-[auto_1fr] items-center gap-2">
            <a
              href={data.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-sm hover:underline truncate"
            >
              {data.shortUrl.replace(/^https?:\/\//, '')}
            </a>
            <CopyButton onClick={() => copyToClipboard(data.shortUrl)} />
          </div>
          <div className="grid grid-cols-[auto_1fr] items-center gap-1 text-muted-foreground min-w-0">
            <Icon name="CornerDownRight" size={14} className="shrink-0" />
            <a
              href={data.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline truncate"
            >
              {data.originalUrl}
            </a>
          </div>
        </div>
      </div>
      <hr className="w-full border-outline border cols-span-3" />
      <div className="flex justify-end">
        <span className="text-sm">
          {formatDate(data.createdAt, {
            hour: 'numeric',
            minute: 'numeric',
          })}
        </span>
      </div>
    </section>
  )
}
