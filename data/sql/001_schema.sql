-- GhibliVerse initial schema. Run once against the Supabase project (SQL editor or psql).

CREATE TABLE IF NOT EXISTS movies (
  id                      serial PRIMARY KEY,
  slug                    text UNIQUE NOT NULL,
  title                   text NOT NULL,
  original_title          text,
  release_year            smallint NOT NULL,
  release_date            date,
  director                text,
  producer                text,
  studio                  text NOT NULL DEFAULT 'Studio Ghibli',
  origin_country          text NOT NULL DEFAULT 'Japan',
  runtime_minutes         smallint,
  synopsis                text,
  poster_url              text,
  budget_usd              bigint,
  box_office_usd          bigint,
  imdb_rating             numeric(3,1),
  rotten_tomatoes_score   smallint,
  awards_count            smallint NOT NULL DEFAULT 0,
  created_at              timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS genres (
  id   serial PRIMARY KEY,
  name text UNIQUE NOT NULL
);

CREATE TABLE IF NOT EXISTS movie_genres (
  movie_id int REFERENCES movies(id) ON DELETE CASCADE,
  genre_id int REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (movie_id, genre_id)
);

CREATE INDEX IF NOT EXISTS idx_movies_release_year ON movies(release_year);
CREATE INDEX IF NOT EXISTS idx_movies_imdb_rating  ON movies(imdb_rating);
