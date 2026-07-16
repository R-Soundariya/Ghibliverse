"use client";

import { useMemo, useState } from "react";
import { Card } from "@/components/ui/Card";
import { formatRating, formatUsdCompact } from "@/lib/format";
import type { MovieComparisonRow } from "@/lib/types";

type SortKey = keyof Pick<
  MovieComparisonRow,
  | "title"
  | "release_year"
  | "director"
  | "budget_usd"
  | "box_office_usd"
  | "roi_multiple"
  | "imdb_rating"
  | "rotten_tomatoes_score"
  | "awards_count"
>;

const COLUMNS: { key: SortKey; label: string; align?: "right" }[] = [
  { key: "title", label: "Title" },
  { key: "release_year", label: "Year", align: "right" },
  { key: "director", label: "Director" },
  { key: "budget_usd", label: "Budget", align: "right" },
  { key: "box_office_usd", label: "Box office", align: "right" },
  { key: "roi_multiple", label: "ROI", align: "right" },
  { key: "imdb_rating", label: "IMDb", align: "right" },
  { key: "rotten_tomatoes_score", label: "RT score", align: "right" },
  { key: "awards_count", label: "Awards", align: "right" },
];

function cellValue(row: MovieComparisonRow, key: SortKey): string {
  switch (key) {
    case "title":
      return row.title;
    case "release_year":
      return String(row.release_year);
    case "director":
      return row.director ?? "—";
    case "budget_usd":
      return formatUsdCompact(row.budget_usd);
    case "box_office_usd":
      return formatUsdCompact(row.box_office_usd);
    case "roi_multiple":
      return row.roi_multiple !== null ? `${row.roi_multiple}×` : "—";
    case "imdb_rating":
      return formatRating(row.imdb_rating);
    case "rotten_tomatoes_score":
      return row.rotten_tomatoes_score !== null ? `${row.rotten_tomatoes_score}%` : "—";
    case "awards_count":
      return String(row.awards_count);
    default:
      return "—";
  }
}

export function MovieComparisonTable({ rows }: { rows: MovieComparisonRow[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("release_year");
  const [sortDir, setSortDir] = useState<"asc" | "desc">("asc");

  const sorted = useMemo(() => {
    const withIndex = rows.map((row, index) => ({ row, index }));
    withIndex.sort((a, b) => {
      const aValue = a.row[sortKey];
      const bValue = b.row[sortKey];
      if (aValue === null && bValue === null) return a.index - b.index;
      if (aValue === null) return 1;
      if (bValue === null) return -1;

      const comparison =
        typeof aValue === "string" && typeof bValue === "string"
          ? aValue.localeCompare(bValue)
          : Number(aValue) - Number(bValue);

      return sortDir === "asc" ? comparison : -comparison;
    });
    return withIndex.map(({ row }) => row);
  }, [rows, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  return (
    <Card className="p-5">
      <h3 className="mb-4 text-sm font-medium text-forest/70 dark:text-cloud/60">
        Full film comparison
      </h3>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse text-sm">
          <thead>
            <tr className="border-b border-forest/10 dark:border-cloud/10">
              {COLUMNS.map((col) => (
                <th
                  key={col.key}
                  onClick={() => toggleSort(col.key)}
                  className={`cursor-pointer select-none whitespace-nowrap px-3 py-2 font-medium text-forest/60 hover:text-forest-dark dark:text-cloud/50 dark:hover:text-cloud ${
                    col.align === "right" ? "text-right" : "text-left"
                  }`}
                >
                  {col.label}
                  {sortKey === col.key && (sortDir === "asc" ? " ▲" : " ▼")}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {sorted.map((row) => (
              <tr
                key={row.slug}
                className="border-b border-forest/5 last:border-0 dark:border-cloud/5"
              >
                {COLUMNS.map((col) => (
                  <td
                    key={col.key}
                    className={`whitespace-nowrap px-3 py-2 text-forest-dark dark:text-cloud ${
                      col.align === "right" ? "text-right" : "text-left"
                    }`}
                  >
                    {cellValue(row, col.key)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </Card>
  );
}
