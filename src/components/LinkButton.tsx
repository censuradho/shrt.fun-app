import type { PropsWithChildren } from "react"
import { Link, type LinkProps } from "react-router"
import { cn } from "@/lib/utils"
import { Icon, type IconProps } from "./icons"

const variants = {
  primary: 'bg-primary-500 text-primary-foreground hover:bg-primary-600',
  ghost: 'bg-card border border-outline text-card-foreground hover:text-foreground hover:bg-accent/30',
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

type LinkButtonProps = LinkProps & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  headIcon?: IconProps
  tailIcon?: IconProps
}

export function LinkButton(props: PropsWithChildren<LinkButtonProps>) {
  const {
    children,
    variant = 'primary',
    size = 'md',
    headIcon,
    tailIcon,
    className,
    ...otherProps
  } = props

  const currentVariant = variants[variant]
  const currentSize = sizes[size]

  const classVariants = cn(
    'px-5 text-sm rounded-md flex items-center gap-2 items-center transition-colors',
    'cursor-pointer whitespace-nowrap font-semibold text-primary-foreground',
    currentVariant,
    currentSize.container,
    className
  )

  return (
    <Link
      className={classVariants}
      {...otherProps}
    >
      {!!headIcon && (
        <Icon size={currentSize.icon} {...headIcon} />
      )}
      {children}
      {!!tailIcon && (
        <Icon size={currentSize.icon} {...tailIcon} />
      )}
    </Link>
  )
}
