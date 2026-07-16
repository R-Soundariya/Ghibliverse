"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import type { RevenueByYear } from "@/lib/types";

const compactUsd = (value: number) =>
  new Intl.NumberFormat("en-US", { notation: "compact", style: "currency", currency: "USD" }).format(
    value
  );

export function RevenueByYearChart({ data }: { data: RevenueByYear[] }) {
  return (
    <Card className="viz-root p-5">
      <h3 className="mb-4 text-sm font-medium text-[var(--text-secondary)]">
        Box office &amp; budget by release year
      </h3>
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data} barGap={2} barCategoryGap="20%">
          <CartesianGrid vertical={false} stroke="var(--gridline)" />
          <XAxis
            dataKey="release_year"
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--baseline)" }}
            tickLine={false}
          />
          <YAxis
            tickFormatter={compactUsd}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
            width={56}
          />
          <Tooltip
            formatter={(value: number) => compactUsd(value)}
            contentStyle={{
              background: "var(--surface-1)",
              border: "1px solid var(--gridline)",
              borderRadius: 8,
              color: "var(--text-primary)",
            }}
          />
          <Legend wrapperStyle={{ fontSize: 12, color: "var(--text-secondary)" }} />
          <Bar
            dataKey="box_office_usd"
            name="Box office"
            fill="var(--series-1)"
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
          />
          <Bar
            dataKey="budget_usd"
            name="Budget"
            fill="var(--series-2)"
            radius={[4, 4, 0, 0]}
            maxBarSize={24}
          />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
