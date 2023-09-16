import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Fetch, util, DisplayMedia, Genres, MediaTable, Trailer, useDateSetter } from "./";
function WelcomeSection() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [trendingTime, setTrendingTime] = useState("day");
  const [trendingContent, setTrendingContent] = useState([]);
  const [ottPlatform, setOttPlatform] = useState("8");
  const [ottPopular, setOttPopular] = useState([]);
  const [upcomingMovieTrailers, setupcomingMovieTrailers] = useState([]);
  const { config } = util();
  const upcomingReleaseDate = useRef();
  upcomingReleaseDate.current = useDateSetter("after", 5);

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

    Fetch(
      `discover/movie`,
      1,
      "GET",
      `include_adult=false&include_video=true&language=en-US&page=1&primary_release_date.gte=${upcomingReleaseDate.current}&sort_by=popularity.desc`
    ).then(({ results }) => {
      setupcomingMovieTrailers(results.filter(val=>val.backdrop_path !== null));
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

  useEffect(() => {
    Fetch(
      `discover/tv/`,
      1,
      "GET",
      `include_adult=false&include_null_first_air_dates=false&language=en-US&page=1&sort_by=popularity.desc&vote_average.gte=7&watch_region=IN&with_watch_providers=${ottPlatform}&with_original_language=en`
    ).then(({ results }) => {
      setOttPopular(results);
    });
  }, [ottPlatform]);


  return (
    <main className="welcome">
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
      />
      <Genres />
      <section className="my-4 d-flex justify-content-center">
        <div className="d-flex overflow-x-scroll gap-4 p-4">
          <MediaTable
            param={
              "language=en-US&sort_by=popularity.desc&with_genres=16&with_original_language=ja&vote_count.gte=200"
            }
            paramsObj={{
              defaultSort:"popularity.desc",
              defaultGenre:[16],
              defaultOriginLanguage:"ja",
              defaultVotes:200,
            }}
            title="Anime"
          />
          <MediaTable
            param={
              "language=en-US&sort_by=popularity.desc&with_original_language=ko&vote_count.gte=100"
            }

            paramsObj={{
              defaultSort:"popularity.desc",
              defaultOriginLanguage:'ko',
              defaultVotes:100,
            }}

            title="K-Drama"
          />
          <MediaTable
            param={
              `language=en-US&sort_by=popularity.&with_original_language=en&with_watch_providers=8, 119, 122, 121, 232, 350, 237&vote_average.gte=8&vote_count.gte=200`
            }

            paramsObj={{
              defaultSort:"popularity.desc",
              defaultLowerScore:8,
              defaultVotes:200,
              defaultWatchProviders:[8, 119, 122, 121, 232, 350, 237],
              defaultOriginLanguage:"en"
            }}

            title="Web Series"
          />
          <MediaTable
            param={
              "language=en-US&sort_by=popularity.desc&with_original_language=hi"
            }

            paramsObj={{
              defaultSort:"popularity.desc",
              defaultOriginLanguage:"hi",
            }}

            title="Hindi Shows"
          />
        </div>
      </section>
      <DisplayMedia
        data={ottPopular}
        heading="On OTT"
        filterOptions={[
          "ottPopular",
          { id: "netflix", value: "8", filterName: "Netflix" },
          { id: "hotstar", value: "122", filterName: "Hotstar" },
          { id: "voot", value: "121", filterName: "Voot" },
        ]}
        setFilter={setOttPlatform}
        currentFilter={ottPlatform}
      />

      <Trailer
        data={upcomingMovieTrailers}
        heading="Upcoming Movies Trailer"
      />
    </main>
  );
}

export default WelcomeSection;
