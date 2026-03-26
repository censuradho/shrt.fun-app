import { CopyButton } from "@/components/CopyButton"
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
        <a
          href={data.originalUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="text-lg hover:underline font-semibold truncate"
        >{cleanLink(data.originalUrl)}</a>
        <div className="grid grid-cols-[auto] lg:grid-cols-[auto_auto_1fr] items-center gap-2 min-w-0">
          <div className="flex items-center gap-2 min-w-0 overflow-hidden">
            <a
              href={data.shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline text-blitzit-green truncate"
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