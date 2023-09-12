import { useState, useEffect } from "react";
import { Fetch, util } from ".";

function Filter() {
  const [country, setCountry] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [providers, setProviders] = useState([]);
  const [lowerScore, setLowerScore] = useState("0");
  const [upperScore, setUpperScore] = useState("10");
  const [maxDuration, setMaxDuration] = useState("400");
  const [minDuration, setMinDuration] = useState("0");
  const [minUserVotes, setMinUserVotes] = useState("0");
  const [searchCast, setSearchCast] = useState([]);
  const [cast, setCast] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState([]);
  const [keywords, setKeywords] = useState([]);

  const { config, genres } = util();

  useEffect(() => {
    Fetch(`configuration/countries`, 1, "GET", `language=en-US`).then(
      (response) => {
        setCountry(response);
      }
    );
    Fetch(`configuration/languages`, 1, "GET", `language=en-US`).then(
      (response) => {
        setLanguages(response);
      }
    );
    Fetch(
      `watch/providers/movie`,
      1,
      "GET",
      `language=en-US&watch_region=IN`
    ).then(({ results }) => {
      setProviders(results);
    });
  }, []);

  function searchKeywordFunc(e) {
    Fetch(
      `search/keyword`,
      1,
      "GET",
      `query=${e.target.value}&language=en-US`
    ).then(({ results }) => {
      setSearchKeyword(results);
    });
  }

  function setKeywordFunc({ id, name }) {
    setKeywords([...keywords, { id, name }]);
    setSearchKeyword([]);
  }

  function searchCastFunc(e) {
    Fetch(
      `search/person`,
      1,
      "GET",
      `query=${e.target.value}&language=en-US`
    ).then(({ results }) => {
      setSearchCast(results);
    });
  }

  function setCastFunc({ id, name }) {
    setCast([...cast, { id, name }]);
    setSearchCast([]);
  }

  function removeData(ind,func,arr) {
    arr.splice(ind,1);
    func([...arr]);
  }

  console.log(keywords);
  return (
    <div className="d-flex flex-column gap-4">
      <div className="filter-section">
        <button
          className="filter-button"
          data-bs-toggle="collapse"
          data-bs-target="#sort"
          type="button"
        >
          Sort by
        </button>
        <div className="options border-top collapse p-3" id="sort">
          <label htmlFor="sortby">Sort by</label>
          <select id="sortby">
            <option value="popularity.desc">Popularity descending</option>
            <option value="popularity.asc">Popularity ascending</option>
            <option value="vote_average.desc">Votes descending</option>
            <option value="vote_average.desc">Votes ascending</option>
            <option value="revenue.desc">revenue descending</option>
            <option value="revenue.asc">revenue ascending</option>
            <option value="primary_release_date.desc">
              release date descending
            </option>
            <option value="primary_release_date.asc">
              release date ascending
            </option>
            <option value="vote_count.desc">Vote descending</option>
            <option value="vote_count.asc">Vote ascending</option>
          </select>
        </div>
      </div>
      <div className="filter-section">
        <button
          className="filter-button"
          data-bs-toggle="collapse"
          data-bs-target="#region&platform"
          type="button"
        >
          Country and OTT
        </button>
        <div className="options border-top collapse p-3" id="region&platform">
          <label htmlFor="countries">Country</label>
          <select defaultValue="IN" id="countries">
            {country.map((val) => (
              <option
                selected={val.iso_3166_1 === "IN"}
                key={val.iso_3166_1}
                value={val.iso_3166_1}
              >
                {val.english_name}
              </option>
            ))}
          </select>
          <div
            id="providers"
            className="d-flex flex-wrap gap-3 mt-4 justify-content-center"
          >
            {providers.map((val) => (
              <div key={val.provider_id}>
                <input
                  className="d-none"
                  id={val.provider_id}
                  type="checkbox"
                  name="providers"
                  value={val.provider_id}
                />
                <label htmlFor={val.provider_id} title={val.provider_name}>
                  <img
                    className="rounded"
                    src={`${config}/w45/${val.logo_path}`}
                    alt="provider-logo"
                  />
                </label>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="filter-section">
        <button
          className="filter-button"
          data-bs-toggle="collapse"
          data-bs-target="#filter"
          type="button"
        >
          Filters
        </button>
        <div className="options border-top show collapse p-3" id="filter">
          <div className="mb-4">
            <label htmlFor="countries">Language</label>
            <select defaultValue="IN" id="countries">
              <option val="" selected disabled>
                -- Select a language --
              </option>
              {languages.map((val) => (
                <option key={val.iso_639_1} value={val.iso_639_1}>
                  {val.english_name}
                </option>
              ))}
            </select>
          </div>

          <div className="mb-4">
            <h6>Genres</h6>
            <div className="d-flex flex-wrap gap-2 mt-3">
              {genres.map((val) => (
                <div key={val.genreId}>
                  <input
                    className="d-none"
                    type="checkbox"
                    id={val.genreId}
                    value={val.genreId}
                    name="genre"
                  />
                  <label className="genre-btn" htmlFor={val.genreId}>
                    {val.name}
                  </label>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <h6>Rating</h6>
            <div
              className="slider-container mt-4"
              data-title={"Rated   " + lowerScore + " - " + upperScore}
            >
              <span
                className="dual-slider"
                style={{
                  position: "absolute",
                  left: `${lowerScore * 10}%`,
                  right: `${(10 - upperScore) * 10}%`,
                }}
              ></span>
              <input
                onInput={(e) => {
                  if (
                    lowerScore === upperScore &&
                    +e.target.value - 1 === +lowerScore
                  )
                    setUpperScore(e.target.value);
                  setLowerScore(e.target.value);
                }}
                value={lowerScore}
                type="range"
                min="0"
                max="10"
              />
              <input
                onInput={(e) => {
                  if (
                    lowerScore === upperScore &&
                    +e.target.value + 1 === +upperScore
                  )
                    setLowerScore(e.target.value);
                  setUpperScore(e.target.value);
                }}
                value={upperScore}
                type="range"
                min="0"
                max="10"
              />
            </div>
          </div>

          <div className="mb-4">
            <h6>Minimum Votes</h6>
            <div
              className="slider-container mt-4"
              data-title={"Min Votes  " + minUserVotes}
            >
              <span
                className="dual-slider"
                style={{
                  position: "absolute",
                  left: "0",
                  right: `${(500 - minUserVotes) / 5}%`,
                }}
              ></span>
              <input
                onInput={(e) => {
                  setMinUserVotes(e.target.value);
                }}
                value={minUserVotes}
                type="range"
                min="0"
                max="500"
                step="50"
              />
            </div>
          </div>

          <div className="mb-4">
            <h6>Runtime</h6>
            <div
              className="slider-container mt-4"
              data-title={"Duration   " + minDuration + " - " + maxDuration}
            >
              <span
                className="dual-slider"
                style={{
                  position: "absolute",
                  left: `${minDuration / 4}%`,
                  right: `${(400 - maxDuration) / 4}%`,
                }}
              ></span>
              <input
                onInput={(e) => {
                  if (
                    minDuration === maxDuration &&
                    +e.target.value - 10 === +minDuration
                  )
                    setMaxDuration(e.target.value);
                  setMinDuration(e.target.value);
                }}
                value={minDuration}
                type="range"
                min="0"
                max="400"
                step="10"
              />
              <input
                onInput={(e) => {
                  if (
                    +minDuration === +maxDuration &&
                    +e.target.value + 10 === +maxDuration
                  )
                    setMinDuration(e.target.value);
                  setMaxDuration(e.target.value);
                }}
                value={maxDuration}
                type="range"
                min="0"
                max="400"
                step="10"
              />
            </div>
          </div>

          <div className="mb-4 border rounded p-2 release-date">
            <label htmlFor="countries">Release Region</label>
            <select defaultValue="IN" id="countries">
              {country.map((val) => (
                <option
                  selected={val.iso_3166_1 === "IN"}
                  key={val.iso_3166_1}
                  value={val.iso_3166_1}
                >
                  {val.english_name}
                </option>
              ))}
            </select>
            <h6 className="mt-4 mb-3">Release Date</h6>
            <div className="d-flex flex-column gap-3">
              <div className="d-flex justify-content-between">
                <label className="date-label">From</label>
                <input type="date" name="intial_release_date" />
              </div>
              <div className="d-flex justify-content-between">
                <label className="date-label">To</label>
                <input type="date" name="final_release_date" />
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h6 className="mb-3">Cast</h6>
            <div className="chip_search p-1 rounded border border-1">
              {cast.map((val, ind) => (
                <div key={val.id} className="chip">
                  <p>{val.name}</p>
                  <button
                    onClick={() => removeData(ind, setCast,cast)}
                    type="button"
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                </div>
              ))}
              <input
                onChange={searchCastFunc}
                className="filter-search"
                type="search"
                name="cast_search"
              />
            </div>
          </div>
          {searchCast[0] && (
            <ul className="list-group mb-4">
              {searchCast.map((val) => (
                <li
                  key={val.id}
                  className="list-group-item"
                  onClick={() => setCastFunc(val)}
                >
                  {val.profile_path && (
                    <img src={`${config}/w45/${val.profile_path}`} alt="cast" />
                  )}
                  <span>{val.name}</span>
                </li>
              ))}
            </ul>
          )}
          <div>
            <h6 className="mb-3">Keywords</h6>
            <div className="chip_search p-1 rounded border border-1">
              {keywords.map((val, ind) => (
                <div key={val.id} className="chip">
                  <p>{val.name}</p>
                  <button
                    onClick={() => removeData(ind,setKeywords,keywords)}
                    type="button"
                  >
                    <i className="fa-solid fa-x"></i>
                  </button>
                </div>
              ))}
              <input
                onChange={searchKeywordFunc}
                className="filter-search"
                type="search"
                name="cast_search"
              />
            </div>
          </div>
          {searchKeyword[0] && (
            <ul className="list-group mb-4">
              {searchKeyword.map((val) => (
                <li
                  key={val.id}
                  className="list-group-item"
                  onClick={() => setKeywordFunc(val)}
                >
                  {val.name}
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <button type='button' className="apply_filter">Search</button>
    </div>
  );
}

export default Filter;
