import math
from collections import defaultdict

from sqlalchemy import select
from sqlalchemy.orm import Session, selectinload

from app.models.movie import Movie


def _all_movies(db: Session) -> list[Movie]:
    query = select(Movie).options(selectinload(Movie.genres))
    return list(db.scalars(query).unique())


def _pearson(pairs: list[tuple[float, float]]) -> float | None:
    if len(pairs) < 2:
        return None

    n = len(pairs)
    xs = [p[0] for p in pairs]
    ys = [p[1] for p in pairs]
    mean_x = sum(xs) / n
    mean_y = sum(ys) / n

    cov = sum((x - mean_x) * (y - mean_y) for x, y in pairs)
    var_x = sum((x - mean_x) ** 2 for x in xs)
    var_y = sum((y - mean_y) ** 2 for y in ys)

    denominator = math.sqrt(var_x * var_y)
    if denominator == 0:
        return None

    return cov / denominator


def _correlation_insight(label: str, noun_phrase: str, r: float | None) -> dict:
    if r is None:
        return {
            "label": label,
            "correlation": 0.0,
            "insight": f"Not enough data to compute a correlation between {noun_phrase}.",
        }

    magnitude = abs(r)
    if magnitude >= 0.6:
        strength = "Strong"
    elif magnitude >= 0.3:
        strength = "Moderate"
    else:
        strength = "Weak"

    direction = "positive" if r >= 0 else "negative"
    return {
        "label": label,
        "correlation": round(r, 2),
        "insight": f"{strength} {direction} correlation (r={r:.2f}) between {noun_phrase}.",
    }


def get_kpis(db: Session) -> dict:
    movies = _all_movies(db)
    rated = [m for m in movies if m.imdb_rating is not None]

    highest_grossing = max(movies, key=lambda m: m.box_office_usd or 0)
    most_awarded = max(movies, key=lambda m: m.awards_count or 0)
    highest_rated = max(rated, key=lambda m: m.imdb_rating)

    return {
        "avg_imdb_rating": round(sum(float(m.imdb_rating) for m in rated) / len(rated), 2),
        "total_movies": len(movies),
        "highest_grossing": {
            "slug": highest_grossing.slug,
            "title": highest_grossing.title,
            "value": highest_grossing.box_office_usd or 0,
        },
        "most_awarded": {
            "slug": most_awarded.slug,
            "title": most_awarded.title,
            "value": most_awarded.awards_count,
        },
        "highest_rated": {
            "slug": highest_rated.slug,
            "title": highest_rated.title,
            "value": float(highest_rated.imdb_rating),
        },
    }


def get_revenue_by_year(db: Session) -> list[dict]:
    totals: dict[int, dict[str, int]] = defaultdict(lambda: {"box_office_usd": 0, "budget_usd": 0})
    for movie in _all_movies(db):
        totals[movie.release_year]["box_office_usd"] += movie.box_office_usd or 0
        totals[movie.release_year]["budget_usd"] += movie.budget_usd or 0

    return [
        {"release_year": year, **values} for year, values in sorted(totals.items())
    ]


def get_rating_distribution(db: Session) -> list[dict]:
    rated = [float(m.imdb_rating) for m in _all_movies(db) if m.imdb_rating is not None]
    if not rated:
        return []

    bucket_width = 0.5
    low = math.floor(min(rated) / bucket_width) * bucket_width
    high = math.ceil(max(rated) / bucket_width) * bucket_width

    buckets: dict[str, int] = {}
    bucket_starts = []
    start = low
    while start < high:
        bucket_starts.append(round(start, 1))
        start += bucket_width

    for start in bucket_starts:
        label = f"{start:.1f}–{start + bucket_width:.1f}"
        buckets[label] = 0

    for rating in rated:
        idx = min(int((rating - low) / bucket_width), len(bucket_starts) - 1)
        label = f"{bucket_starts[idx]:.1f}–{bucket_starts[idx] + bucket_width:.1f}"
        buckets[label] += 1

    return [{"bucket": label, "count": count} for label, count in buckets.items()]


def get_genre_breakdown(db: Session) -> list[dict]:
    genre_ratings: dict[str, list[float]] = defaultdict(list)
    for movie in _all_movies(db):
        if movie.imdb_rating is None:
            continue
        for genre in movie.genres:
            genre_ratings[genre.name].append(float(movie.imdb_rating))

    return sorted(
        (
            {
                "genre": genre,
                "count": len(ratings),
                "avg_rating": round(sum(ratings) / len(ratings), 2),
            }
            for genre, ratings in genre_ratings.items()
        ),
        key=lambda row: row["count"],
        reverse=True,
    )


def get_director_performance(db: Session) -> list[dict]:
    by_director: dict[str, list[Movie]] = defaultdict(list)
    for movie in _all_movies(db):
        if movie.director:
            by_director[movie.director].append(movie)

    rows = []
    for director, movies in by_director.items():
        box_office = [m.box_office_usd or 0 for m in movies]
        ratings = [float(m.imdb_rating) for m in movies if m.imdb_rating is not None]
        rt_scores = [m.rotten_tomatoes_score for m in movies if m.rotten_tomatoes_score is not None]
        total_box_office = sum(box_office)

        rows.append(
            {
                "director": director,
                "movie_count": len(movies),
                "avg_imdb_rating": round(sum(ratings) / len(ratings), 2) if ratings else None,
                "avg_rotten_tomatoes_score": (
                    round(sum(rt_scores) / len(rt_scores), 1) if rt_scores else None
                ),
                "total_box_office_usd": total_box_office,
                "avg_box_office_usd": round(total_box_office / len(movies)),
                "total_awards": sum(m.awards_count for m in movies),
            }
        )

    return sorted(rows, key=lambda row: row["total_box_office_usd"], reverse=True)


def get_roi_leaderboard(db: Session) -> list[dict]:
    rows = []
    for movie in _all_movies(db):
        if not movie.budget_usd or not movie.box_office_usd:
            continue
        rows.append(
            {
                "slug": movie.slug,
                "title": movie.title,
                "budget_usd": movie.budget_usd,
                "box_office_usd": movie.box_office_usd,
                "roi_multiple": round(movie.box_office_usd / movie.budget_usd, 2),
            }
        )

    return sorted(rows, key=lambda row: row["roi_multiple"], reverse=True)


def get_success_factors(db: Session) -> dict:
    movies = _all_movies(db)

    def pairs(field_x: str, field_y: str) -> list[tuple[float, float]]:
        result = []
        for movie in movies:
            x = getattr(movie, field_x)
            y = getattr(movie, field_y)
            if x is not None and y is not None:
                result.append((float(x), float(y)))
        return result

    factors = [
        ("Budget vs. IMDb rating", "budget and IMDb rating", "budget_usd", "imdb_rating"),
        ("Budget vs. box office", "budget and box office", "budget_usd", "box_office_usd"),
        (
            "Critic score vs. box office",
            "critic scores and box office",
            "rotten_tomatoes_score",
            "box_office_usd",
        ),
        ("Runtime vs. IMDb rating", "runtime and IMDb rating", "runtime_minutes", "imdb_rating"),
        ("Awards vs. box office", "awards won and box office", "awards_count", "box_office_usd"),
    ]

    correlations = [
        _correlation_insight(label, noun_phrase, _pearson(pairs(field_x, field_y)))
        for label, noun_phrase, field_x, field_y in factors
    ]

    return {"correlations": correlations}


def get_movie_comparison(db: Session) -> list[dict]:
    rows = []
    for movie in sorted(_all_movies(db), key=lambda m: m.release_year):
        roi_multiple = (
            round(movie.box_office_usd / movie.budget_usd, 2)
            if movie.budget_usd and movie.box_office_usd
            else None
        )
        rows.append(
            {
                "slug": movie.slug,
                "title": movie.title,
                "release_year": movie.release_year,
                "director": movie.director,
                "budget_usd": movie.budget_usd,
                "box_office_usd": movie.box_office_usd,
                "roi_multiple": roi_multiple,
                "imdb_rating": float(movie.imdb_rating) if movie.imdb_rating is not None else None,
                "rotten_tomatoes_score": movie.rotten_tomatoes_score,
                "awards_count": movie.awards_count,
            }
        )
    return rows
