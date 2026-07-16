import { Card } from "@/components/ui/Card";
import type { CorrelationInsight } from "@/lib/types";

function strengthBadge(correlation: number) {
  const magnitude = Math.abs(correlation);
  if (magnitude >= 0.6) {
    return "bg-forest/15 text-forest-dark dark:bg-firefly/20 dark:text-firefly";
  }
  if (magnitude >= 0.3) {
    return "bg-sakura-light text-forest-dark dark:bg-cloud/10 dark:text-cloud";
  }
  return "bg-forest/5 text-forest/60 dark:bg-cloud/5 dark:text-cloud/50";
}

export function SuccessFactorsPanel({ correlations }: { correlations: CorrelationInsight[] }) {
  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-medium text-forest/70 dark:text-cloud/60">
        Factors behind their success
      </h3>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {correlations.map((row) => (
          <div key={row.label} className="rounded-xl border border-forest/10 p-4 dark:border-cloud/10">
            <div className="flex items-center justify-between gap-2">
              <p className="text-sm font-medium text-forest-dark dark:text-cloud">{row.label}</p>
              <span
                className={`shrink-0 rounded-full px-2 py-0.5 text-xs font-semibold ${strengthBadge(
                  row.correlation
                )}`}
              >
                r = {row.correlation.toFixed(2)}
              </span>
            </div>
            <p className="mt-2 text-sm text-forest/70 dark:text-cloud/60">{row.insight}</p>
          </div>
        ))}
      </div>
    </Card>
  );
}
