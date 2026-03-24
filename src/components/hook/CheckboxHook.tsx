import { Controller, type Control, type FieldValues, type Path } from "react-hook-form";
import { Checkbox } from "../ui/checkbox";
import { cn } from "@/lib/utils";

type CheckboxHookProps<T extends FieldValues> = {
  control: Control<T>
  name: Path<T>
  label: string
  className?: string
}

export function CheckboxHook<T extends FieldValues>({
  control,
  name,
  label,
  className,
}: CheckboxHookProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field, fieldState }) => (
        <div className={cn("flex flex-col gap-1", className)}>
          <Checkbox
            checked={field.value}
            onCheckedChange={field.onChange}
            onBlur={field.onBlur}
            aria-label={label}
            name={field.name}
            ref={field.ref}
          />
          {fieldState.error?.message && (
            <span className="text-error text-xs">{fieldState.error.message}</span>
          )}
        </div>
      )}
    />
  )
}
