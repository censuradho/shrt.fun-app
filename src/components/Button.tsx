import type { ButtonHTMLAttributes, PropsWithChildren } from "react"
import { cn } from "@/lib/utils"
import { Spinner } from "./spinner"
import { Icon, type IconProps } from "./icons"

const variants = {
  primary: 'bg-primary-500 text-primary-foreground hover:bg-primary-600',
  ghost: 'bg-card border border-outline text-card-foreground hover:text-foreground hover:bg-accent/30',
  text: 'text-card-foreground hover:text-foreground',
  destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/70'
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
export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  loading?: boolean
  headIcon?: IconProps
  tailIcon?: IconProps
}

export function Button (props: PropsWithChildren<ButtonProps>) {
  const { 
    children,
    variant = 'primary',
    loading = false,
    size = 'md',
    disabled = loading,
    headIcon,
    tailIcon,
    className,
    ...otherProps
  } = props

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  const classVariants = cn(
    'px-5 text-sm rounded-md flex items-center gap-2 items-center transition-colors',
    'cursor-pointer disabled:cursor-not-allowed disabled:opacity-50 whitespace-nowrap font-semibold text-primary-foreground',
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
      {!!tailIcon && (
        <Icon size={currentSize.icon} {...tailIcon} />
      )}
    </button>
  )
}