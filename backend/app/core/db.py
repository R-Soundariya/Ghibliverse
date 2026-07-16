from collections.abc import Generator
from functools import lru_cache

from sqlalchemy import create_engine
from sqlalchemy.engine import Engine
from sqlalchemy.orm import DeclarativeBase, Session, sessionmaker

from app.core.config import get_settings


class Base(DeclarativeBase):
    pass


@lru_cache
def get_engine() -> Engine:
    """Lazy so importing this module doesn't require SUPABASE_DB_URL (tests override get_db)."""
    return create_engine(get_settings().supabase_db_url, pool_pre_ping=True)


def get_db() -> Generator[Session, None, None]:
    session = sessionmaker(bind=get_engine(), autoflush=False, autocommit=False)()
    try:
        yield session
    finally:
        session.close()
