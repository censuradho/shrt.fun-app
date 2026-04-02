import { Spinner } from "@/components/spinner"

interface QRCodePreviewProps {
  src: string | null
  isPending: boolean
}

export function QRCodePreview ({ src, isPending }: QRCodePreviewProps) {
  return (
    <div className="size-37 rounded bg-accent border border-outline flex items-center justify-center">
      {isPending ? (
        <Spinner />
      ) : (
        <img
          className="size-37 rounded border border-outline"
          src={`data:image/svg+xml;utf8,${encodeURIComponent(src ?? '')}`}
        />
      )}
    </div>
  )
}
