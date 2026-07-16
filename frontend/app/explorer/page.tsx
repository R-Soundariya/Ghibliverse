import { getMovies } from "@/lib/api";
import { PageNav } from "@/components/nav/PageNav";
import { MovieExplorerClient } from "@/components/explorer/MovieExplorerClient";

// Rendered per-request rather than at build time: the backend isn't reachable
// during the frontend's own build/deploy (they ship to Vercel and Render independently).
export const dynamic = "force-dynamic";

export default async function ExplorerPage() {
  const { data: movies } = await getMovies();

  return (
    <main className="mx-auto max-w-6xl px-6 py-12">
      <PageNav />
      <h1 className="font-display text-4xl font-semibold text-forest-dark dark:text-cloud">
        Movie Explorer
      </h1>
      <p className="mt-2 text-forest/70 dark:text-cloud/60">
        Browse the Studio Ghibli catalog — search, filter by genre, or sort by rating,
        release year, and box office.
      </p>
      <div className="mt-8">
        <MovieExplorerClient movies={movies} />
      </div>
    </main>
  );
}
