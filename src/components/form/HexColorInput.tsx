import { cn } from "@/lib/utils"
import { type ChangeEvent, useCallback, useRef } from "react"

export interface HexColorInputProps {
  value?: string
  onChange?: (value: string) => void
  label?: string
  className?: string
  disabled?: boolean
  errorMessage?: string
}

export function HexColorInput ({ 
  value = '#000000', 
  onChange, 
  label, 
  className,
  disabled,
  errorMessage
}: HexColorInputProps) {

  const handleTextChange = (e: ChangeEvent<HTMLInputElement>) => {
    const raw = e.target.value
    const normalized = raw.startsWith('#') ? raw : `#${raw}`
    onChange?.(normalized)
  }

  const debounceRef = useRef<ReturnType<typeof setTimeout>>(null)

  const handleSwatchChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => onChange?.(val), 150)
  }, [onChange])

  const isValid = /^#[0-9a-fA-F]{6}$/.test(value)

  return (
    <div className={cn("flex flex-col gap-1.5 w-full", className)}>
      {label && (
        <span className="text-xxs uppercase text-card-foreground">{label}</span>
      )}
      <div className="flex items-center gap-2 border border-outline rounded-sm px-3 h-10 bg-input w-full focus-within:border-primary-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background">
        <label className="relative cursor-pointer shrink-0">
          <span
            className="block size-5 rounded-sm border border-outline"
            style={{ background: isValid ? value : '#000000' }}
          />
          <input
            type="color"
            value={isValid ? value : '#000000'}
            onChange={handleSwatchChange}
            className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
            disabled={disabled}
          />
        </label>
        <input
          type="text"
          value={value}
          onChange={handleTextChange}
          maxLength={7}
          disabled={disabled}
          className="w-full text-sm bg-transparent outline-none text-foreground disabled:text-muted-foreground"
          spellCheck={false}
        />
      </div>
      {errorMessage && (
        <span className="text-error text-xs">{errorMessage}</span>
      )}
    </div>
  )
}
