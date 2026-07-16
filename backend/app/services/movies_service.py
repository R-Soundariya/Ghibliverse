from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.movie import Genre, Movie

SORT_OPTIONS = {
    "rating_desc": Movie.imdb_rating.desc(),
    "year_desc": Movie.release_year.desc(),
    "revenue_desc": Movie.box_office_usd.desc(),
}


def list_movies(
    db: Session, search: str | None = None, genre: str | None = None, sort: str | None = None
) -> list[Movie]:
    query = select(Movie).options(selectinload(Movie.genres))

    if search:
        query = query.where(Movie.title.ilike(f"%{search}%"))
    if genre:
        query = query.join(Movie.genres).where(Genre.name.ilike(genre))

    query = query.order_by(SORT_OPTIONS.get(sort, Movie.release_year.asc()))

    return list(db.scalars(query).unique())


def get_movie_by_slug(db: Session, slug: str) -> Movie | None:
    query = select(Movie).options(selectinload(Movie.genres)).where(Movie.slug == slug)
    return db.scalars(query).unique().one_or_none()


def to_card_dict(movie: Movie) -> dict:
    return {
        "id": movie.id,
        "slug": movie.slug,
        "title": movie.title,
        "poster_url": movie.poster_url,
        "release_year": movie.release_year,
        "imdb_rating": float(movie.imdb_rating) if movie.imdb_rating is not None else None,
        "box_office_usd": movie.box_office_usd,
        "awards_count": movie.awards_count,
        "genres": [g.name for g in movie.genres],
    }


def to_detail_dict(movie: Movie) -> dict:
    return {
        **to_card_dict(movie),
        "original_title": movie.original_title,
        "release_date": movie.release_date,
        "director": movie.director,
        "producer": movie.producer,
        "studio": movie.studio,
        "origin_country": movie.origin_country,
        "runtime_minutes": movie.runtime_minutes,
        "synopsis": movie.synopsis,
        "budget_usd": movie.budget_usd,
        "rotten_tomatoes_score": movie.rotten_tomatoes_score,
    }
