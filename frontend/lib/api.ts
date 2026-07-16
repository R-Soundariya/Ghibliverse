import type {
  DirectorPerformance,
  GenreBreakdown,
  KpiSummary,
  MovieComparisonRow,
  MovieDetail,
  MovieListResponse,
  RatingBucket,
  RevenueByYear,
  RoiEntry,
  SuccessFactors,
} from "./types";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:8000";

async function fetchJson<T>(path: string, revalidateSeconds?: number): Promise<T> {
  const res = await fetch(`${API_URL}${path}`, {
    next: revalidateSeconds ? { revalidate: revalidateSeconds } : undefined,
  });
  if (!res.ok) {
    throw new Error(`Request to ${path} failed with ${res.status}`);
  }
  return res.json() as Promise<T>;
}

export function getMovies(): Promise<MovieListResponse> {
  return fetchJson<MovieListResponse>("/api/movies");
}

export function getMovie(slug: string): Promise<MovieDetail> {
  return fetchJson<MovieDetail>(`/api/movies/${slug}`);
}

export function getKpis(): Promise<KpiSummary> {
  return fetchJson<KpiSummary>("/api/analytics/kpis", 3600);
}

export function getRevenueByYear(): Promise<RevenueByYear[]> {
  return fetchJson<RevenueByYear[]>("/api/analytics/revenue-by-year", 3600);
}

export function getRatingDistribution(): Promise<RatingBucket[]> {
  return fetchJson<RatingBucket[]>("/api/analytics/rating-distribution", 3600);
}

export function getGenreBreakdown(): Promise<GenreBreakdown[]> {
  return fetchJson<GenreBreakdown[]>("/api/analytics/genre-breakdown", 3600);
}

export function getDirectorPerformance(): Promise<DirectorPerformance[]> {
  return fetchJson<DirectorPerformance[]>("/api/analytics/director-performance", 3600);
}

export function getRoiLeaderboard(): Promise<RoiEntry[]> {
  return fetchJson<RoiEntry[]>("/api/analytics/roi-leaderboard", 3600);
}

export function getSuccessFactors(): Promise<SuccessFactors> {
  return fetchJson<SuccessFactors>("/api/analytics/success-factors", 3600);
}

export function getMovieComparison(): Promise<MovieComparisonRow[]> {
  return fetchJson<MovieComparisonRow[]>("/api/analytics/movie-comparison", 3600);
}
