import React from "react";
import { Link } from "react-router-dom";
import { useDateSetter } from "../";
function OnShow() {
  return (
    <ul className="nav">
      <li className="nav-item dropdown">
        <button
          type="button"
          data-bs-toggle="dropdown"
          className="link nav-link d-flex align-items-center dropdown-toggle"
        >
          Movies
        </button>
        <ul className="dropdown-menu">
          <Link
            className="dropdown-item nav-link"
            to={`/categorySearch/movie/Popular Movies/`}
            state={{ paramsObj: { defaultSort: "popularity.desc" } }}
          >
            Popular
          </Link>
          <Link
            className="dropdown-item nav-link"
            to={`/categorySearch/movie/Now Playing Movies`}
            state={{
              paramsObj: {
                defaultSort: "popularity.desc",
                r_type: "2|3",
                defaultInitialRelease: useDateSetter("before", 25),
                defaultFinalRelease: useDateSetter("before", 0),
              },
            }}
          >
            Now Playing
          </Link>
          <Link
            className="dropdown-item nav-link"
            to={`/categorySearch/movie/Top Rated Movies/`}
            state={{
              paramsObj: {
                defaultSort: "vote_average.desc",
                defaultVotes: "200",
              },
            }}
          >
            Top Rated
          </Link>
          <Link
            className="dropdown-item nav-link"
            to={`/categorySearch/movie/Upcoming Movies/`}
            state={{
              paramsObj:{defaultSort: "popularity.desc",
              r_type: "2|3",
              defaultInitialRelease: useDateSetter("after", 5)}
            }}
          >
            Upcoming
          </Link>
        </ul>
      </li>
      <li className="nav-item dropdown">
        <button
          type="button"
          data-bs-toggle="dropdown"
          className=" link dropdown-toggle nav-link d-flex align-items-center"
        >
          TV shows
        </button>
        <ul className="dropdown-menu">
          <Link
            className="dropdown-item nav-link"
            to={`/categorySearch/tv/Popular TV Shows/`}
            state={{
              paramsObj:{
                defaultSort:"popularity.desc",
              }
            }}
          >
            Popular
          </Link>
          <Link
            className="dropdown-item nav-link"
            to={`/categorySearch/tv/TV Shows Airing Today`}
            state={{
              paramsObj:{
                defaultSort:"popularity.desc",
                defaultInitialRelease: useDateSetter("after", 0),
                defaultFinalRelease: useDateSetter("after", 0),
              }
            }}
          >
            Airing Today
          </Link>
          <Link
            className="dropdown-item nav-link"
            to={`/categorySearch/tv/Top Rated TV Shows`}
            state={{
              paramsObj: {
                defaultSort: "vote_average.desc",
                defaultVotes: "200",
              },
            }}
          >
            Top Rated
          </Link>
          <Link
            className="dropdown-item nav-link"
            to={`/categorySearch/tv/Currently Airing TV Shows`}
            state={{
              paramsObj:{
                defaultSort:"popularity.desc",
                defaultInitialRelease: useDateSetter("after", 0),
                defaultFinalRelease: useDateSetter("after", 0),
              }
            }}
          >
            On TV
          </Link>
        </ul>
      </li>
      <li className="nav-item">
        <button type="button" className="nav-link">
          <Link to="/peoples" className="link">
            Peoples
          </Link>
        </button>
      </li>
    </ul>
  );
}

export default OnShow;
