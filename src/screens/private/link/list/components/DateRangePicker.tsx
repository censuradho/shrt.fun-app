import { useMemo, useState } from "react"
import type { DateRange } from "react-day-picker"

import { Button } from "@/components/Button"
import { Icon } from "@/components/icons"
import { Calendar } from "@/components/ui/calendar"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { cn } from "@/lib/utils"
import { dFormat } from "@/lib/date"

interface DateRangePickerProps {
  createdAfter?: string
  createdBefore?: string
  onApply: (values: { createdAfter?: string; createdBefore?: string }) => void
  className?: string
  placeholder?: string
}

function toStartOfDayIso(date: Date) {
  const value = new Date(date)
  value.setHours(0, 0, 0, 0)
  return value.toISOString()
}

function toEndOfDayIso(date: Date) {
  const value = new Date(date)
  value.setHours(23, 59, 59, 999)
  return value.toISOString()
}

function fromIso(value?: string) {
  if (!value) return undefined
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return undefined
  return date
}

const presets = [
  { label: 'Hoje', days: 1 },
  { label: 'Últimos 7 dias', days: 7 },
  { label: 'Últimos 30 dias', days: 30 },
  { label: 'Últimos 90 dias', days: 90 },
]

export function DateRangePicker(props: DateRangePickerProps) {
  const [selectedPreset, setSelectedPreset] = useState<number | null>(null)

  const { 
    createdAfter, 
    createdBefore, 
    onApply, 
    className,
    placeholder
  } = props

  const selectedRange = useMemo<DateRange | undefined>(() => {
    const from = fromIso(createdAfter)
    const to = fromIso(createdBefore)

    if (!from && !to) return undefined

    return {
      from,
      to: to ?? from,
    }
  }, [createdAfter, createdBefore])

  const [open, setOpen] = useState(false)
  const [draft, setDraft] = useState<DateRange | undefined>(selectedRange)

  const rangeLabel = useMemo(() => {
    if (!selectedRange?.from) return ''
    const fromLabel = dFormat(selectedRange.from, 'dd/MM/yyyy')
    const toDate = selectedRange.to ?? selectedRange.from
    const toLabel = dFormat(toDate, 'dd/MM/yyyy')

    return `${fromLabel} - ${toLabel}`
  }, [selectedRange])

  const apply = (range: DateRange | undefined) => {
    if (!range?.from) {
      onApply({ createdAfter: undefined, createdBefore: undefined })
      setOpen(false)
      return
    }

    const to = range.to ?? range.from

    onApply({
      createdAfter: toStartOfDayIso(range.from),
      createdBefore: toEndOfDayIso(to),
    })
    setOpen(false)
  }

  const setPreset = (days: number) => {
    const to = new Date()
    const from = new Date()
    from.setDate(from.getDate() - days + 1)
    setDraft({ from, to })
    setSelectedPreset(days)
  }

  const selectedDatePreviewClassnames = cn(
    'h-10 w-full border border-outline rounded-sm text-sm bg-input text-foreground focus:border-primary-500',
    'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
    'px-4 placeholder:text-muted-foreground font-mono',
    'flex items-center justify-start bg-input'
  )

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (nextOpen) setDraft(selectedRange)
      }}
    >
      <DialogTrigger asChild>
        <button
          className={cn(
            'flex justify-start items-center gap-3.5',
            'h-10 border border-outline rounded-sm text-sm bg-input text-foreground focus:border-primary-500',
            'focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background',
            'px-4 placeholder:text-muted-foreground font-mono w-max',
            className
          )}
        >
          <Icon name="Calendar" className="text-card-foreground" size={16} />
          {rangeLabel && (
            <span className="truncate">{rangeLabel}</span>
          )}
          {!rangeLabel && placeholder && (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
        </button>
      </DialogTrigger>
      <DialogContent 
        className="h-dvh md:h-max overflow-y-auto rounded-none sm:max-w-lg md:rounded-2xl max-w-245 md:w-[95vw] p-4 bg-card"
      >
        <div className="mb-3 flex flex-col gap-1">
          <span className="text-lg font-semibold pb-6">{placeholder}</span>
          <div className="grid grid-cols-2 gap-2">
            <div className={selectedDatePreviewClassnames}>
              {draft?.from ? dFormat(draft.from, 'dd/MM/yyyy') : ""}
            </div>
            <div className={selectedDatePreviewClassnames}>
              {draft?.to ? dFormat(draft.to, 'dd/MM/yyyy') : ""}
            </div>
          </div>
        </div>

        <div className="px-6 flex justify-center">
          <Calendar
            mode="range"
            selected={draft}
            onSelect={(date) => {
              setDraft(date)
              setSelectedPreset(null)
            }}
            disabled={{ after: new Date() }}
            className="rounded-md border border-none w-full max-w-80"
          />
        </div>

        <div className="mt-3 flex flex-col sm:flex-row items-center gap-2">
          {presets.map(({ label, days }) => (
            <Button
              key={label}
              type="button"
              variant={selectedPreset === days ? 'primary' : 'ghost'}
              className="w-full justify-center"
              size="sm"
              onClick={() => setPreset(days)}
            >
              {label}
            </Button>
          ))}
        </div>
        <div className="mt-4 flex items-center justify-between gap-2 border-t border-outline pt-4">
          <Button
            type="button"
            variant="ghost"
            onClick={() => {
              setDraft(undefined)
              onApply({ createdAfter: undefined, createdBefore: undefined })
              setOpen(false)
              setSelectedPreset(null)
            }}
          >
            Limpar
          </Button>
          <div className="flex items-center gap-2">
            <Button type="button" variant="text" onClick={() => setOpen(false)}>
              Cancelar
            </Button>
            <Button type="button" onClick={() => apply(draft)}>
              Aplicar
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
