"""Fetch poster URLs from the OMDb API (IMDb-sourced data) for every film in
data/clean/ghibli_movies_clean.csv and write them back into the poster_url column.

Requires OMDB_API_KEY in the environment (or data/.env). Get a free key at
https://www.omdbapi.com/apikey.aspx

Run from the data/ directory: python scripts/fetch_posters.py
"""
import json
import os
import time
import urllib.error
import urllib.parse
import urllib.request
from pathlib import Path

import pandas as pd
from dotenv import load_dotenv

DATA_DIR = Path(__file__).resolve().parent.parent
CLEAN_CSV = DATA_DIR / "clean" / "ghibli_movies_clean.csv"
OMDB_URL = "https://www.omdbapi.com/"

load_dotenv(DATA_DIR / ".env")


def fetch_poster(api_key: str, title: str, year: int) -> str | None:
    # OMDb's year field reflects (often US) release year, which can lag the
    # original Japanese release by a year or more, so try a small window.
    for candidate_year in (year, year + 1, year + 2, None):
        params = {"apikey": api_key, "t": title}
        if candidate_year is not None:
            params["y"] = str(candidate_year)

        url = f"{OMDB_URL}?{urllib.parse.urlencode(params)}"
        with urllib.request.urlopen(url, timeout=10) as response:
            payload = json.loads(response.read())

        if payload.get("Response") == "True":
            poster = payload.get("Poster")
            if poster and poster != "N/A":
                return poster
            return None

    return None


def main() -> None:
    api_key = os.environ["OMDB_API_KEY"]
    df = pd.read_csv(CLEAN_CSV)
    df["poster_url"] = df["poster_url"].astype("object")

    found, missing = 0, []
    for idx, row in df.iterrows():
        try:
            poster = fetch_poster(api_key, row["title"], int(row["release_year"]))
        except urllib.error.URLError as exc:
            print(f"  error fetching {row['title']!r}: {exc}")
            poster = None

        if poster:
            df.at[idx, "poster_url"] = poster
            found += 1
            print(f"  found poster for {row['title']!r}")
        else:
            missing.append(row["title"])
            print(f"  no poster found for {row['title']!r}")

        time.sleep(0.2)

    df.to_csv(CLEAN_CSV, index=False)
    print(f"\nUpdated {found}/{len(df)} rows in {CLEAN_CSV}")
    if missing:
        print(f"No poster found for: {missing}")


if __name__ == "__main__":
    main()
