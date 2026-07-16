"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import type { GenreBreakdown } from "@/lib/types";

export function GenreBreakdownChart({ data }: { data: GenreBreakdown[] }) {
  const height = Math.max(280, data.length * 32);

  return (
    <Card className="viz-root p-5">
      <h3 className="mb-4 text-sm font-medium text-[var(--text-secondary)]">Movies by genre</h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ right: 24 }}>
          <CartesianGrid horizontal={false} stroke="var(--gridline)" />
          <XAxis
            type="number"
            allowDecimals={false}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--baseline)" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="genre"
            width={110}
            tick={{ fill: "var(--text-primary)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number) => [value, "Movies"]}
            contentStyle={{
              background: "var(--surface-1)",
              border: "1px solid var(--gridline)",
              borderRadius: 8,
              color: "var(--text-primary)",
            }}
          />
          <Bar dataKey="count" name="Movies" fill="var(--series-1)" radius={[0, 4, 4, 0]} maxBarSize={20}>
            <LabelList dataKey="count" position="right" fill="var(--text-secondary)" fontSize={12} />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
