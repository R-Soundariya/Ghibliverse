import { MovieCard } from "./MovieCard";
import type { MovieCard as MovieCardType } from "@/lib/types";

export function MovieGrid({ movies }: { movies: MovieCardType[] }) {
  if (movies.length === 0) {
    return (
      <p className="py-16 text-center text-forest/70 dark:text-cloud/60">
        No movies match your filters.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-3 lg:grid-cols-4">
      {movies.map((movie) => (
        <MovieCard key={movie.slug} movie={movie} />
      ))}
    </div>
  );
}
