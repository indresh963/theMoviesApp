import React from "react";
import { Link } from "react-router-dom";
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
          <Link className="dropdown-item nav-link" to={`/categorySearch/movies/popular/${null}`}>
            Popular
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/movies/now_playing/${null}`}>
            Now Playing
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/movies/top_rated/${null}`}>
            Top Rated
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/movies/upcoming/${null}`}>
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
          <Link className="dropdown-item nav-link" to={`/categorySearch/tv/popular/${null}`}>
            Popular
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/tv/now_playing/${null}`}>
            Now Playing
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/tv/top_rated/${null}`}>
            Top Rated
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/tv/upcoming/${null}`}>
            Upcoming
          </Link>
        </ul>
      </li>
      <li className="nav-item">
        <button type="button" className="nav-link">
          <Link to="/peoples" className='link'>Peoples</Link>
        </button>
      </li>
    </ul>
  );
}

export default OnShow;
