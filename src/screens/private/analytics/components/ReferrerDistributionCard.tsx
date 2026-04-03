import { useMemo } from "react";
import { Label, Pie, PieChart } from "recharts";

import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from "@/components/ui/chart";

import { useReferrerDistributionQuery } from "@/services/api/analytics/queries";
import type { BaseCardProps } from "./types";
import { Skeleton } from "@/components/ui/skeleton";

const CHART_COLORS = [
  "var(--blitzit-green)",
  "var(--blitzit-pink)",
  "var(--blitzit-blue)",
  "var(--blitzit-green-dark)",
  "var(--blitzit-teal)",
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
]

export function ReferrerDistributionCard({ className }: BaseCardProps) {
  const { 
    data,
    isPending
  } = useReferrerDistributionQuery()

  const chartData = useMemo(() => {
    const total = (data || []).reduce((sum, item) => sum + item.hitsCount, 0)
    return (data || []).map((item, index) => ({
      referrer: item.referrer ?? 'Direto',
      hitsCount: item.hitsCount,
      percentage: total > 0 ? parseFloat(((item.hitsCount / total) * 100).toFixed(1)) : 0,
      fill: item.referrer === 'Other' ? 'var(--accent)' : CHART_COLORS[index % CHART_COLORS.length],
    }))
  }, [data])

  const chartConfig = useMemo(() => {
    const config: ChartConfig = {
      percentage: { label: "%" },
      hitsCount: { label: "Cliques" },
    }
    chartData.forEach((item, index) => {
      config[item.referrer] = {
        label: item.referrer,
        color: CHART_COLORS[index % CHART_COLORS.length],
      }
    })
    return config
  }, [chartData])

  const renderLegend = chartData.map((entry, index) => (
    <li key={index} className="text-sm flex items-center justify-between gap-4 w-full border-b border-outline py-2 first:pt-0 last:border-b-0">
      <span className="text-card-foreground flex items-start gap-2 min-w-0">
        <span className="inline-block shrink-0 w-3 h-3 mt-1 rounded-full" style={{ backgroundColor: entry.fill }} />
        <span className="break-all">{entry.referrer}</span>
      </span>
      <span className="shrink-0 text-muted-foreground font-medium">{entry.percentage}%</span>
    </li>
  ))

  return (
    <section className={`p-4 card w-full flex flex-col gap-8 ${className}`}>
      <h2 className="text-xxs uppercase">
        Distribuição por Referencia
      </h2>
      {isPending && (
        <Skeleton className="mx-auto aspect-square h-60" />
      )}
      {!isPending && !data?.length && (
        <p className="text-center text-muted-foreground">Nenhum dado disponível</p>
      )}
      {!isPending && !!data?.length && (
        <div className="flex flex-col items-center lg:flex-row lg:items-start gap-6">
          <ChartContainer
            config={chartConfig}
            className="aspect-square w-full max-w-60 shrink-0 [&_.recharts-text]:fill-background"
          >
            <PieChart>
              <ChartTooltip
                content={<ChartTooltipContent nameKey="referrer" hideLabel />}
              />
              <Pie data={chartData} dataKey="percentage" innerRadius={60}>
                <Label
                  content={({ viewBox }) => {
                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                      return (
                        <text
                          x={viewBox.cx}
                          y={viewBox.cy}
                          textAnchor="middle"
                          dominantBaseline="middle"
                        >
                          <tspan
                            x={viewBox.cx}
                            y={viewBox.cy}
                            className="fill-foreground text-3xl font-bold"
                          >
                            {data?.reduce((sum, item) => sum + item.hitsCount, 0) || 0}
                          </tspan>
                          <tspan
                            x={viewBox.cx}
                            y={(viewBox.cy || 0) + 24}
                            className="fill-muted-foreground"
                          >
                          Visitantes
                          </tspan>
                        </text>
                      )
                    }
                  }}
                />
              </Pie>
            </PieChart>
          </ChartContainer>
          <ul className="w-full min-w-0">{renderLegend}</ul>
        </div>
      )}

    </section>
  )
}
