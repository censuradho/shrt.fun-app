import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { HexColorInput, type HexColorInputProps } from "@/components/form/HexColorInput"

interface HexColorInputHookProps<T extends FieldValues> extends Pick<
HexColorInputProps, 
'errorMessage' |
'label' |
'className'
> {
  control: Control<T>
  name: Path<T>
}  

export function HexColorInputHook<T extends FieldValues> (props: HexColorInputHookProps<T>) {
  const { control, name, ...otherProps } = props

  return (
    <Controller
      control={control}
      name={name}
      render={({ field }) => (
        <HexColorInput
          value={field.value ?? '#000000'}
          onChange={field.onChange}
          {...otherProps}
        />
      )}
    />
  )
}
