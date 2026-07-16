from datetime import date

from pydantic import BaseModel, ConfigDict


class MovieCard(BaseModel):
    model_config = ConfigDict(from_attributes=True)

    id: int
    slug: str
    title: str
    poster_url: str | None
    release_year: int
    imdb_rating: float | None
    box_office_usd: int | None
    awards_count: int
    genres: list[str]


class MovieDetail(MovieCard):
    original_title: str | None
    release_date: date | None
    director: str | None
    producer: str | None
    studio: str
    origin_country: str
    runtime_minutes: int | None
    synopsis: str | None
    budget_usd: int | None
    rotten_tomatoes_score: int | None


class MovieListMeta(BaseModel):
    count: int


class MovieListResponse(BaseModel):
    data: list[MovieCard]
    meta: MovieListMeta
