import { cn } from "@/lib/utils"

interface LetterCircleProps {
  className?: string
  letter: string
}
export function LetterCircle (props: LetterCircleProps) {
  const { letter, className } = props

  return (
    <div className={cn('w-8 h-8 rounded-full bg-accent flex items-center justify-center text-sm text-foreground', className)}>
      {letter.charAt(0).toUpperCase()}
    </div>
  )
}