import { Skeleton } from "@/components/ui/skeleton"

interface QRCodePreviewProps {
  src: string | null
  isPending: boolean
  size?: number
}

export function QRCodePreview ({ src, isPending, size = 200 }: QRCodePreviewProps) {

  if (isPending) return (
    <Skeleton 
      style={{
        width: `${size}px`,
        height: `${size}px`
      }}
    />
  )

  return (
    <div className={`rounded border border-outline flex items-center justify-center size-[${size}px]`}>
      <img
        className={`rounded border border-outline w-[${size}px] h-[${size}px]`}
        src={`data:image/svg+xml;utf8,${encodeURIComponent(src ?? '')}`}
        style={{
          width: `${size}px`,
          height: `${size}px`
        }}
      />
    </div>
  )
}
