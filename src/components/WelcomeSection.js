import { useEffect, useState } from "react";
import { Fetch, util } from "./";
function WelcomeSection() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [trendingTime, setTrendingTime] = useState("day");
  const [trendingContent, setTrendingContent] = useState([]);
  const [posterSize, setPosterSize] = useState(window.innerWidth > 768 ? 'w154' : 'w92');
   window.onresize = ()=>{
    if(window.innerWidth > 768 && posterSize !== 'w154') setPosterSize('w154')
    else if(window.innerWidth < 768 && posterSize === 'w154') setPosterSize('w92')
   }
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
  function setTrends(e) {
    setTrendingTime(e.target.value);
  }
  console.log(trendingContent);
  const { config, Badge } = util();
  return (
    <div>
      <div
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
                    ind === 0 ? " carousel-item active" : "carousel-item"
                  }
                  data-bs-interval="4000"
                  style={{
                    backgroundImage: `url(${config}/original/${val.backdrop_path})`,
                    backgroundSize: "cover",
                    backgroundRepeat: "no-repeat",
                    backgroundPosition: "center",
                    height: "500px",
                  }}
                >
                  <div className="caption d-flex flex-column gap-1">
                    <h1>#Now Playing</h1>
                    <h2>{val.title}</h2>
                    <ul className="nav gap-3 align-items-center">
                      <li className="nav-item">
                        <h3>
                          <i className="fa-solid fa-star"></i>{" "}
                          {val.vote_average}
                        </h3>
                      </li>
                      <li className="lang">{val.original_language}</li>
                    </ul>
                  </div>
                </div>
              )
          )}
        </div>
      </div>
      <div className="my-4">
        <div className="card" id="trending">
          <div className="card-header">
            <div className="d-flex align-items-center justify-content-between">
              <Badge>Trending</Badge>

              <div className="btn-container">
                <input
                  type="radio"
                  onChange={setTrends}
                  checked={trendingTime === "day"}
                  id="today"
                  value="day"
                  name="trending"
                />
                <label htmlFor="today">Today</label>
                <input
                  type="radio"
                  onChange={setTrends}
                  checked={trendingTime === "week"}
                  id="this_week"
                  value="week"
                  name="trending"
                />
                <label htmlFor="this_week">This Week</label>
              </div>
            </div>
          </div>
          <div
            className="card-body d-flex gap-3"
            id="trending_section"
          >
            {trendingContent.map((val) => (
              <div key={val.id} className="card flex-shrink-0 trending-card-body">
                <div className="card-body flex-grow-0">
                  <img
                    src={`${config}/${posterSize}/${val.poster_path}`}
                    alt="slide_for_trending"
                    className="trending-img"
                  />
                  <span className="media-type">{val.media_type}</span>
                </div>
                <div className="card-footer">
                  <h3>{val?.original_title ?? val?.name}</h3>
                  <h4>{val.first_air_date ?? val.release_date}</h4>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
