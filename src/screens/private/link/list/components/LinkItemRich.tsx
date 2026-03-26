import { CopyButton } from "@/components/CopyButton"
import { IconButton } from "@/components/IconButton"
import { Icon } from "@/components/icons"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { UrlNode } from "@/services/api/url/types"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { LinkMenu, type LinkMenuProps } from "./LinkMenu"

interface LinkItemRichProps {
  data: UrlNode
  selected?: boolean
  onSelect?: (selected: boolean) => void
  menu?: Omit<LinkMenuProps, 'children'>
}

const getDomain = (url: string) =>
  url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))

export function LinkItemRich({ data, selected, onSelect, menu }: LinkItemRichProps) {

  return (
    <div className={cn(
      'bg-card rounded-md p-4 flex gap-4',
      { 'bg-accent': selected }
    )}>
      <Checkbox
        checked={selected}
        onCheckedChange={onSelect}
        className="mt-1 shrink-0 data-unchecked:bg-popover!"
      />

      <div className="grid grid-cols-[1fr] min-w-0 flex-1 gap-2">

        {/* Header row: favicon + title + actions */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Avatar size="sm" className="rounded-sm">
              <AvatarImage
                src={`https://www.google.com/s2/favicons?domain=${getDomain(data.originalUrl)}&sz=32`}
                alt=""
              />
              <AvatarFallback className="rounded-sm text-xs">
                {getDomain(data.originalUrl).charAt(0).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <a
              href={data.originalUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="font-semibold text-base hover:underline truncate"
            >
              {getDomain(data.originalUrl)} - {data.title ? data.title : 'Sem título'}
            </a>
          </div>

          <div className="flex items-center gap-3 shrink-0 text-muted-foreground">
            <IconButton 
              onClick={menu?.onEdit}
              icon={{
                name: 'Pencil',
              }}
            />
            <IconButton 
              onClick={menu?.onShare}
              icon={{
                name: 'Share2'
              }}
            />
            <IconButton 
              onClick={menu?.onViewQrCode}
              icon={{
                name: 'ChartColumn'
              }}
            />
            <LinkMenu {...menu}>
              <IconButton 
                icon={{
                  name: 'Ellipsis'
                }}
              />
            </LinkMenu>
          </div>
        </div>

        {/* Short link */}
        <div className="flex items-center gap-2">
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

        {/* Original URL */}
        <div className="flex items-center gap-1 text-muted-foreground min-w-0">
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

        {/* Footer: hits, date, tags */}
        <div className="flex items-center gap-4 text-xs text-muted-foreground mt-1">
          <span className="flex items-center gap-1">
            <Icon name="MousePointerClick" size={13} />
            Click data
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Calendar" size={13} />
            {formatDate(data.createdAt)}
          </span>
          <span className="flex items-center gap-1">
            <Icon name="Tag" size={13} />
            No tags
          </span>
        </div>

      </div>
    </div>
  )
}
