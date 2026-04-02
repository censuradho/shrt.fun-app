import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { type UseFormReturn } from "react-hook-form"
import type { QRCodeCustomizeFormData } from "../validations"
import { QRCodePreviewCard } from "./QRCodePreview"

interface QRCodePreviewDialogProps {
  form: UseFormReturn<QRCodeCustomizeFormData>
  trigger: React.ReactNode
}

export function QRCodePreviewDialog ({ form, trigger }: QRCodePreviewDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger}
      </DialogTrigger>
      <DialogContent className="flex flex-col items-center">
        <DialogHeader>
          <DialogTitle>Preview do QR Code</DialogTitle>
        </DialogHeader>
        <QRCodePreviewCard form={form} />
      </DialogContent>
    </Dialog>
  )
}
