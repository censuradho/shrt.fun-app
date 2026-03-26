import { CopyButton } from "@/components/CopyButton"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { copyToClipboard } from "@/utils/copyToClipboard"

interface ShareLinkDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  shortUrl: string
}

interface ShareOption {
  label: string
  domain: string
  href: (url: string) => string
}

const shareOptions: ShareOption[] = [
  {
    label: "WhatsApp",
    domain: "whatsapp.com",
    href: (url) => `https://wa.me/?text=${encodeURIComponent(url)}`,
  },
  {
    label: "Facebook",
    domain: "facebook.com",
    href: (url) => `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
  },
  {
    label: "Instagram",
    domain: "instagram.com",
    href: (url) => `https://www.instagram.com/?url=${encodeURIComponent(url)}`,
  },
  {
    label: "X",
    domain: "x.com",
    href: (url) => `https://x.com/intent/tweet?url=${encodeURIComponent(url)}`,
  },
  {
    label: "Threads",
    domain: "threads.net",
    href: (url) => `https://www.threads.net/intent/post?text=${encodeURIComponent(url)}`,
  },
  {
    label: "LinkedIn",
    domain: "linkedin.com",
    href: (url) => `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
  },
  {
    label: "Email",
    domain: "gmail.com",
    href: (url) => `mailto:?subject=Check this link&body=${encodeURIComponent(url)}`,
  },
]

export function ShareLinkDialog({ open, onOpenChange, shortUrl }: ShareLinkDialogProps) {
  const displayUrl = shortUrl.replace(/^https?:\/\//, '')

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Compartilhar seu link</DialogTitle>
        </DialogHeader>

        {/* Social options */}
        <div className="flex items-center gap-3 overflow-x-auto pb-1 -mx-1 px-1">
          {shareOptions.map((option) => (
            <a
              key={option.label}
              href={option.href(shortUrl)}
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col items-center gap-1.5 shrink-0 w-14 group"
            >
              <Avatar className="rounded-xl transition-transform group-hover:scale-105">
                <AvatarImage
                  src={`https://www.google.com/s2/favicons?domain=${option.domain}&sz=64`}
                  alt={option.label}
                />
                <AvatarFallback className="rounded-xl text-xs font-medium">
                  {option.label.charAt(0)}
                </AvatarFallback>
              </Avatar>
              <span className="text-xs text-muted-foreground">{option.label}</span>
            </a>
          ))}
        </div>

        {/* URL input + copy */}
        <div className="flex items-center gap-2 rounded-md border bg-muted px-3 py-2 text-sm">
          <span className="flex-1 truncate text-muted-foreground">{displayUrl}</span>
          <CopyButton onClick={() => copyToClipboard(shortUrl)} />
        </div>

      </DialogContent>
    </Dialog>
  )
}
