"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card } from "@/components/ui/Card";
import { formatUsdCompact } from "@/lib/format";
import type { DirectorPerformance } from "@/lib/types";

export function DirectorPerformanceChart({ data }: { data: DirectorPerformance[] }) {
  const height = Math.max(280, data.length * 40);

  return (
    <Card className="viz-root p-5">
      <h3 className="mb-4 text-sm font-medium text-[var(--text-secondary)]">
        Director track record — average IMDb rating
      </h3>
      <ResponsiveContainer width="100%" height={height}>
        <BarChart data={data} layout="vertical" margin={{ right: 24 }}>
          <CartesianGrid horizontal={false} stroke="var(--gridline)" />
          <XAxis
            type="number"
            domain={[0, 10]}
            tick={{ fill: "var(--text-muted)", fontSize: 12 }}
            axisLine={{ stroke: "var(--baseline)" }}
            tickLine={false}
          />
          <YAxis
            type="category"
            dataKey="director"
            width={130}
            tick={{ fill: "var(--text-primary)", fontSize: 12 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            content={({ active, payload }) => {
              if (!active || !payload?.length) return null;
              const row = payload[0].payload as DirectorPerformance;
              return (
                <div
                  className="rounded-lg border px-3 py-2 text-sm"
                  style={{
                    background: "var(--surface-1)",
                    borderColor: "var(--gridline)",
                    color: "var(--text-primary)",
                  }}
                >
                  <p className="font-medium">{row.director}</p>
                  <p className="text-[var(--text-secondary)]">
                    {row.movie_count} film{row.movie_count === 1 ? "" : "s"} · avg rating{" "}
                    {row.avg_imdb_rating?.toFixed(1) ?? "—"}
                  </p>
                  <p className="text-[var(--text-secondary)]">
                    Total box office {formatUsdCompact(row.total_box_office_usd)}
                  </p>
                </div>
              );
            }}
          />
          <Bar dataKey="avg_imdb_rating" name="Avg IMDb rating" fill="var(--series-1)" radius={[0, 4, 4, 0]} maxBarSize={20} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
}
