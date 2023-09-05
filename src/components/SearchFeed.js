import { useLocation, Link } from "react-router-dom";
import { Fetch, util } from "./";
import { useEffect, useState } from "react";
function SearchFeed() {
  const [searchData, setSearchData] = useState([]);
  const [field, setField] = useState("movie");
  const query = useLocation().state;
  const { config } = util();

  useEffect(() => {
    Fetch(
      `search/${field}`,
      1,
      "GET",
      `query=${query}&include_adult=false&include_video=false&language=en-US&page=1`
    ).then(({ results }) => {
      setSearchData(results);
    });
  }, [query, field]);

  function handleField(e) {
    setField(e.target.value);
  }
  return (
    <div>
      <ul
        id="searchNav"
        className="nav nav-tabs nav-justified container-fluid pt-2"
      >
        <li className="nav-item">
          <button
            type="button"
            value="movie"
            onClick={handleField}
            className={field === "movie" ? "nav-link active" : "nav-link"}
          >
            Movie
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            value="tv"
            onClick={handleField}
            className={field === "tv" ? "nav-link active" : "nav-link"}
          >
            TV
          </button>
        </li>
        <li className="nav-item">
          <button
            type="button"
            value="person"
            onClick={handleField}
            className={field === "person" ? "nav-link active" : "nav-link"}
          >
            Person
          </button>
        </li>
      </ul>
      <div className="container-fluid py-5">
        <div className="card-body d-flex gap-4 gap-md-5 justify-content-center flex-wrap">
          {searchData.map((val) => (
            <Link key={val.id} to={`/${val.id}`}>
              <div className="card media-card-body" style={{maxWidth:"min-content"}}>
                <div className="card-body flex-grow-0">
                  <img
                    src={`${config}/${
                      window.innerWidth > 768 ? "w154" : "w92"
                    }/${val.poster_path}`}
                    alt="slide_for_trending"
                    className="media-img shadow-sm"
                  />
                  {val?.media_type && (
                    <span className="media-type">{val.media_type}</span>
                  )}
                </div>
                <div className="card-footer mt-2">
                  <h3>{val?.title ?? val?.name}</h3>
                  <h4>{val.first_air_date ?? val.release_date}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default SearchFeed;
