import { useTimeout } from "@/hooks/useTimeout"
import { useState, type ReactNode } from "react"
import { Icon } from "./icons"
import { cn } from "@/lib/utils"

interface CopyButtonProps {
  copiedNode?: ReactNode | string
  defaultNode?: ReactNode | string
  onClick?: () => void
  className?: string
}

export function CopyButton (props: CopyButtonProps) {
  const { 
    copiedNode = <Icon name="Check" size={14} />, 
    defaultNode = <Icon name="Copy" size={14} />, 
    onClick,
    className
  } = props

  const [copied, setCopied] = useState(false)

  const { set  } = useTimeout(() => {
    setCopied(false)
  }, 5000)

  const handleCopy = () => {
    setCopied(true)
    set()
    onClick?.()
  }

  return (
    <button 
      className={cn(
        'w-6 h-6 hover:bg-accent flex items-center justify-center rounded-md  cursor-pointer',
        className
      )}
      onClick={handleCopy}
    >
      {copied ? copiedNode : defaultNode}
    </button>
  )
}