import { CopyButton } from "@/components/CopyButton"
import { Icon } from "@/components/icons"
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from "@/components/ui/dialog"
import { copyToClipboard } from "@/utils/copyToClipboard"

interface SuccessCreateDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  link: string
}

export function SuccessCreateDialog ({ open, onOpenChange, link }: SuccessCreateDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="bg-card">
        <DialogHeader>
          <DialogTitle>Seu link está pronto! 🎉</DialogTitle>
          <p>Copie o link abaixo para compartilhar ou escolha uma plataforma para compartilhá-lo.</p>
        </DialogHeader>
        <div className="bg-popover rounded-md px-2 py-4 flex items-center justify-between gap-4">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-link hover:underline flex items-center gap-1"
          > <Icon size={14} name="ExternalLink" />{link} </a>
          <CopyButton 
            onClick={() => copyToClipboard(link)}
            className="hover:bg-card"
          />
   
        </div>
      </DialogContent>
    </Dialog>
  )
}