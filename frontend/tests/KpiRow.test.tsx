import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { KpiRow } from "@/components/dashboard/KpiRow";
import { formatUsdCompact } from "@/lib/format";
import type { KpiSummary } from "@/lib/types";

const kpis: KpiSummary = {
  avg_imdb_rating: 7.62,
  total_movies: 22,
  highest_grossing: { slug: "spirited-away", title: "Spirited Away", value: 395_000_000 },
  most_awarded: { slug: "spirited-away", title: "Spirited Away", value: 7 },
  highest_rated: { slug: "spirited-away", title: "Spirited Away", value: 8.6 },
};

describe("KpiRow", () => {
  it("renders four stat tiles with formatted values", () => {
    render(<KpiRow kpis={kpis} />);

    expect(screen.getByText("Across 22 films")).toBeInTheDocument();
    expect(screen.getByText("7.6")).toBeInTheDocument(); // avg rating, 1 decimal
    expect(
      screen.getByText(formatUsdCompact(kpis.highest_grossing.value))
    ).toBeInTheDocument(); // highest grossing, compact
    expect(screen.getByText("7")).toBeInTheDocument(); // most awarded count
    expect(screen.getByText("8.6")).toBeInTheDocument(); // highest rated
    expect(screen.getAllByText("Spirited Away").length).toBe(3);
  });
});
