import { useEffect, useState } from "react";
import { Fetch, util } from "./";
function WelcomeSection() {
  const [carouselItems, setCarouselItems] = useState([]);
  const [trendingTime, setTrendingTime] = useState("day");
  const [trendingContent, setTrendingContent] = useState([]);
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
      <div className="container-fluid my-4">
        <div className="row g-3 justify-content-center">
          <div className="col-lg-7 col-md-6 col-12">
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
                      >
                        <img
                          src={config + "original" + val.backdrop_path}
                          alt="slide"
                          className="img-fluid"
                        />
                        <div className="caption d-flex flex-column gap-1">
                          <h4>#Now Playing</h4>
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
          </div>
          <div className="col-lg-5 col-md-6 col-12">
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
              <div className="card-body d-flex align-items-center justify-content-center flex-wrap gap-2" id='trending_section'>
                {
                  trendingContent.map( val=> (
                    <div key={val.id} className="card">
                  <div className="card-body">
                    <img src={`${config}/w92/${val.poster_path}`} className="img-fluid" alt='slide_for_trending' />
                  </div>
                  <div className="card-footer">

                  </div>
                </div>
                  ))
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelcomeSection;
