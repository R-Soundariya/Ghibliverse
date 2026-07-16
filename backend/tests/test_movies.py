def test_list_movies_returns_all(client):
    response = client.get("/api/movies")
    assert response.status_code == 200
    body = response.json()
    assert body["meta"]["count"] == 3
    assert {m["slug"] for m in body["data"]} == {
        "spirited-away",
        "princess-mononoke",
        "grave-of-the-fireflies",
    }


def test_list_movies_search_filters_by_title(client):
    response = client.get("/api/movies", params={"search": "spirited"})
    assert response.status_code == 200
    body = response.json()
    assert body["meta"]["count"] == 1
    assert body["data"][0]["slug"] == "spirited-away"


def test_list_movies_genre_filter(client):
    response = client.get("/api/movies", params={"genre": "War"})
    assert response.status_code == 200
    body = response.json()
    assert body["meta"]["count"] == 2
    assert {m["slug"] for m in body["data"]} == {"princess-mononoke", "grave-of-the-fireflies"}


def test_list_movies_sort_rating_desc(client):
    response = client.get("/api/movies", params={"sort": "rating_desc"})
    ratings = [m["imdb_rating"] for m in response.json()["data"]]
    assert ratings == sorted(ratings, reverse=True)


def test_get_movie_detail(client):
    response = client.get("/api/movies/spirited-away")
    assert response.status_code == 200
    body = response.json()
    assert body["title"] == "Spirited Away"
    assert body["genres"] == ["Fantasy", "Adventure"]


def test_get_movie_detail_404(client):
    response = client.get("/api/movies/does-not-exist")
    assert response.status_code == 404
