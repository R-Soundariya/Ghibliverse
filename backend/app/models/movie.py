from datetime import date, datetime

from sqlalchemy import (
    BigInteger,
    Column,
    Date,
    ForeignKey,
    Integer,
    Numeric,
    SmallInteger,
    String,
    Table,
    Text,
)
from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy.sql import func

from app.core.db import Base

movie_genres = Table(
    "movie_genres",
    Base.metadata,
    Column("movie_id", Integer, ForeignKey("movies.id", ondelete="CASCADE"), primary_key=True),
    Column("genre_id", Integer, ForeignKey("genres.id", ondelete="CASCADE"), primary_key=True),
)


class Genre(Base):
    __tablename__ = "genres"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String, unique=True, nullable=False)

    movies: Mapped[list["Movie"]] = relationship(secondary=movie_genres, back_populates="genres")


class Movie(Base):
    __tablename__ = "movies"

    id: Mapped[int] = mapped_column(primary_key=True)
    slug: Mapped[str] = mapped_column(String, unique=True, nullable=False)
    title: Mapped[str] = mapped_column(String, nullable=False)
    original_title: Mapped[str | None] = mapped_column(String)
    release_year: Mapped[int] = mapped_column(SmallInteger, nullable=False)
    release_date: Mapped[date | None] = mapped_column(Date)
    director: Mapped[str | None] = mapped_column(String)
    producer: Mapped[str | None] = mapped_column(String)
    studio: Mapped[str] = mapped_column(String, nullable=False, default="Studio Ghibli")
    origin_country: Mapped[str] = mapped_column(String, nullable=False, default="Japan")
    runtime_minutes: Mapped[int | None] = mapped_column(SmallInteger)
    synopsis: Mapped[str | None] = mapped_column(Text)
    poster_url: Mapped[str | None] = mapped_column(String)
    budget_usd: Mapped[int | None] = mapped_column(BigInteger)
    box_office_usd: Mapped[int | None] = mapped_column(BigInteger)
    imdb_rating: Mapped[float | None] = mapped_column(Numeric(3, 1))
    rotten_tomatoes_score: Mapped[int | None] = mapped_column(SmallInteger)
    awards_count: Mapped[int] = mapped_column(SmallInteger, nullable=False, default=0)
    created_at: Mapped[datetime] = mapped_column(server_default=func.now())

    genres: Mapped[list[Genre]] = relationship(secondary=movie_genres, back_populates="movies")
