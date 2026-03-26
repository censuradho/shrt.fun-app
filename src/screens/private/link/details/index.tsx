import { Icon } from "@/components/icons"
import { useUrlDetailViewModel } from "./hooks/useUrlDetailViewModel"
import { useNavigate } from "react-router"
import { AvatarFallback, AvatarImage, Avatar } from "@/components/ui/avatar"
import { getDomain, getLinkFavicon } from "@/utils/getDomain"
import { CopyButton } from "@/components/CopyButton"
import { copyToClipboard } from "@/utils/copyToClipboard"
import { formatDate } from "@/lib/date"

export function DetailLinkScreen () {
  const {
    data,
  } = useUrlDetailViewModel()
  const navigate = useNavigate()

  if (!data) return null

  return (
    <>
      <div className="container mt-10 ">
        <header className="flex justify-between items-center gap-4">
          <button className="cursor-pointer flex items-center gap-2" onClick={() => navigate(-1)}>
            <Icon size={20} name="ChevronLeft" />
            <span className="text-md font-medium">Voltar a lista</span>
          </button>
        </header>
        <section className="bg-card rounded-md p-4 mt-6 flex flex-col gap-4">
          <div className="grid grid-cols-[64px_1fr_auto] gap-4">
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
              <h1 className="text-2xl ">{data.title ? data.title : getDomain(data.originalUrl) + ' - Sem título'} </h1>
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
              <div className="flex items-center gap-1 text-muted-foreground min-w-0 ">
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
          <hr 
            className="w-full border-outline border cols-span-3"
          />
          <div className="flex justify-end">
            <span 
              className="text-sm">{formatDate(data.createdAt, {
                hour: 'numeric',
                minute: 'numeric',
                timeZoneName: 'short',
              })}
            </span>
          </div>
        </section>
      </div>
    </>
  )
}