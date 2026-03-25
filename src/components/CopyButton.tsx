import { useTimeout } from "@/hooks/useTimeout"
import { useState, type ReactNode } from "react"
import { Icon } from "./icons"

interface CopyButtonProps {
  copiedNode?: ReactNode | string
  defaultNode?: ReactNode | string
  onClick?: () => void
}

export function CopyButton (props: CopyButtonProps) {
  const { 
    copiedNode = <Icon name="Check" size={14} />, 
    defaultNode = <Icon name="Copy" size={14} />, 
    onClick 
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
      className="w-6 h-6 hover:bg-accent flex items-center justify-center rounded  cursor-pointer"
      onClick={handleCopy}
    >
      {copied ? copiedNode : defaultNode}
    </button>
  )
}