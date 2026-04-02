import { ColorToggle } from "@/components/ColorToggle"
import { ToggleGroup } from "@/components/ui/toggle-group"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

interface ColorPickerHookProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
}

const colors = [
  "#D84280",
  "#DE3121",
  "#EF8000",
  "#198639",
  "#229CE0",
  "#2A5BD7",
  "#6B52D1",
  "#000000",
]

export function ColorPickerHook<T extends FieldValues>(props: ColorPickerHookProps<T>) {
  const { control, name } = props

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <ToggleGroup
          type="single"
          className="flex items-center flex-wrap gap-2"
          value={field.value ?? ""}
          onValueChange={(value) => value &&  field.onChange(value)}
        >
          {colors.map(color => (
            <ColorToggle
              key={color}
              label={color}
              value={color}
              selected={field.value === color}
            />
          ))}
        </ToggleGroup>
      )}
    />
  )
}
