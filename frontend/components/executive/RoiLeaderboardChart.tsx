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
import { formatUsdCompact } from "@/lib/format";
import type { RoiEntry } from "@/lib/types";

export function RoiLeaderboardChart({ data }: { data: RoiEntry[] }) {
  const top = data.slice(0, 8);
  const height = Math.max(280, top.length * 36);

  return (
    <Card className="viz-root p-5">
      <h3 className="mb-4 text-sm font-medium text-[var(--text-secondary)]">
        Return on investment — box office ÷ budget
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={top} layout="vertical" margin={{ right: 40 }}>
          <CartesianGrid horizontal={false} stroke="var(--gridline)" />
          <XAxis
            type="number"
            tickFormatter={(value: number) => `${value}×`}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--baseline)" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="title"
            width={150}
            tick={{ fill: "var(--text-primary)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            formatter={(value: number, _name, item) => [
              `${value}× (${formatUsdCompact(item.payload.box_office_usd)} on ${formatUsdCompact(
                item.payload.budget_usd
              )} budget)`,
              "ROI",
            ]}
            contentStyle={{
              background: "var(--surface-1)",
              border: "1px solid var(--gridline)",
              borderRadius: 8,
              color: "var(--text-primary)",
            }}
          />
          <Bar dataKey="roi_multiple" name="ROI" fill="var(--series-2)" radius={[0, 4, 4, 0]} maxBarSize={18}>
            <LabelList
              dataKey="roi_multiple"
              position="right"
              fill="var(--text-secondary)"
              fontSize={12}
              formatter={(value: number) => `${value}×`}
            />
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
