import { useLocation, Link } from "react-router-dom";
import { Fetch, Pagination, util } from "./";
import { useEffect, useState, useRef } from "react";
function SearchFeed() {
  const [searchData, setSearchData] = useState([]);
  const [field, setField] = useState("movie");
  const [page, setPage] = useState(1);
  const totalPages = useRef();
  const query = useLocation().state;
  const { config } = util();

  useEffect(() => {
    Fetch(
      `search/${field}`,
      `${page}`,
      "GET",
      `query=${query}&include_adult=false&include_video=false&language=en-US`
    ).then((response) => {
      setSearchData(response.results);
      totalPages.current = response.total_pages;
    });
  }, [query, field, page]);

  function handleField(e) {
    setField(e.target.value);
    setPage(1);
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
        <div className="row justify-content-center gap-5">
          <div className="col-11">
            <h2 className="query">
              search results for <span>{query}</span>
            </h2>
            <h3 className="mt-3">Total pages {totalPages.current}</h3>
          </div>
          <div className="col-11">
            <div className="card-body d-flex gap-3 gap-sm-4 gap-md-5 justify-content-center flex-wrap">
              {searchData[0] ? (
                searchData.map((val) => (
                  <Link key={val.id} to={field === "person" ? "/person" : `/${val.id}`} state={field === "person" ? {personId:val.id} : {mediaType:field}}>
                    <div
                      className="card media-card-body"
                      style={{ maxWidth: "min-content" }}
                    >
                      <div className="card-body flex-grow-0">
                        <img
                          src={
                            val.poster_path || val.profile_path
                              ? `${config}/${
                                  window.innerWidth > 768 ? "w154" : "w92"
                                }/${val.poster_path ?? val.profile_path}`
                              : require(window.innerWidth > 768
                                  ? "../assets/placeholder2.jpg"
                                  : "../assets/placeholder4.jpg")
                          }
                          alt="slide_for_trending"
                          className="media-img shadow-sm"
                        />
                        {val?.media_type && (
                          <span className="media-type">{val.media_type}</span>
                        )}
                      </div>
                      <div className="card-footer mt-2">
                        <h3>{val?.title ?? val?.name}</h3>
                        <h4>
                          {val.first_air_date ??
                            val.release_date ??
                            val.known_for_department}
                        </h4>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <h2>No results match for your search</h2>
              )}
            </div>
          </div>
          <div className="col-11">
            <Pagination
              total_pages={totalPages.current}
              setPage={setPage}
              page={page}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchFeed;
