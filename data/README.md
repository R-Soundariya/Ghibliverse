# GhibliVerse data pipeline

Seeds the Supabase Postgres database from a static, cleaned CSV of the Studio Ghibli
theatrical catalog.

## Files

- `raw/ghibli_movies_kaggle.csv` — core catalog fields (title, director, runtime, Rotten
  Tomatoes score, etc.), in the schema commonly used by public Ghibli datasets.
- `raw/awards_boxoffice_supplement.csv` — hand-curated box office, budget, IMDb rating,
  awards count, and genres (fields the core dataset doesn't include), joined on title.
- `clean/ghibli_movies_clean.csv` — the merged, normalized output of `scripts/clean.py`.
  Checked into the repo so seeding never depends on the raw sources being available.
- `sql/001_schema.sql` — run once against a new Supabase project.
- `scripts/clean.py` — merges + normalizes the raw sources into `clean/`.
- `scripts/seed_supabase.py` — idempotent upsert of `clean/` into Supabase.

## Usage

```bash
python -m venv .venv && .venv\Scripts\activate   # from repo root
pip install -r data/requirements.txt

cd data
python scripts/clean.py            # raw/*.csv -> clean/ghibli_movies_clean.csv
cp .env.example .env               # fill in SUPABASE_DB_URL
python scripts/seed_supabase.py    # clean/ -> Supabase
```

Run `sql/001_schema.sql` in the Supabase SQL editor before seeding.

## Data note

Box office, budget, and awards figures are approximate — compiled from public sources for
demonstration purposes, not guaranteed precise. Movie posters are intentionally omitted
(`poster_url` is blank); the UI renders original gradient placeholders instead of
copyrighted artwork.
