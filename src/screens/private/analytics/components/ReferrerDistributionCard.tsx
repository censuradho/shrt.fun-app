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
  const { data } = useReferrerDistributionQuery()

  const chartData = useMemo(() =>
    (data || []).map((item, index) => ({
      referrer: item.referrer ?? 'Direto',
      hitsCount: item.hitsCount,
      fill: CHART_COLORS[index % CHART_COLORS.length],
    })),
  [data]
  )

  console.log(chartData)

  const chartConfig = useMemo(() => {
    const config: ChartConfig = { hitsCount: { label: "Cliques" } }
    chartData.forEach((item, index) => {
      config[item.referrer] = {
        label: item.referrer,
        color: CHART_COLORS[index % CHART_COLORS.length],
      }
    })
    return config
  }, [chartData])

  return (
    <section className={`p-4 card w-full flex flex-col gap-8 ${className}`}>
      <h2 className="text-xxs uppercase">
        Distribuição por Referencia
      </h2>
      <ChartContainer
        config={chartConfig}
        className="mx-auto aspect-square h-60 [&_.recharts-text]:fill-background"
      >
        <PieChart>
          <ChartTooltip
            content={<ChartTooltipContent nameKey="referrer" hideLabel />}
          />
          <Pie data={chartData} dataKey="hitsCount" innerRadius={60}>
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
    </section>
  )
}
