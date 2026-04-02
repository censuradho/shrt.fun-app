import { Spinner } from "@/components/spinner"

interface QRCodePreviewProps {
  src: string | null
  isPending: boolean
  size?: number
}

export function QRCodePreview ({ src, isPending, size = 37 }: QRCodePreviewProps) {
  
  return (
    <div className={`size-${size} rounded bg-accent border border-outline flex items-center justify-center`}>
      {isPending ? (
        <Spinner />
      ) : (
        <img
          className={`size-${size} rounded border border-outline`}
          src={`data:image/svg+xml;utf8,${encodeURIComponent(src ?? '')}`}
        />
      )}
    </div>
  )
}
