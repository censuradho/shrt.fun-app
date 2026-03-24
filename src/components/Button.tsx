import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"
import { Icon, type IconProps } from "./icons"

const variants = {
  primary: 'bg-primary-500 text-primary-foreground hover:bg-primary-600',
  ghost: 'bg-popover border border-outline text-card-foreground hover:text-foreground hover:bg-accent/30',
  text: 'text-card-foreground hover:text-foreground',
}

const sizes = {
  md: {
    container: 'h-10',
    icon: 13
  },
  sm: {
    container: 'h-[30px] px-[10px] rounded-sm',
    icon: 12
  },
}
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
  headIcon?: IconProps
}

export function Button (props: PropsWithChildren<ButtonProps>) {
  const { 
    children,
    variant = 'primary',
    loading = false,
    size = 'md',
    disabled = loading,
    headIcon,
    className,
    ...otherProps
  } = props

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  const classVariants = cn(
    'px-5 text-sm rounded-md flex items-center gap-2 items-center transition-colors',
    'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap',
    currentVariant,
    currentSize.container,
    className
  )

  return (
    <button 
      className={classVariants}
      disabled={disabled}
      {...otherProps}
    >
      {!!headIcon && (
        <Icon size={currentSize.icon} {...headIcon} />
      )}
      {loading ? <Spinner /> : children}
    </button>
  )
}