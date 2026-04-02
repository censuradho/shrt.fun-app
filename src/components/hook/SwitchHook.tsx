import { Switch } from "@/components/ui/switch"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

interface SwitchHookProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label: string
  className?: string
  disabled?: boolean
}

export function SwitchHook<T extends FieldValues>(props: SwitchHookProps<T>) {
  const { name, control, label, disabled } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <Switch
          id={name}
          checked={field.value}
          aria-label={label}
          onCheckedChange={field.onChange}
          disabled={disabled ?? field.disabled}
        />
      )}
    />
  )
}
