import { getGenreBreakdown, getKpis, getRatingDistribution, getRevenueByYear } from "@/lib/api";
import { PageNav } from "@/components/nav/PageNav";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { RevenueByYearChart } from "@/components/dashboard/RevenueByYearChart";
import { RatingDistributionChart } from "@/components/dashboard/RatingDistributionChart";
import { GenreBreakdownChart } from "@/components/dashboard/GenreBreakdownChart";

// Rendered per-request rather than at build time: the backend isn't reachable
// during the frontend's own build/deploy (they ship to Vercel and Render independently).
// Individual fetches still cache/revalidate hourly via lib/api.ts.
export const dynamic = "force-dynamic";

export default async function DashboardPage() {
  const [kpis, revenueByYear, ratingDistribution, genreBreakdown] = await Promise.all([
    getKpis(),
    getRevenueByYear(),
    getRatingDistribution(),
    getGenreBreakdown(),
  ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <PageNav />
      <h1 className="font-display text-4xl font-semibold text-forest-dark dark:text-cloud">
        Analytics Dashboard
      </h1>
      <p className="mt-2 text-forest/70 dark:text-cloud/60">
        A data-driven look at the Studio Ghibli catalog — ratings, box office, and genres.
      </p>

      <div className="mt-8">
        <KpiRow kpis={kpis} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <RevenueByYearChart data={revenueByYear} />
        <RatingDistributionChart data={ratingDistribution} />
        <div className="lg:col-span-2">
          <GenreBreakdownChart data={genreBreakdown} />
        </div>
      </div>
    </main>
  );
}
