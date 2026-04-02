import React from "react"
import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { ImageBase64Input } from "@/components/form/ImageBase64Input"

interface ImageBase64InputHookProps<T extends FieldValues> {
  control: Control<T>
  name: Path<T>
  label?: string
  errorMessage?: string
  disabled?: boolean
  tailLabel?: React.ReactNode
}

export function ImageBase64InputHook<T extends FieldValues> ({ control, name, label, errorMessage, disabled, tailLabel }: ImageBase64InputHookProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <ImageBase64Input
          value={field.value}
          onChange={field.onChange}
          label={label}
          errorMessage={errorMessage ?? fieldState.error?.message}
          disabled={disabled}
          tailLabel={tailLabel}
        />
      )}
    />
  )
}
