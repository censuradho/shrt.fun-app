import { ColorToggle } from "@/components/ColorToggle"
import { QR_CODE_FREE_COLORS } from "@/constants/qrCode"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"

interface ColorPickerHookProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
}

export function ColorPickerHook<T extends FieldValues>(props: ColorPickerHookProps<T>) {
  const { control, name } = props

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <RadioGroupPrimitive.Root
          className="flex items-center flex-wrap gap-2"
          value={field.value ?? ""}
          onValueChange={(value) => value && field.onChange(value)}
        >
          {QR_CODE_FREE_COLORS.map(color => (
            <ColorToggle
              key={color}
              label={color}
              value={color}
              selected={field.value === color}
            />
          ))}
        </RadioGroupPrimitive.Root>
      )}
    />
  )
}
