import { cn } from "@/lib/utils";
import type { PropsWithChildren } from "react";
import { Icon, type IconNames } from "./icons";

const variants = {
  alert: "dark:bg-destructive/10 dark:text-destructive",
  info: "bg-blue-100 text-blue-800",
  success: "bg-green-100 text-green-800",
  warning: "bg-yellow-100 text-yellow-800",
}

interface BannerProps {
  variant?: keyof typeof variants
  headIcon?: IconNames
}

export function Banner (props: PropsWithChildren<BannerProps>) {
  const { variant = "info", children, headIcon } = props

  const currentVariant = variants[variant]

  return (
    <div className={cn(
      currentVariant,
      'text-sm rounded-md px-4 py-2 flex items-center gap-2'
    )}>
      {headIcon && <Icon size={16} name={headIcon} />}
      {children}
    </div>
  )
}