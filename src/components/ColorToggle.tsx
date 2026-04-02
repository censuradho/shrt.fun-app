import { cn } from "@/lib/utils"
import { RadioGroup as RadioGroupPrimitive } from "radix-ui"
import { Icon } from "./icons"

interface ColorToggleProps {
  selected?: boolean
  value: string
  label: string
}

export function ColorToggle (props: ColorToggleProps) {
  const { selected, value, label } = props

  return (
    <div className="relative flex justify-center items-center">
      <RadioGroupPrimitive.Item
        value={value}
        aria-label={`Selecionar cor ${label}`}
        className={cn(
          'size-10 min-w-0 p-0 rounded-full cursor-pointer relative z-2 outline-none focus-visible:ring-2 focus-visible:ring-ring'
        )}
        style={{ background: value }}
      />
      <div
        className="w-13 h-13 rounded-full absolute z-1 border-3"
        style={{
          borderColor: value,
          opacity: selected ? 0.3 : 0,
        }}
      />
      {selected && (
        <Icon
          name="Check"
          className="absolute z-20 text-white pointer-events-none"
          size={14}
        />
      )}
    </div>
  )
}
