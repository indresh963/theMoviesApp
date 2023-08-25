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
          <Link className="dropdown-item nav-link" to="/movies/popular">
            Popular
          </Link>
          <Link className="dropdown-item nav-link" to="/movies/nowPlaying">
            Now Playing
          </Link>
          <Link className="dropdown-item nav-link" to="/movies/topRated">
            Top Rated
          </Link>
          <Link className="dropdown-item nav-link" to="/movies/upcoming">
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
          <Link className="dropdown-item nav-link" to="/tvShows/popular">
            Popular
          </Link>
          <Link className="dropdown-item nav-link" to="/tvShows/nowPlaying">
            Now Playing
          </Link>
          <Link className="dropdown-item nav-link" to="/tvShows/topRated">
            Top Rated
          </Link>
          <Link className="dropdown-item nav-link" to="/tvShows/upcoming">
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
