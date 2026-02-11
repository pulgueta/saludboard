import { Card, CardContent, CardHeader, CardTitle } from "@ui/card";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@ui/chart";
import type { FC } from "react";
import { useMemo, useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { DateRangeToggle } from "@/components/primitives/date-range-toggle";
import {
  type AppointmentDataPoint,
  generateAppointmentData,
} from "@/lib/dashboard-mock-data";

const chartConfig = {
  total: {
    label: "Total",
    color: "var(--color-primary)",
  },
  completed: {
    label: "Completadas",
    color: "var(--color-chart-success)",
  },
  cancelled: {
    label: "Canceladas",
    color: "var(--color-chart-destructive)",
  },
} satisfies ChartConfig;

function formatDateLabel(isoString: string): string {
  const date = new Date(isoString);
  return new Intl.DateTimeFormat("es-CO", {
    day: "numeric",
    month: "short",
  }).format(date);
}

/**
 * Area chart showing appointment trends over a selectable date range.
 * Three series: total, completed, cancelled.
 */
export const AppointmentChart: FC = () => {
  const [days, setDays] = useState(14);

  const data: AppointmentDataPoint[] = useMemo(
    () => generateAppointmentData(days),
    [days],
  );

  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between">
        <CardTitle>Citas</CardTitle>
        <DateRangeToggle value={days} onChange={setDays} />
      </CardHeader>
      <CardContent className="p-0 px-4 pb-4">
        <ChartContainer
          config={chartConfig}
          className="aspect-auto h-[260px] w-full"
        >
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 0 }}
          >
            <defs>
              <linearGradient id="fillTotal" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-primary)"
                  stopOpacity={0.02}
                />
              </linearGradient>
              <linearGradient id="fillCompleted" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-success)"
                  stopOpacity={0.2}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-success)"
                  stopOpacity={0.02}
                />
              </linearGradient>
              <linearGradient id="fillCancelled" x1="0" y1="0" x2="0" y2="1">
                <stop
                  offset="5%"
                  stopColor="var(--color-chart-destructive)"
                  stopOpacity={0.15}
                />
                <stop
                  offset="95%"
                  stopColor="var(--color-chart-destructive)"
                  stopOpacity={0.02}
                />
              </linearGradient>
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              tickFormatter={formatDateLabel}
              interval="preserveStartEnd"
            />
            <ChartTooltip
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => formatDateLabel(String(value))}
                  indicator="dot"
                />
              }
            />
            <Area
              dataKey="total"
              type="monotone"
              fill="url(#fillTotal)"
              stroke="var(--color-primary)"
              strokeWidth={2}
            />
            <Area
              dataKey="completed"
              type="monotone"
              fill="url(#fillCompleted)"
              stroke="var(--color-chart-success)"
              strokeWidth={2}
            />
            <Area
              dataKey="cancelled"
              type="monotone"
              fill="url(#fillCancelled)"
              stroke="var(--color-chart-destructive)"
              strokeWidth={1.5}
              strokeDasharray="4 4"
            />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
