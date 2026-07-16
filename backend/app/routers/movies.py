from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.schemas.movie import MovieDetail, MovieListMeta, MovieListResponse
from app.services import movies_service

router = APIRouter(prefix="/api/movies", tags=["movies"])


@router.get("", response_model=MovieListResponse)
def list_movies(
    search: str | None = Query(default=None),
    genre: str | None = Query(default=None),
    sort: str | None = Query(default=None, pattern="^(rating_desc|year_desc|revenue_desc)$"),
    db: Session = Depends(get_db),
) -> MovieListResponse:
    movies = movies_service.list_movies(db, search=search, genre=genre, sort=sort)
    cards = [movies_service.to_card_dict(m) for m in movies]
    return MovieListResponse(data=cards, meta=MovieListMeta(count=len(cards)))


@router.get("/{slug}", response_model=MovieDetail)
def get_movie(slug: str, db: Session = Depends(get_db)) -> MovieDetail:
    movie = movies_service.get_movie_by_slug(db, slug)
    if movie is None:
        raise HTTPException(status_code=404, detail="Movie not found")
    return MovieDetail(**movies_service.to_detail_dict(movie))
