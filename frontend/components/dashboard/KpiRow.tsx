import { Card } from "@/components/ui/Card";
import { formatRating, formatUsdCompact } from "@/lib/format";
import type { KpiSummary } from "@/lib/types";

function StatTile({ label, value, sublabel }: { label: string; value: string; sublabel?: string }) {
  return (
    <Card className="p-5">
      <p className="text-sm text-forest/70 dark:text-cloud/60">{label}</p>
      <p className="mt-1 text-3xl font-semibold text-forest-dark dark:text-cloud">{value}</p>
      {sublabel && <p className="mt-1 truncate text-sm text-forest/60 dark:text-cloud/50">{sublabel}</p>}
    </Card>
  );
}

export function KpiRow({ kpis }: { kpis: KpiSummary }) {
  return (
    <div>
      <p className="mb-3 text-sm text-forest/60 dark:text-cloud/50">Across {kpis.total_movies} films</p>
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <StatTile label="Average IMDb rating" value={formatRating(kpis.avg_imdb_rating)} />
        <StatTile
          label="Highest grossing"
          value={formatUsdCompact(kpis.highest_grossing.value)}
          sublabel={kpis.highest_grossing.title}
        />
        <StatTile
          label="Most awarded"
          value={String(kpis.most_awarded.value)}
          sublabel={kpis.most_awarded.title}
        />
        <StatTile
          label="Highest rated"
          value={formatRating(kpis.highest_rated.value)}
          sublabel={kpis.highest_rated.title}
        />
      </div>
    </div>
  );
}
