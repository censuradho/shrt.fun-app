import { flexRender, getCoreRowModel, useReactTable, type ColumnDef } from "@tanstack/react-table"
import { useMemo, useState, type Dispatch } from "react"

import type { LocationClicksItem } from "@/services/api/analytics/types"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group"
import { cn } from "@/lib/utils"
import { isOdd } from "@/utils/isOdd"
import { IconButton } from "@/components/IconButton"

import type { OffsetPaginationParams } from "@/services/api/types"
import { useFindHitsByCityQuery, useFindHitsByCountryQuery } from "@/services/api/analytics/queries"
import { Skeleton } from "@/components/ui/skeleton"


const keys = {
  countries: "countries",
  cities: "cities",
} as const

const keyLabels = {
  [keys.countries]: "País",
  [keys.cities]: "Cidade",
} as const

const defaultData = [] as LocationClicksItem[]

const dots = '...' as const

function buildPageItems (current: number, total: number): (number | '...')[] {
  if (total <= 7) return Array.from({ length: total }, (_, i) => i)

  const items: (number | typeof dots)[] = [0]

  if (current > 3) items.push(dots)

  const start = Math.max(1, current - 1)
  const end = Math.min(total - 2, current + 1)
  for (let i = start; i <= end; i++) items.push(i)

  if (current < total - 4) items.push(dots)

  items.push(total - 1)
  return items
}

export function HitsByLocationCard () {
  "use no memo"

  const [countryPagination, setCountryPagination] = useState<OffsetPaginationParams>({})
  const [cityPagination, setCityPagination] = useState<OffsetPaginationParams>({})

  const [key, setKey] = useState<keyof typeof keys>(keys.countries)

  const dispatchers = {
    [keys.countries]: setCountryPagination,
    [keys.cities]: setCityPagination,
  }

  const currentDispatcher = dispatchers[key]

  const currentKeyLabel = keyLabels[key]
  
  const {
    data: cities,
    isPending: isCitiesPending
  } = useFindHitsByCityQuery(
    cityPagination,
    key === keys.cities
  )

  const { 
    data: countries,
    isPending: isCountriesPending
  } = useFindHitsByCountryQuery(
    countryPagination,
    key === keys.countries
  )

  const isPending = key === keys.cities ? isCitiesPending : isCountriesPending

  const {
    data,
    total,
    limit,
    offset
  } = (key === keys.cities ? cities : countries) || {}

  const totalPages = (() => {
    if (!total) return 0
    const pageSize = limit || 10
    return Math.ceil(total / pageSize)
  })()

  const tableData = useMemo(() => (data || defaultData).map(item => ({
    ...item,
    name: item.name ?? 'Desconhecido',
  })), [data])
  
  const columns: ColumnDef<LocationClicksItem>[] = useMemo(() => [
    {
      accessorKey: "name",
      header: currentKeyLabel,
    },
    {
      accessorKey: "clicks",
      header: "Total de clicks",
    }
  ], [currentKeyLabel])

  const table = useReactTable({
    columns,
    data: tableData,
    getCoreRowModel: getCoreRowModel()
  })

  const currentPagination = key === keys.countries ? countryPagination : cityPagination

  const pageSize = limit || 10
  const currentPageIndex = Math.floor((offset || 0) / pageSize)

  const handleChangeParams = <T extends OffsetPaginationParams, K extends keyof T>
    (
      key: K,
      value: T[K],
      dispatcher: Dispatch<React.SetStateAction<OffsetPaginationParams>>
    ) => {
    dispatcher({
      ...currentPagination,
      [key]: value
    })
  }

  const handleForwardPage = () => {
    if (currentPageIndex < totalPages - 1) {
      handleChangeParams('offset', (currentPagination?.offset || 0) + pageSize, currentDispatcher)
    }
  }

  const handleBackPage = () => {
    if (currentPageIndex > 0) {
      handleChangeParams('offset', (currentPagination?.offset || 0) - pageSize, currentDispatcher)
    }
  }

  const handlePageClick = (pageIndex: number) => {
    handleChangeParams('offset', pageIndex * pageSize, currentDispatcher)
  }

  return (
    <section className="p-4 rounded-md bg-card w-full">
      <h2 className="text-lg font-semibold">Total de clicks por localização</h2>
      <div className="w-full my-3.5">
        <ToggleGroup 
          type="single"
          value={key}
          onValueChange={value => value && setKey(value as keyof typeof keys)}
          className="w-full bg-background p-1 rounded-2xl"
        >
          {Object.values(keys).map(value => (
            <ToggleGroupItem
              key={value}
              value={value}
              onClick={() => setKey(value)}
              // className="data-[state=on]:bg-primary data-[state=on]:text-primary-foreground"
              className="flex-1 data-[state=on]:bg-accent rounded-2xl!"
            >
              {keyLabels[value]}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      </div>

      <Table className="mt-6">
        <TableHeader>
          {table.getHeaderGroups().map(headerGroup => (
            <TableRow key={headerGroup.id} className="border-none hover:bg-unset">
              {headerGroup.headers.map(header => (
                <TableHead key={header.id}>
                  {header.isPlaceholder ? null : flexRender(
                    header.column.columnDef.header,
                    header.getContext()
                  )}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>

        <TableBody>
          {table.getRowModel().rows.map(row => (
            <TableRow 
              key={row.id} 
              className={cn(
                'hover:bg-unset border-b border-outline',
                { 'bg-accent': isOdd(row.index) }
              )}
            >
              {row.getVisibleCells().map(cell => (
                <TableCell key={cell.id} className="py-2.5 border-outline">
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {isPending && (
        <Skeleton className="w-full h-48" />
      )}
      {isPending || totalPages > 1 && (
        <div className="flex items-center justify-between gap-6 mt-8">
          <span className="text-sm font-semibold">Total de registros: {total}</span>
          <div className="flex justify-end gap-1">
            <IconButton 
              icon={{
                name: 'ChevronLeft'
              }}
              onClick={handleBackPage}
            />
            {buildPageItems(currentPageIndex, totalPages).map((item, i) =>
              item === dots ? (
                <span key={`ellipsis-${i}`} className="w-8 h-8 flex items-center justify-center text-sm text-muted-foreground">
                  {dots}
                </span>
              ) : (
                <button
                  key={item}
                  onClick={() => handlePageClick(item)}
                  className={cn(
                    'w-8 h-8 rounded text-sm',
                    currentPageIndex === item
                      ? 'bg-primary-500 font-semibold'
                      : 'hover:bg-accent/50'
                  )}
                >
                  {item + 1}
                </button>
              )
            )}
            <IconButton
              icon={{
                name: 'ChevronRight'
              }}
              onClick={handleForwardPage}
            />
          </div>
        </div>
      )}
    </section>
  )
}