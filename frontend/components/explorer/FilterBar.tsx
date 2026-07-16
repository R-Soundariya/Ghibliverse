"use client";

export type SortOption = "" | "rating_desc" | "year_desc" | "revenue_desc";

export function FilterBar({
  search,
  onSearchChange,
  genre,
  onGenreChange,
  genres,
  sort,
  onSortChange,
}: {
  search: string;
  onSearchChange: (value: string) => void;
  genre: string;
  onGenreChange: (value: string) => void;
  genres: string[];
  sort: SortOption;
  onSortChange: (value: SortOption) => void;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center">
      <input
        type="search"
        value={search}
        onChange={(e) => onSearchChange(e.target.value)}
        placeholder="Search movies..."
        className="w-full rounded-full border border-forest/20 bg-white px-4 py-2 text-sm text-forest-dark focus:outline-none focus:ring-2 focus:ring-forest/40 dark:border-cloud/20 dark:bg-night-canopy dark:text-cloud sm:w-64"
      />

      <div className="flex flex-wrap gap-2">
        <button
          onClick={() => onGenreChange("")}
          className={`rounded-full px-3 py-1 text-sm ${genre === "" ? "bg-forest text-cloud" : "border border-forest/20 bg-white text-forest-dark dark:border-cloud/20 dark:bg-night-canopy dark:text-cloud"}`}
        >
          All genres
        </button>
        {genres.map((g) => (
          <button
            key={g}
            onClick={() => onGenreChange(g)}
            className={`rounded-full px-3 py-1 text-sm ${genre === g ? "bg-forest text-cloud" : "border border-forest/20 bg-white text-forest-dark dark:border-cloud/20 dark:bg-night-canopy dark:text-cloud"}`}
          >
            {g}
          </button>
        ))}
      </div>

      <select
        value={sort}
        onChange={(e) => onSortChange(e.target.value as SortOption)}
        className="ml-auto rounded-full border border-forest/20 bg-white px-4 py-2 text-sm text-forest-dark focus:outline-none focus:ring-2 focus:ring-forest/40 dark:border-cloud/20 dark:bg-night-canopy dark:text-cloud"
      >
        <option value="">Sort by...</option>
        <option value="rating_desc">Highest rated</option>
        <option value="year_desc">Newest first</option>
        <option value="revenue_desc">Highest grossing</option>
      </select>
    </div>
  );
}
