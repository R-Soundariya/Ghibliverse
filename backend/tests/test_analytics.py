import pytest


def test_kpis(client):
    response = client.get("/api/analytics/kpis")
    assert response.status_code == 200
    body = response.json()
    assert body["total_movies"] == 3
    assert body["avg_imdb_rating"] == 8.5
    assert body["highest_grossing"]["slug"] == "spirited-away"
    assert body["highest_grossing"]["value"] == 395_000_000
    assert body["most_awarded"]["slug"] == "spirited-away"
    assert body["most_awarded"]["value"] == 7
    assert body["highest_rated"]["slug"] == "spirited-away"
    assert body["highest_rated"]["value"] == 8.6


def test_revenue_by_year(client):
    response = client.get("/api/analytics/revenue-by-year")
    assert response.status_code == 200
    body = response.json()
    assert [row["release_year"] for row in body] == [1988, 1997, 2001]
    by_year = {row["release_year"]: row for row in body}
    assert by_year[2001]["box_office_usd"] == 395_000_000
    assert by_year[1988]["budget_usd"] == 4_500_000


def test_rating_distribution(client):
    response = client.get("/api/analytics/rating-distribution")
    assert response.status_code == 200
    body = {row["bucket"]: row["count"] for row in response.json()}
    assert sum(body.values()) == 3


def test_genre_breakdown(client):
    response = client.get("/api/analytics/genre-breakdown")
    assert response.status_code == 200
    body = {row["genre"]: row for row in response.json()}
    assert body["War"]["count"] == 2
    assert body["War"]["avg_rating"] == 8.45
    assert body["Fantasy"]["count"] == 2
    assert body["Fantasy"]["avg_rating"] == 8.5


def test_director_performance(client):
    response = client.get("/api/analytics/director-performance")
    assert response.status_code == 200
    body = response.json()
    assert [row["director"] for row in body] == ["Hayao Miyazaki", "Isao Takahata"]

    by_director = {row["director"]: row for row in body}
    assert by_director["Hayao Miyazaki"]["movie_count"] == 2
    assert by_director["Hayao Miyazaki"]["total_box_office_usd"] == 564_000_000
    assert by_director["Hayao Miyazaki"]["avg_box_office_usd"] == 282_000_000
    assert by_director["Hayao Miyazaki"]["avg_imdb_rating"] == 8.5
    assert by_director["Hayao Miyazaki"]["total_awards"] == 11
    assert by_director["Isao Takahata"]["movie_count"] == 1
    assert by_director["Isao Takahata"]["total_box_office_usd"] == 12_000_000


def test_roi_leaderboard(client):
    response = client.get("/api/analytics/roi-leaderboard")
    assert response.status_code == 200
    body = response.json()
    assert [row["slug"] for row in body] == [
        "spirited-away",
        "princess-mononoke",
        "grave-of-the-fireflies",
    ]
    assert body[0]["roi_multiple"] == pytest.approx(20.79, abs=0.01)


def test_success_factors(client):
    response = client.get("/api/analytics/success-factors")
    assert response.status_code == 200
    body = response.json()["correlations"]
    assert len(body) == 5

    by_label = {row["label"]: row for row in body}
    assert by_label["Critic score vs. box office"]["correlation"] == pytest.approx(0.10, abs=0.01)
    for row in body:
        assert -1.0 <= row["correlation"] <= 1.0
        assert row["insight"]


def test_movie_comparison(client):
    response = client.get("/api/analytics/movie-comparison")
    assert response.status_code == 200
    body = response.json()
    assert [row["release_year"] for row in body] == [1988, 1997, 2001]

    by_slug = {row["slug"]: row for row in body}
    assert by_slug["spirited-away"]["director"] == "Hayao Miyazaki"
    assert by_slug["spirited-away"]["roi_multiple"] == pytest.approx(20.79, abs=0.01)
