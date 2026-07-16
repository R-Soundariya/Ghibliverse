"""Load data/clean/ghibli_movies_clean.csv into Supabase Postgres. Idempotent.

Requires SUPABASE_DB_URL in the environment (or a .env file next to this script).
Run from the data/ directory: python scripts/seed_supabase.py
"""
import os
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv
from sqlalchemy import create_engine, text

DATA_DIR = Path(__file__).resolve().parent.parent
CLEAN_CSV = DATA_DIR / "clean" / "ghibli_movies_clean.csv"

load_dotenv(DATA_DIR / ".env")

MOVIE_COLUMNS = [
    "slug",
    "title",
    "original_title",
    "release_year",
    "release_date",
    "director",
    "producer",
    "studio",
    "origin_country",
    "runtime_minutes",
    "synopsis",
    "poster_url",
    "budget_usd",
    "box_office_usd",
    "imdb_rating",
    "rotten_tomatoes_score",
    "awards_count",
]

UPSERT_MOVIE_SQL = text(
    f"""
    INSERT INTO movies ({", ".join(MOVIE_COLUMNS)})
    VALUES ({", ".join(f":{c}" for c in MOVIE_COLUMNS)})
    ON CONFLICT (slug) DO UPDATE SET
      {", ".join(f"{c} = EXCLUDED.{c}" for c in MOVIE_COLUMNS if c != "slug")}
    RETURNING id
    """
)

UPSERT_GENRE_SQL = text(
    """
    INSERT INTO genres (name) VALUES (:name)
    ON CONFLICT (name) DO UPDATE SET name = EXCLUDED.name
    RETURNING id
    """
)

LINK_GENRE_SQL = text(
    """
    INSERT INTO movie_genres (movie_id, genre_id) VALUES (:movie_id, :genre_id)
    ON CONFLICT DO NOTHING
    """
)


def main() -> None:
    db_url = os.environ["SUPABASE_DB_URL"]
    df = pd.read_csv(CLEAN_CSV).where(pd.notnull, None)

    engine = create_engine(db_url)
    with engine.begin() as conn:
        for _, row in df.iterrows():
            movie_id = conn.execute(UPSERT_MOVIE_SQL, {c: row[c] for c in MOVIE_COLUMNS}).scalar_one()

            genre_names = [g.strip() for g in str(row["genres"]).split(";") if g.strip()]
            for genre_name in genre_names:
                genre_id = conn.execute(UPSERT_GENRE_SQL, {"name": genre_name}).scalar_one()
                conn.execute(LINK_GENRE_SQL, {"movie_id": movie_id, "genre_id": genre_id})

    print(f"Seeded {len(df)} movies into Supabase.")


if __name__ == "__main__":
    main()
