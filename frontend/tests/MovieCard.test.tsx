import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { MovieCard } from "@/components/explorer/MovieCard";
import { formatUsdCompact } from "@/lib/format";
import type { MovieCard as MovieCardType } from "@/lib/types";

const movie: MovieCardType = {
  id: 1,
  slug: "spirited-away",
  title: "Spirited Away",
  poster_url: null,
  release_year: 2001,
  imdb_rating: 8.6,
  box_office_usd: 395_000_000,
  awards_count: 7,
  genres: ["Fantasy", "Adventure"],
};

describe("MovieCard", () => {
  it("renders the title, release year, and genre badges", () => {
    render(<MovieCard movie={movie} />);

    expect(screen.getAllByText("Spirited Away").length).toBeGreaterThan(0);
    expect(screen.getByText("2001")).toBeInTheDocument();
    expect(screen.getByText("Fantasy")).toBeInTheDocument();
    expect(screen.getByText("Adventure")).toBeInTheDocument();
  });

  it("renders the hover-reveal stats (rating, box office, awards)", () => {
    render(<MovieCard movie={movie} />);

    expect(screen.getByLabelText("IMDb rating")).toHaveTextContent("8.6");
    expect(screen.getByLabelText("Box office")).toHaveTextContent(formatUsdCompact(movie.box_office_usd));
    expect(screen.getByLabelText("Awards")).toHaveTextContent("7");
  });
});
