import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fetch, util, DisplayMedia, Genres } from "./";
function WelcomeSection() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [trendingTime, setTrendingTime] = useState("day");
  const [trendingContent, setTrendingContent] = useState([]);
  const [popularAnime, setPopularAnime] = useState([]);
  const [animeMediaType, setAnimeMediaType] = useState("tv");
  const [posterSize, setPosterSize] = useState(
    window.innerWidth > 768 ? "w154" : "w92"
  );

  useEffect(() => {
    Fetch("movie/now_playing", 1).then(({ results }) => {
      const arr = results.slice(0, 10);
      setCarouselItems(arr.filter((val) => val.backdrop_path !== null));
    });
  }, []);

  useEffect(() => {
    Fetch(`trending/all/${trendingTime}`, 1).then(({ results }) => {
      setTrendingContent(results);
    });
  }, [trendingTime]);

  useEffect(() => {
    Fetch(
      `discover/${animeMediaType}`,
      1,
      "GET",
      "include_adult=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&vote_count.gte=1000&with_origin_country=JP"
    ).then(({ results }) => {
      setPopularAnime(results);
    });
  }, [animeMediaType]);
  
  window.onresize = () => {
    if (window.innerWidth > 768 && posterSize !== "w154") setPosterSize("w154");
    else if (window.innerWidth < 768 && posterSize === "w154")
      setPosterSize("w92");
  };
  console.log(trendingContent);
  const { config } = util();
  return (
    <main>
      <section
        id="ongoing"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          {carouselItems.map(
            (val, ind) =>
              val.backdrop_path && (
                <button
                  key={val.id}
                  type="button"
                  data-bs-slide-to={ind}
                  data-bs-target="#ongoing"
                  className={ind === 0 ? "active" : null}
                ></button>
              )
          )}
        </div>
        <div className="carousel-inner">
          {carouselItems.map(
            (val, ind) =>
              val.backdrop_path && (
                <div
                  key={val.id}
                  className={
                    ind === 0
                      ? " carousel-item active d-flex flex-column justify-content-end"
                      : "carousel-item d-flex flex-column justify-content-end"
                  }
                  data-bs-interval="4000"
                  style={{
                    backgroundImage: `url(${config}/original/${val.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                  }}
                >
                  <div className="caption d-flex flex-column justify-self-end gap-md-3  gap-2">
                    <h3>#Now Playing</h3>
                    <h1>{val.title}</h1>
                    <p>
                      {window.innerWidth > 768
                        ? val.overview
                        : val.overview.split(" ").slice(0, 22).join(" ")}
                    </p>
                    <ul className="nav gap-3 align-items-center">
                      <li className="nav-item vote_count">
                        <i className="fa-solid fa-star me-2"></i>
                        {val.vote_average}
                      </li>
                      <li className="lang">{val.original_language}</li>
                    </ul>
                    <div>
                      <Link
                        to={`/${val.id}`}
                        className="main-btn d-inline-block"
                      >
                        <i className="fa-solid fa-circle-info me-2 align-baseline"></i>
                        See Details
                      </Link>
                    </div>
                  </div>
                </div>
              )
          )}
        </div>
      </section>
      <DisplayMedia
        data={trendingContent}
        heading="Trending"
        filterOptions={[
          "trending",
          { id: "day", value: "day", filterName: "Today" },
          { id: "week", value: "week", filterName: "This Week" },
        ]}
        setFilter={setTrendingTime}
        currentFilter={trendingTime}
        posterSize={posterSize}
      />
      <Genres />
      <DisplayMedia
        data={popularAnime}
        heading="Popular Anime"
        filterOptions={[
          "popular-anime",
          { id: "tv", value: "tv", filterName: "TV" },
          { id: "movie", value: "movie", filterName: "Movies" },
        ]}
        setFilter={setAnimeMediaType}
        currentFilter={animeMediaType}
        posterSize={posterSize}
      />
    </main>
  );
}

export default WelcomeSection;
