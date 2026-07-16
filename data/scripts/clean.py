"""Clean and merge the raw Ghibli movie sources into data/clean/ghibli_movies_clean.csv.

Run from the data/ directory: python scripts/clean.py
"""
import re
from pathlib import Path

import pandas as pd

DATA_DIR = Path(__file__).resolve().parent.parent
RAW_MOVIES = DATA_DIR / "raw" / "ghibli_movies_kaggle.csv"
RAW_SUPPLEMENT = DATA_DIR / "raw" / "awards_boxoffice_supplement.csv"
CLEAN_OUT = DATA_DIR / "clean" / "ghibli_movies_clean.csv"


def slugify(title: str) -> str:
    slug = title.lower()
    slug = re.sub(r"[''\"]", "", slug)
    slug = re.sub(r"[^a-z0-9]+", "-", slug)
    return slug.strip("-")


def main() -> None:
    movies = pd.read_csv(RAW_MOVIES)
    supplement = pd.read_csv(RAW_SUPPLEMENT)

    movies["slug"] = movies["title"].apply(slugify)
    supplement["slug"] = supplement["title"].apply(slugify)

    movies["release_date"] = pd.to_datetime(movies["release_date"])
    movies["release_year"] = movies["release_date"].dt.year

    for col in ("budget_usd", "box_office_usd"):
        supplement[col] = (
            supplement[col].astype(str).str.replace(r"[$,]", "", regex=True).astype("int64")
        )

    merged = movies.merge(
        supplement.drop(columns=["title"]),
        on="slug",
        how="left",
        indicator=True,
    )

    unmatched = merged.loc[merged["_merge"] != "both", "title"]
    if not unmatched.empty:
        print(f"WARNING: {len(unmatched)} movie(s) had no supplement match: {list(unmatched)}")
    merged = merged.drop(columns=["_merge"])

    merged["studio"] = "Studio Ghibli"
    merged["origin_country"] = "Japan"
    merged["poster_url"] = ""  # intentionally left blank; UI renders an original placeholder

    out = merged.rename(
        columns={
            "description": "synopsis",
            "running_time": "runtime_minutes",
            "rt_score": "rotten_tomatoes_score",
        }
    )[
        [
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
            "genres",
        ]
    ]
    out["release_date"] = out["release_date"].dt.strftime("%Y-%m-%d")

    CLEAN_OUT.parent.mkdir(parents=True, exist_ok=True)
    out.to_csv(CLEAN_OUT, index=False)
    print(f"Wrote {len(out)} rows to {CLEAN_OUT}")


if __name__ == "__main__":
    main()
