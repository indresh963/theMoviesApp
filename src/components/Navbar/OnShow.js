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
          <Link className="dropdown-item nav-link" to={`/categorySearch/movie/popular/Popular Movies/${null}`}>
            Popular
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/movie/now_playing/Now Playing Movies/${null}`}>
            Now Playing
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/movie/top_rated/Top Rated Movies/${null}`}>
            Top Rated
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/movie/upcoming/Upcoming Movies/${null}`}>
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
          <Link className="dropdown-item nav-link" to={`/categorySearch/tv/popular/Popular TV Shows/${null}`}>
            Popular
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/tv/airing_today/TV Shows Airing Today/${null}`}>
            Airing Today
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/tv/top_rated/Top Rated TV Shows/${null}`}>
            Top Rated
          </Link>
          <Link className="dropdown-item nav-link" to={`/categorySearch/tv/on_the_air/Currently Airing TV Shows/${null}`}>
            On TV
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
