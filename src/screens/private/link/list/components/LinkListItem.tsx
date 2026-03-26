import { CopyButton } from "@/components/CopyButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Checkbox } from "@/components/ui/checkbox"
import { cn } from "@/lib/utils"
import type { UrlNode } from "@/services/api/url/types"
import { copyToClipboard } from "@/utils/copyToClipboard"

interface LinkListItemProps {
  data: UrlNode
  selected?: boolean
  onSelect?: (selected: boolean) => void
}

const cleanLink = (url: string) => {
  return url
    .replace(/^(https?:\/\/)?(www\.)?/, '')
    .split('/')[0]
}
export function LinkListItem ({ data, selected, onSelect }: LinkListItemProps) {

  return (
    <div className={cn(
      'bg-card rounded-md flex flex-col lg:flex-row p-4 lg:items-center gap-4',
      {
        'bg-accent': selected
      }
    )}>
      <Checkbox 
        checked={selected}
        onCheckedChange={onSelect}
        className="data-unchecked:bg-popover!"
      />
      <div className="grid grid-cols-[1fr] min-w-0 flex-1">
        <div className="flex items-center gap-2 min-w-0">
          <Avatar size="sm" className="rounded-sm shrink-0">
            <AvatarImage
              src={`https://www.google.com/s2/favicons?domain=${cleanLink(data.originalUrl)}&sz=32`}
              alt=""
            />
            <AvatarFallback className="rounded-sm text-xs">
              {cleanLink(data.originalUrl).charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <a
            href={data.originalUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="text-lg hover:underline font-semibold truncate"
          >{cleanLink(data.originalUrl)}</a>
        </div>
        <div className="grid grid-cols-[auto] lg:grid-cols-[auto_auto_1fr] items-center gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            <a
              href={data.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-link text-sm hover:underline truncate"
            >
              {data.shortUrl.replace(/^(https?:\/\/)?(www\.)?/, '')}
            </a>
            <CopyButton
              onClick={() => copyToClipboard(data.shortUrl)}
            />
          </div>
          <span className="hidden lg:block shrink-0">•</span>
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
  )
}