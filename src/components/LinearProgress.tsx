import { cn } from "@/lib/utils"

interface LinearProgressProps {
  className?: string
}

export function LinearProgress({ className }: LinearProgressProps) {
  return (
    <div className={cn("relative h-1 w-full overflow-hidden rounded-full bg-accent/20", className)}>
      <div className="absolute inset-y-0 animate-linear-progress bg-foreground rounded-full" />
    </div>
  )
}
