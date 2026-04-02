import { cn } from "@/lib/utils"
import { Icon } from "@/components/icons"
import { type ChangeEvent, useRef, useState } from "react"

const MAX_SIZE_MB = 2
const MAX_SIZE_BYTES = MAX_SIZE_MB * 1024 * 1024

interface ImageBase64InputProps {
  value?: string
  onChange?: (value: string | undefined) => void
  label?: string
  errorMessage?: string
  className?: string
  accept?: string
}

export function ImageBase64Input ({
  value,
  onChange,
  label,
  errorMessage,
  className,
  accept = 'image/png,image/jpeg',
}: ImageBase64InputProps) {
  const inputRef = useRef<HTMLInputElement>(null)
  const [sizeError, setSizeError] = useState<string | null>(null)

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (file.size > MAX_SIZE_BYTES) {
      setSizeError(`Arquivo muito grande. Máx. ${MAX_SIZE_MB}MB`)
      if (inputRef.current) inputRef.current.value = ''
      return
    }

    setSizeError(null)
    const reader = new FileReader()
    reader.onload = () => onChange?.(reader.result as string)
    reader.readAsDataURL(file)
  }

  const handleClear = () => {
    onChange?.(undefined)
    if (inputRef.current) inputRef.current.value = ''
  }

  return (
    <div className={cn("flex flex-col gap-1.5", className)}>
      {label && (
        <span className="text-xxs uppercase text-card-foreground">{label}</span>
      )}
      <div className="flex items-center gap-3">
        <div
          className="size-[88px] rounded-md border border-outline bg-muted flex items-center justify-center overflow-hidden cursor-pointer shrink-0"
          onClick={() => inputRef.current?.click()}
        >
          {value ? (
            <img src={value} className="size-full object-contain" alt="logo preview" />
          ) : (
            <Icon name="Image" className="text-muted-foreground" />
          )}
        </div>
        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="text-sm text-primary hover:underline text-left"
          >
            {value ? 'Trocar imagem' : 'Adicionar logo'}
          </button>
          {value && (
            <button
              type="button"
              onClick={handleClear}
              className="text-sm text-muted-foreground hover:text-destructive text-left"
            >
              Remover
            </button>
          )}
          <span className="text-xs text-muted-foreground">PNG ou JPEG. Máx. {MAX_SIZE_MB}MB</span>
        </div>
      </div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={handleChange}
      />
      {(sizeError || errorMessage) && (
        <span className="text-error text-xs">{sizeError ?? errorMessage}</span>
      )}
    </div>
  )
}
