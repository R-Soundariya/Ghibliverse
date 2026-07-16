export interface MovieCard {
  id: number;
  slug: string;
  title: string;
  poster_url: string | null;
  release_year: number;
  imdb_rating: number | null;
  box_office_usd: number | null;
  awards_count: number;
  genres: string[];
}

export interface MovieDetail extends MovieCard {
  original_title: string | null;
  release_date: string | null;
  director: string | null;
  producer: string | null;
  studio: string;
  origin_country: string;
  runtime_minutes: number | null;
  synopsis: string | null;
  budget_usd: number | null;
  rotten_tomatoes_score: number | null;
}

export interface MovieListResponse {
  data: MovieCard[];
  meta: { count: number };
}

export interface TopMovieRef {
  slug: string;
  title: string;
  value: number;
}

export interface KpiSummary {
  avg_imdb_rating: number;
  total_movies: number;
  highest_grossing: TopMovieRef;
  most_awarded: TopMovieRef;
  highest_rated: TopMovieRef;
}

export interface RevenueByYear {
  release_year: number;
  box_office_usd: number;
  budget_usd: number;
}

export interface RatingBucket {
  bucket: string;
  count: number;
}

export interface GenreBreakdown {
  genre: string;
  count: number;
  avg_rating: number;
}

export interface DirectorPerformance {
  director: string;
  movie_count: number;
  avg_imdb_rating: number | null;
  avg_rotten_tomatoes_score: number | null;
  total_box_office_usd: number;
  avg_box_office_usd: number;
  total_awards: number;
}

export interface RoiEntry {
  slug: string;
  title: string;
  budget_usd: number;
  box_office_usd: number;
  roi_multiple: number;
}

export interface CorrelationInsight {
  label: string;
  correlation: number;
  insight: string;
}

export interface SuccessFactors {
  correlations: CorrelationInsight[];
}

export interface MovieComparisonRow {
  slug: string;
  title: string;
  release_year: number;
  director: string | null;
  budget_usd: number | null;
  box_office_usd: number | null;
  roi_multiple: number | null;
  imdb_rating: number | null;
  rotten_tomatoes_score: number | null;
  awards_count: number;
}
