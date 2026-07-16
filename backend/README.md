# GhibliVerse API

FastAPI backend serving movie and analytics data from Supabase Postgres.

## Local setup

```bash
python -m venv .venv        # from repo root, shared with data/ scripts
.venv\Scripts\activate       # Windows
pip install -r backend/requirements.txt
cp backend/.env.example backend/.env   # fill in SUPABASE_DB_URL
```

Run the schema + seed steps in `../data/README.md` (or the root README) first so the
`movies`, `genres`, and `movie_genres` tables exist and are populated.

```bash
cd backend
uvicorn app.main:app --reload
```

API docs: http://localhost:8000/docs

## Tests

```bash
cd backend
pytest
```

Tests run against an in-memory SQLite fixture (`tests/conftest.py`), not live Supabase —
no `.env` needed to run the suite.

## Routes

| Method | Path | Purpose |
|---|---|---|
| GET | `/health` | liveness check |
| GET | `/api/movies` | list movies (`search`, `genre`, `sort` query params) |
| GET | `/api/movies/{slug}` | movie detail |
| GET | `/api/analytics/kpis` | dashboard KPI row |
| GET | `/api/analytics/revenue-by-year` | box office / budget by release year |
| GET | `/api/analytics/rating-distribution` | IMDb rating histogram buckets |
| GET | `/api/analytics/genre-breakdown` | movie count + avg rating per genre |
