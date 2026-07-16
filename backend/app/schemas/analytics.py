from pydantic import BaseModel


class TopMovieRef(BaseModel):
    slug: str
    title: str
    value: float


class KpiSummary(BaseModel):
    avg_imdb_rating: float
    total_movies: int
    highest_grossing: TopMovieRef
    most_awarded: TopMovieRef
    highest_rated: TopMovieRef


class RevenueByYear(BaseModel):
    release_year: int
    box_office_usd: int
    budget_usd: int


class RatingBucket(BaseModel):
    bucket: str
    count: int


class GenreBreakdown(BaseModel):
    genre: str
    count: int
    avg_rating: float


class DirectorPerformance(BaseModel):
    director: str
    movie_count: int
    avg_imdb_rating: float | None
    avg_rotten_tomatoes_score: float | None
    total_box_office_usd: int
    avg_box_office_usd: int
    total_awards: int


class RoiEntry(BaseModel):
    slug: str
    title: str
    budget_usd: int
    box_office_usd: int
    roi_multiple: float


class CorrelationInsight(BaseModel):
    label: str
    correlation: float
    insight: str


class SuccessFactors(BaseModel):
    correlations: list[CorrelationInsight]


class MovieComparisonRow(BaseModel):
    slug: str
    title: str
    release_year: int
    director: str | None
    budget_usd: int | None
    box_office_usd: int | None
    roi_multiple: float | None
    imdb_rating: float | None
    rotten_tomatoes_score: int | None
    awards_count: int
