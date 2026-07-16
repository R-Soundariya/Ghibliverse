from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.db import get_db
from app.schemas.analytics import (
    DirectorPerformance,
    GenreBreakdown,
    KpiSummary,
    MovieComparisonRow,
    RatingBucket,
    RevenueByYear,
    RoiEntry,
    SuccessFactors,
)
from app.services import analytics_service

router = APIRouter(prefix="/api/analytics", tags=["analytics"])


@router.get("/kpis", response_model=KpiSummary)
def kpis(db: Session = Depends(get_db)) -> KpiSummary:
    return KpiSummary(**analytics_service.get_kpis(db))


@router.get("/revenue-by-year", response_model=list[RevenueByYear])
def revenue_by_year(db: Session = Depends(get_db)) -> list[RevenueByYear]:
    return analytics_service.get_revenue_by_year(db)


@router.get("/rating-distribution", response_model=list[RatingBucket])
def rating_distribution(db: Session = Depends(get_db)) -> list[RatingBucket]:
    return analytics_service.get_rating_distribution(db)


@router.get("/genre-breakdown", response_model=list[GenreBreakdown])
def genre_breakdown(db: Session = Depends(get_db)) -> list[GenreBreakdown]:
    return analytics_service.get_genre_breakdown(db)


@router.get("/director-performance", response_model=list[DirectorPerformance])
def director_performance(db: Session = Depends(get_db)) -> list[DirectorPerformance]:
    return analytics_service.get_director_performance(db)


@router.get("/roi-leaderboard", response_model=list[RoiEntry])
def roi_leaderboard(db: Session = Depends(get_db)) -> list[RoiEntry]:
    return analytics_service.get_roi_leaderboard(db)


@router.get("/success-factors", response_model=SuccessFactors)
def success_factors(db: Session = Depends(get_db)) -> SuccessFactors:
    return SuccessFactors(**analytics_service.get_success_factors(db))


@router.get("/movie-comparison", response_model=list[MovieComparisonRow])
def movie_comparison(db: Session = Depends(get_db)) -> list[MovieComparisonRow]:
    return analytics_service.get_movie_comparison(db)
