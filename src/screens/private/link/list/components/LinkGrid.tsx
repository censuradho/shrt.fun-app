import { CopyButton } from "@/components/CopyButton"
import { Icon } from "@/components/icons"
import { IconButton } from "@/components/IconButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { UrlNode } from "@/services/api/url/types"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { LinkMenu, type LinkMenuProps } from "./LinkMenu"
import { resolvePath } from "@/utils/resolvePath"
import { paths } from "@/constants/routes"
import { Link } from "react-router"

interface LinkGridProps {
  data: UrlNode
  selected?: boolean
  onSelect?: (selected: boolean) => void
  menu: LinkMenuProps
}

const getDomain = (url: string) =>
  url.replace(/^(https?:\/\/)?(www\.)?/, '').split('/')[0]

const formatDate = (date: string) =>
  new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(date))

export function LinkGrid({ data, selected, onSelect, menu }: LinkGridProps) {
  return (
    <div className={cn(
      'bg-card rounded-md p-4 flex flex-col gap-3',
      { 'bg-accent': selected }
    )}>

      {/* Top row: checkbox + actions */}
      <div className="flex items-center justify-between">
        <Checkbox
          checked={selected}
          onCheckedChange={onSelect}
          className="data-unchecked:bg-popover!"
        />
        <div className="flex items-center -mr-2 text-muted-foreground">
          <IconButton 
            onClick={menu?.onShare}
            icon={{ name: "Share2", size: 15 }} 
          />
          <LinkMenu {...menu}>
            <IconButton icon={{ name: "Ellipsis", size: 15 }} />
          </LinkMenu>
        </div>
      </div>

      {/* Title: favicon + domain */}
      <div className="flex items-center gap-2 min-w-0">
        <Avatar size="sm" className="rounded-sm shrink-0">
          <AvatarImage
            src={`https://www.google.com/s2/favicons?domain=${getDomain(data.originalUrl)}&sz=32`}
            alt=""
          />
          <AvatarFallback className="rounded-sm text-xs">
            {getDomain(data.originalUrl).charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <Link
          to={resolvePath(paths.private.link.details, { id: data.id })}
          className="font-semibold text-sm hover:underline truncate"
        >
          {data.title ? data.title : getDomain(data.originalUrl) + ' - Sem título'}
        </Link>
      </div>

      {/* Short link */}
      <div className="flex items-center gap-2 min-w-0">
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
        <Icon name="CornerDownRight" size={13} className="shrink-0" />
        <a
          href={data.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs hover:underline truncate"
        >
          {data.originalUrl}
        </a>
      </div>

      {/* Tags */}
      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Icon name="Tag" size={13} className="shrink-0" />
        <span>No tags</span>
        <button className="text-primary-500 hover:underline flex items-center gap-0.5 cursor-pointer">
          <Icon name="Plus" size={12} />
          Add tag
        </button>
      </div>

      {/* Footer: click data + date */}
      <div className="flex items-center justify-between text-xs text-muted-foreground mt-1">
        <span className="flex items-center gap-1">
          <Icon name="Lock" size={12} />
          Click data
        </span>
        <span>{formatDate(data.createdAt)}</span>
      </div>

    </div>
  )
}
