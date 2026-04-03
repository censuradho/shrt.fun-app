import { Controller, type Control, type FieldValues, type Path } from "react-hook-form"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { Icon } from "@/components/icons"
import { format } from "date-fns"
import { ptBR } from "date-fns/locale"

interface DatePickerHookProps<T extends FieldValues> {
  name: Path<T>
  control: Control<T>
  label?: string
  placeholder?: string
  errorMessage?: string
  disabled?: boolean
}

export function DatePickerHook<T extends FieldValues>(props: DatePickerHookProps<T>) {
  const { name, control, label, placeholder = "Selecione uma data", errorMessage, disabled } = props

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => (
        <div className="flex flex-col gap-2 w-full">
          {label && (
            <label className="text-xxs uppercase text-card-foreground cursor-pointer">{label}</label>
          )}
          <Popover>
            <PopoverTrigger asChild>
              <div className="relative flex items-center w-full">
                <span className="absolute left-3 flex items-center text-muted-foreground pointer-events-none">
                  <Icon name="Calendar" size={16} />
                </span>
                <button
                  type="button"
                  disabled={disabled ?? field.disabled}
                  className="h-10 w-full border border-outline rounded-sm text-sm bg-input text-foreground focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background px-4 pl-9 pr-9 text-left font-mono disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {field.value
                    ? format(field.value, "dd/MM/yyyy", { locale: ptBR })
                    : <span className="text-muted-foreground">{placeholder}</span>
                  }
                </button>
                {field.value && (
                  <span
                    className="absolute right-3 flex items-center text-muted-foreground cursor-pointer hover:text-foreground"
                    onClick={(e) => { e.stopPropagation(); field.onChange(null) }}
                  >
                    <Icon name="X" size={16} />
                  </span>
                )}
              </div>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
              <Calendar
                mode="single"
                selected={field.value ?? undefined}
                onSelect={(date) => field.onChange(date ?? null)}
                disabled={(date) => date < new Date()}
                locale={ptBR}
              />
            </PopoverContent>
          </Popover>
          {errorMessage && (
            <span className="text-error text-xs">{errorMessage}</span>
          )}
        </div>
      )}
    />
  )
}
