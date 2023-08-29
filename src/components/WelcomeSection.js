import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fetch, util, DisplayMedia, Genres, MediaTable } from "./";
function WelcomeSection() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [trendingTime, setTrendingTime] = useState("day");
  const [trendingContent, setTrendingContent] = useState([]);
  const [posterSize, setPosterSize] = useState(
    window.innerWidth > 768 ? "w154" : "w92"
  );

  useEffect(() => {
    Fetch(
      "movie/now_playing",
      1,
      "GET",
      "include_adult=false&include_video=false&language=en-US&page=1"
    ).then(({ results }) => {
      const arr = results.slice(0, 10);
      setCarouselItems(arr.filter((val) => val.backdrop_path !== null));
    });
  }, []);

  useEffect(() => {
    Fetch(
      `trending/all/${trendingTime}`,
      1,
      "GET",
      "include_adult=false&include_video=false&language=en-US&page=1"
    ).then(({ results }) => {
      setTrendingContent(results);
    });
  }, [trendingTime]);

  window.onresize = () => {
    if (window.innerWidth > 768 && posterSize !== "w154") setPosterSize("w154");
    else if (window.innerWidth < 768 && posterSize === "w154")
      setPosterSize("w92");
  };
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
      <section className="my-4">
        <div className="d-flex overflow-x-scroll gap-4 p-4">
          <MediaTable
            param={
              "include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&with_origin_country=JP&vote_count.gte=2000"
            }
            title="Anime"
          />
          <MediaTable
            param={
              "include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_origin_country=KR&vote_count.gte=200"
            }
            title="K-Drama"
          />
          <MediaTable
            param={
              "include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&vote_count.gte=2000"
            }
            title="Web Series"
          />
          <MediaTable
            param={
              "include_adult=false&include_video=false&language=en-US&page=1&sort_by=popularity.desc&with_genres=16&with_origin_country=JP&vote_count.gte=2000"
            }
            title="Hindi"
          />
        </div>
      </section>
    </main>
  );
}

export default WelcomeSection;
