import { useEffect, useMemo, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { Fetch, util, DisplayMedia, Genres, MediaTable, Trailer } from "./";
function WelcomeSection() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [trendingTime, setTrendingTime] = useState("day");
  const [trendingContent, setTrendingContent] = useState([]);
  const [ottPlatform, setOttPlatform] = useState("8");
  const [ottPopular, setOttPopular] = useState([]);
  const [upcomingMovieTrailers, setupcomingMovieTrailers] = useState([]);
  const date = new Date()
  const upcomingReleaseDate = useRef();

  useMemo(()=>{
    const thirtyOneDaysMonths = [0,2,4,6,7,9,11];
    const thirtyDaysMonths = [3,5,8,10];
    let day = date.getDate() < 10 ? "0"+date.getDate() : null;
    let month = date.getMonth() + 1;
    month = month < 10 ? "0"+ month : null;
    let year = date.getFullYear();
    if(thirtyDaysMonths.includes(date.getMonth())){
      if(day > 25){
        day = "01";
        month = Number(month) + 1;
        month = month < 10 ? "0"+month: month;
      }
      else{
        day = Number(day) + 5;
        day = day < 10 ? "0"+day: day;
      }
    }else if(thirtyOneDaysMonths.includes(date.getMonth())){
      if(month === "12" && day > 26){
        year = Number(year) + 1; month = "01"; day = "01";
      }
      else if( day > 26 ){
        day = "01";
        month = Number(month) + 1;
        month = month < 10 ? "0"+month: month;
      }else{
        day = Number(day) + 5;
        day = day < 10 ? "0"+day: day;
      }
    }else{
      if(year%4 === 0  || year%400 === 0){
        if( day > 24 ){
          day = "01";
          month = Number(month) + 1;
          month = month < 10 ? "0"+month: month;
        }
      }
      else if( day > 23){
        day = "01";
        month = Number(month) + 1;
        month = month < 10 ? "0"+month: month;
      }else{
        day = Number(day) + 5;
        day = day < 10 ? "0"+day: day;
      }
    }
    upcomingReleaseDate.current = year + "-" + month + "-" + day;
  },[])

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

  const { config } = util();
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
              "language=en-US&sort_by=popularity.desc&with_genres=16&with_origin_country=JP&vote_count.gte=200"
            }
            title="Anime"
          />
          <MediaTable
            param={
              "language=en-US&sort_by=popularity.desc&with_origin_country=KR"
            }
            title="K-Drama"
          />
          <MediaTable
            param={
              "language=en-US&sort_by=popularity.desc&first_air_date_year=2023&vote_average.gte=7&vote_count.gte=100"
            }
            title="2023 Shows"
          />
          <MediaTable
            param={
              "language=en-US&sort_by=vote_average.desc&with_origin_country=IN"
            }
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
