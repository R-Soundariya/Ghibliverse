import {
  getDirectorPerformance,
  getKpis,
  getMovieComparison,
  getRoiLeaderboard,
  getSuccessFactors,
} from "@/lib/api";
import { PageNav } from "@/components/nav/PageNav";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { DirectorPerformanceChart } from "@/components/executive/DirectorPerformanceChart";
import { RoiLeaderboardChart } from "@/components/executive/RoiLeaderboardChart";
import { SuccessFactorsPanel } from "@/components/executive/SuccessFactorsPanel";
import { MovieComparisonTable } from "@/components/executive/MovieComparisonTable";

// Rendered per-request rather than at build time: the backend isn't reachable
// during the frontend's own build/deploy (they ship to Vercel and Render independently).
export const dynamic = "force-dynamic";

export default async function ExecutivePage() {
  const [kpis, directorPerformance, roiLeaderboard, successFactors, movieComparison] =
    await Promise.all([
      getKpis(),
      getDirectorPerformance(),
      getRoiLeaderboard(),
      getSuccessFactors(),
      getMovieComparison(),
    ]);

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <PageNav />
      <h1 className="font-display text-4xl font-semibold text-forest-dark dark:text-cloud">
        Executive Dashboard
      </h1>
      <p className="mt-2 text-forest/70 dark:text-cloud/60">
        Comparing every Studio Ghibli film head-to-head and surfacing what drove their
        commercial and critical success.
      </p>

      <div className="mt-8">
        <KpiRow kpis={kpis} />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-2">
        <DirectorPerformanceChart data={directorPerformance} />
        <RoiLeaderboardChart data={roiLeaderboard} />
      </div>

      <div className="mt-6">
        <SuccessFactorsPanel correlations={successFactors.correlations} />
      </div>

      <div className="mt-6">
        <MovieComparisonTable rows={movieComparison} />
      </div>
    </main>
  );
}
