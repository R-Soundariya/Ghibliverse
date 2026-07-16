import os

os.environ.setdefault("SUPABASE_DB_URL", "sqlite:///:memory:")
os.environ.setdefault("FRONTEND_ORIGIN", "http://localhost:3000")

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from app.core.db import Base, get_db
from app.main import app
from app.models.movie import Genre, Movie

FIXTURE_ENGINE = create_engine(
    "sqlite:///:memory:", connect_args={"check_same_thread": False}, poolclass=StaticPool
)
FIXTURE_SESSION = sessionmaker(bind=FIXTURE_ENGINE, autoflush=False, autocommit=False)


@pytest.fixture()
def db_session():
    Base.metadata.create_all(FIXTURE_ENGINE)
    session = FIXTURE_SESSION()

    fantasy = Genre(name="Fantasy")
    adventure = Genre(name="Adventure")
    war = Genre(name="War")

    movies = [
        Movie(
            slug="spirited-away",
            title="Spirited Away",
            release_year=2001,
            director="Hayao Miyazaki",
            runtime_minutes=125,
            imdb_rating=8.6,
            rotten_tomatoes_score=97,
            box_office_usd=395_000_000,
            budget_usd=19_000_000,
            awards_count=7,
            genres=[fantasy, adventure],
        ),
        Movie(
            slug="princess-mononoke",
            title="Princess Mononoke",
            release_year=1997,
            director="Hayao Miyazaki",
            runtime_minutes=134,
            imdb_rating=8.4,
            rotten_tomatoes_score=93,
            box_office_usd=169_000_000,
            budget_usd=23_500_000,
            awards_count=4,
            genres=[fantasy, adventure, war],
        ),
        Movie(
            slug="grave-of-the-fireflies",
            title="Grave of the Fireflies",
            release_year=1988,
            director="Isao Takahata",
            runtime_minutes=89,
            imdb_rating=8.5,
            rotten_tomatoes_score=97,
            box_office_usd=12_000_000,
            budget_usd=4_500_000,
            awards_count=3,
            genres=[war],
        ),
    ]
    session.add_all(movies)
    session.commit()

    try:
        yield session
    finally:
        session.close()
        Base.metadata.drop_all(FIXTURE_ENGINE)


@pytest.fixture()
def client(db_session):
    def override_get_db():
        try:
            yield db_session
        finally:
            pass

    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
