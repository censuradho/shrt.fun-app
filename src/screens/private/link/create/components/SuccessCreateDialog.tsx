import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogHeader
} from "@/components/ui/dialog"

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
        <div className="bg-popover rounded-md px-2 py-4 flex flex-col items-center justify-center gap-2">
          <a 
            href={link} 
            target="_blank" 
            rel="noopener noreferrer"
            className="text-link"
          >{link}</a>
        </div>
      </DialogContent>
    </Dialog>
  )
}