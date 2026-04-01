import type { PropsWithChildren, ReactNode } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription, DialogClose } from "./ui/dialog";
import { Button, type ButtonProps } from "./Button";


interface ActionBtn {
  label?: string
  onClick?: () => void
  variant?: ButtonProps['variant']
}

interface ConfirmationDialogProps {
  title: string
  description?: string | ReactNode
  confirm: ActionBtn & { loading?: boolean}
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

export function ConfirmationDialog (props: PropsWithChildren<ConfirmationDialogProps>) {
  const {
    children,
    title,
    confirm,
    description,
    open,
    onOpenChange
  } = props

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="md:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg">{title}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        <div className="flex items-center justify-end gap-4 w-full mt-4 border-t border-outline pt-4">
          <DialogClose asChild>
            <Button 
              size="sm"
              variant="text"
            >
              Cancelar
            </Button>
          </DialogClose>
          <Button 
            size="sm"
            variant={confirm.variant} 
            onClick={confirm.onClick}
            loading={confirm.loading}
          >
            {confirm.label || 'Confirmar'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}