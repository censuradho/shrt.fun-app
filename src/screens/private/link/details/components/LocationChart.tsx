import { type ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { ToggleGroupItem, ToggleGroup } from "@/components/ui/toggle-group"
import type { HitsCountByLocation } from "@/services/api/analytics/types"
import { useState } from "react"
import { Bar, BarChart, CartesianGrid, LabelList, XAxis, YAxis } from "recharts"

interface LocationData {
  data: HitsCountByLocation[]
}

const keys = {
  country: 'country',
  city: 'city'
} as const

export function LocationChart (props: LocationData) {
  const { data } = props

  const [key, setKey] = useState<keyof typeof keys>('country')

  const charData = data.map(item => {
    return ({
      clicks: item.clicks,
      country: item.country || 'Desconecido',
      city: item.city || 'Desconecido',
    })
  })



  const chartConfig = {
    clicks: {
      color: 'var(--blitzit-pink)',
      label: 'Cliques'
    }
  } satisfies ChartConfig

  return (
    <div className="p-4 bg-card rounded-md flex flex-col gap-4 w-full">
      <header className="flex justify-between items-center">
        <h2 className="text-lg font-semibold">
          Localização dos cliques
        </h2>
        <ToggleGroup 
          size="lg"  
          value={key}
          onValueChange={(value) => setKey(value as keyof typeof keys)}
          type="single"
        >
          <ToggleGroupItem value={keys.city}>Cidade</ToggleGroupItem>
          <ToggleGroupItem value={keys.country}>País</ToggleGroupItem>
        </ToggleGroup>
      </header>
      <ChartContainer config={chartConfig} className="h-64 w-full">
        <BarChart
          accessibilityLayer
          data={charData}
          margin={{ left: 16, right: 16 }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            type="category"
            dataKey="city"
            tickLine={false}
            axisLine={false}
            tick={{ fontSize: 12 }}
          />
          <YAxis type="number" dataKey="clicks" hide />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="clicks" fill="var(--blitzit-pink)" radius={4} barSize={40}>
            <LabelList
              dataKey="clicks"
              position="centerTop"
              className="fill-(--color-foreground)"
              fontSize={12}
            />
            <LabelList
              dataKey="clicks"
              position="top"
              className="fill-foreground"
              fontSize={12}
            />
          </Bar>
        </BarChart>
      </ChartContainer>
    </div>
  )
}
