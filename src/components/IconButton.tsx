import type { ButtonHTMLAttributes } from "react";
import { Icon, type IconProps } from "./icons";
import { cn } from "@/lib/utils";

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  icon: IconProps
}


export function IconButton (props: IconButtonProps) {
  const {
    icon,
    className,
    ...otherProps
  } = props

  return (
    <button 
      className={cn(
        'p-2 rounded-md hover:bg-accent/50 transition-colors duration-75 cursor-pointer hover:text-foreground',
        className
      )}
      {...otherProps}
    >
      <Icon 
        size={18}
        {...icon}
      />
    </button>
  )
}