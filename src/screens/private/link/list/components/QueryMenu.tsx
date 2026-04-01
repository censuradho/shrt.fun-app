import { TextField } from "@/components/form/TextField"
import { DateRangePicker } from "./DateRangePicker"
import { Button } from "@/components/Button"

interface QueryMenuProps {
  search: string
  onSearchChange: (value: string) => void
  isSearchValid: boolean
  createdAfter?: string
  createdBefore?: string
  hasQueries: boolean
  onApplyDateRange: (values: { createdAfter?: string; createdBefore?: string }) => void
  onClear: () => void
  totalItems?: number
}

export function QueryMenu(props: QueryMenuProps) {
  const {
    search,
    onSearchChange,
    isSearchValid,
    createdAfter,
    createdBefore,
    hasQueries,
    onApplyDateRange,
    onClear,
    totalItems
  } = props

  return (
    <div className="grid grid-cols-1 md:items-start md:grid-cols-[15rem_1fr] gap-4 pb-4">
      <div className="w-full md:max-w-100">
        <TextField
          id="search"
          name="search"
          placeholder="Buscar links"
          label="Buscar links"
          renderLabel={false}
          inputMode="url"
          headIcon={{
            name: 'Search'
          }}
          value={search}
          onChange={e => onSearchChange(e.target.value)}
          errorMessage={!isSearchValid ? 'URL inválida' : undefined}
        />
      </div>
      <div className="relative flex-1 overflow-hidden">
        <div className="flex items-center gap-2 overflow-x-auto pr-8 scrollbar-hide">
          <DateRangePicker
            createdAfter={createdAfter}
            createdBefore={createdBefore}
            placeholder="Filtrar pela data de criação"
            onApply={onApplyDateRange}
          />
          {hasQueries && (
            <span className="text-sm text-foreground whitespace-nowrap">Exibindo {totalItems} {totalItems === 1 ? 'resultado' : 'resultados'}</span>
          )}
          {hasQueries && (
            <Button
              size="sm"
              variant="text"
              onClick={onClear}
            >Limpar filtros</Button>
          )}
        </div>
        <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-linear-to-l from-background to-transparent z-10" />
      </div>
    </div>
  )
}
