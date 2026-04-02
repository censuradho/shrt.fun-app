import { Switch } from "@/components/ui/switch"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

interface SwitchHookProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  renderLabel?: boolean
  className?: string
  disabled?: boolean
}

export function SwitchHook<T extends FieldValues>(props: SwitchHookProps<T>) {
  const { name, control, label, disabled, renderLabel = false } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex items-center gap-2">
          <Switch
            id={name}
            checked={field.value}
            aria-label={label}
            onCheckedChange={field.onChange}
            disabled={disabled ?? field.disabled}
          />
          {renderLabel && (
            <label
              htmlFor={name}
              className="text-xxs uppercase text-card-foreground cursor-pointer">{label}
            </label>
          )}
        </div>
      )}
    />
  )
}
