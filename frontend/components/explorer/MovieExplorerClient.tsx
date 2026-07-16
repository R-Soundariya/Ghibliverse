"use client";

import { useMemo, useState } from "react";
import { FilterBar, type SortOption } from "./FilterBar";
import { MovieGrid } from "./MovieGrid";
import type { MovieCard } from "@/lib/types";

const SORTERS: Record<Exclude<SortOption, "">, (a: MovieCard, b: MovieCard) => number> = {
  rating_desc: (a, b) => (b.imdb_rating ?? 0) - (a.imdb_rating ?? 0),
  year_desc: (a, b) => b.release_year - a.release_year,
  revenue_desc: (a, b) => (b.box_office_usd ?? 0) - (a.box_office_usd ?? 0),
};

export function MovieExplorerClient({ movies }: { movies: MovieCard[] }) {
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [sort, setSort] = useState<SortOption>("");

  const genres = useMemo(
    () => Array.from(new Set(movies.flatMap((m) => m.genres))).sort(),
    [movies]
  );

  const filtered = useMemo(() => {
    let result = movies;
    if (search.trim()) {
      const q = search.trim().toLowerCase();
      result = result.filter((m) => m.title.toLowerCase().includes(q));
    }
    if (genre) {
      result = result.filter((m) => m.genres.includes(genre));
    }
    if (sort) {
      result = [...result].sort(SORTERS[sort]);
    }
    return result;
  }, [movies, search, genre, sort]);

  return (
    <div>
      <FilterBar
        search={search}
        onSearchChange={setSearch}
        genre={genre}
        onGenreChange={setGenre}
        genres={genres}
        sort={sort}
        onSortChange={setSort}
      />
      <MovieGrid movies={filtered} />
    </div>
  );
}
