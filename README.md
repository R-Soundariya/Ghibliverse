# 🌿 GhibliVerse

**Live demo:** https://ghibliverse-one.vercel.app
**API:** https://ghibliverse-api-production.up.railway.app

An end-to-end Studio Ghibli analytics platform — a portfolio project combining
business intelligence, data science, and immersive web storytelling.

## Why Studio Ghibli?

Studio Ghibli is one of the most beloved animation studios in the world —
founded in 1985 by Hayao Miyazaki and Isao Takahata, it's the studio behind
*Spirited Away* (the only hand-drawn animated film to win the Oscar for Best
Animated Feature), *My Neighbor Totoro*, *Princess Mononoke*, and more. It's
famous for hand-drawn artistry, deeply human stories, and a signature love of
nature — themes this project tries to reflect visually, not just describe.

## What it does

Explore all 22 Ghibli films, then dig into the data three different ways:

- **Movie Explorer** — search, filter, and browse every film with real posters.
- **Analytics Dashboard** — ratings, box office, and genre trends across the
  catalog.
- **Executive Dashboard** — the deep one: which directors' films perform best,
  which movies had the best return on investment, and statistical correlations
  that reveal what actually predicts success (e.g. awards won correlates
  strongly with box office — r = 0.77 — while budget barely predicts a film's
  rating).

## How the dashboard actually works

Every chart and number is computed live from a real database, not hardcoded.
When you load the Executive Dashboard, the backend pulls all 22 films, does the
math (averages, ROI ratios, correlation coefficients) on the spot, and sends
back the results — so the "insights" are genuinely derived from the data each
time, not pre-written.

## Screenshots

| Landing (Day in the Forest) | Landing (Moonlit Forest) |
|---|---|
| ![Landing day](docs/screenshots/landing.png) | ![Landing night](docs/screenshots/landing-night.png) |

| Movie Explorer | Executive Dashboard |
|---|---|
| ![Explorer](docs/screenshots/explorer.png) | ![Executive Dashboard](docs/screenshots/executive.png) |

A day/night toggle (top-right, on every page) switches between **Day in the
Forest** — floating leaves, parallax clouds — and **Moonlit Forest** — fireflies,
stars, moon, tree-canopy silhouette. The choice persists across visits
(`localStorage`) and drives both the UI theme and the dashboard chart palette.

## Architecture

```
Next.js (Vercel)  ──HTTP──>  FastAPI (Railway)  ──SQL──>  Postgres (Railway)
     │                              │
     └── Framer Motion, Recharts    └── SQLAlchemy, Pydantic
```

- **Frontend** (`frontend/`) — Next.js 14 App Router, TypeScript, Tailwind CSS,
  Framer Motion for ambient/hover animation, Recharts for the dashboard. Deployed
  on Vercel.
- **Backend** (`backend/`) — FastAPI, SQLAlchemy 2.0, read-only REST API over
  movies + analytics aggregates. Deployed on Railway.
- **Database** — Postgres (Railway-hosted in this deployment; the schema/seed
  pipeline in `data/` works against any Postgres, Supabase included — see
  `SUPABASE_DB_URL` in the env files).

Movie posters are fetched from the [OMDb API](https://www.omdbapi.com/)
(IMDb-sourced data, attributed in the site footer), falling back to an original
gradient placeholder if a poster isn't found. Everything else — the forest
palette, floating leaves, parallax clouds, fireflies, and the forest-spirit
silhouette on the landing page — is an original, nature-inspired aesthetic with
no copyrighted Ghibli character art.

## Tech stack

| Layer | Tools |
|---|---|
| Frontend | Next.js, TypeScript, Tailwind CSS, Framer Motion, Recharts |
| Backend | FastAPI, SQLAlchemy, Pydantic |
| Database | Postgres (Railway) |
| Data | Pandas (cleaning), SQL |
| Testing | Vitest + React Testing Library, Pytest |

## How it was built (in plain English)

1. Collected and cleaned real data on every Ghibli film — budget, box office,
   ratings, awards, genres.
2. Built a backend (an API) that serves that data to the website.
3. Built the dashboards — wrote the logic that turns raw numbers into
   insights (averages, ROI ratios, director-by-director stats, and the
   statistical correlations behind what predicts success), then designed
   charts, KPI tiles, and a sortable comparison table to actually show it.
4. Built the rest of the frontend — a welcome page and a searchable, filterable
   movie browser to go alongside the dashboards.
5. Fetched real movie posters from a free movie database and wired them into
   the site.
6. Added a little hand-drawn forest spirit to the welcome page as an original
   touch.
7. Put the whole thing on the internet — the website on Vercel, the backend +
   database on Railway — so anyone can open the link and use it, no setup
   required.

## Local setup

**1. Data — seed Supabase**
```bash
python -m venv .venv && .venv\Scripts\activate
pip install -r data/requirements.txt
cd data
python scripts/clean.py
# run sql/001_schema.sql in the Supabase SQL editor, then:
cp .env.example .env   # fill in SUPABASE_DB_URL
python scripts/seed_supabase.py
```

**2. Backend**
```bash
pip install -r backend/requirements.txt
cd backend
cp .env.example .env   # fill in SUPABASE_DB_URL
uvicorn app.main:app --reload   # http://localhost:8000
```

**3. Frontend**
```bash
cd frontend
npm install
cp .env.example .env.local   # NEXT_PUBLIC_API_URL=http://localhost:8000
npm run dev   # http://localhost:3000
```

See `backend/README.md` and `data/README.md` for more detail.

## Tests

```bash
cd backend && pytest              # runs against an in-memory SQLite fixture
cd frontend && npm run test       # Vitest + React Testing Library
```

Both run in CI on every push/PR (`.github/workflows/ci.yml`), alongside lint and
type checking.

## Deployment

Live at https://ghibliverse-one.vercel.app, backed by
https://ghibliverse-api-production.up.railway.app.

- **Frontend** → Vercel (root: `frontend/`, env: `NEXT_PUBLIC_API_URL`, framework
  pinned via `frontend/vercel.json`)
- **Backend** → Railway (root: `backend/`, env: `SUPABASE_DB_URL`,
  `FRONTEND_ORIGIN`; start command from `backend/Procfile`)
- **Database** → Railway Postgres (works with any Postgres, e.g. Supabase, via
  the same `SUPABASE_DB_URL`)

## Data attribution

Seeded from a static, hand-cleaned CSV of the Studio Ghibli theatrical catalog
(title, director, runtime, ratings, box office, budget, genres, awards). Box
office/budget/awards figures are approximate, compiled from public sources for
demonstration purposes — see `data/README.md`.

---

🏷️ #LetsMeetInTheGhibliForest #GhibliVerse #StudioGhibli #DataMeetsMagic
#ForestSpiritAndDashboards #NextJS #FastAPI #DataViz #BuildInPublic
