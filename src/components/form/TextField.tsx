import { cn } from "@/lib/utils";
import { Icon } from "@/components/icons";
import type { IconNames } from "@/components/icons";

interface TextFieldIconProps {
  name?: IconNames
  onClick?: () => void
  className?: string
}

export type TextFieldProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string
  renderLabel?: boolean
  headText?: string
  headIcon?: TextFieldIconProps
  tailIcon?: TextFieldIconProps
  id: string
  errorMessage?: string
}

export function TextField(props: TextFieldProps) {
  const {
    label,
    headText,
    headIcon,
    tailIcon,
    placeholder,
    id,
    renderLabel = true,
    errorMessage,
    ...otherProps
  } = props

  return (
    <div className="flex flex-col gap-2 w-full">
      {renderLabel && (
        <label
          htmlFor={id}
          className="text-xxs uppercase text-card-foreground cursor-pointer">{label}</label>
      )}
      <div className="flex">
        {!!headText && (
          <span className="h-10 bg-background flex items-center px-2.5 border border-outline rounded-l-sm text-sm text-muted-foreground font-mono">{headText}</span>
        )}

        <div className="relative flex items-center w-full">
          {headIcon?.name && (
            <span
              className={cn("absolute left-3 flex items-center text-muted-foreground", headIcon.onClick && "cursor-pointer")}
              onClick={headIcon.onClick}
            >
              <Icon name={headIcon.name} size={16} className={headIcon.className} />
            </span>
          )}

          <input
            type="text"
            id={id}
            aria-label={label}
            placeholder={placeholder || label}
            className={cn(
              'h-10 w-full border border-outline rounded-sm text-sm bg-input text-foreground focus:border-primary-500',
              'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
              'px-4 placeholder:text-muted-foreground font-mono',
              !!headText && 'rounded-l-none',
              !!headIcon?.name && 'pl-9',
              !!tailIcon?.name && 'pr-9',
            )}
            {...otherProps}
          />

          {tailIcon?.name && (
            <span
              className={cn("absolute right-3 flex items-center text-muted-foreground", tailIcon.onClick && "cursor-pointer")}
              onClick={tailIcon.onClick}
            >
              <Icon name={tailIcon.name} size={16} className={tailIcon.className} />
            </span>
          )}
        </div>
      </div>
      {errorMessage && (
        <span className="text-error text-xs">{errorMessage}</span>
      )}
    </div>
  )
}