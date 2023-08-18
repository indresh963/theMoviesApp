import React from "react";
import { Link } from 'react-router-dom';
function OnHIde() {
  return (
    <div className="offcanvas offcanvas-start d-flex" id="navigator-menu">
      <div className="offcanvas-header">
        <h2 className="offcanvas-title">Menu</h2>
        <button
          type="button"
          className="btn-close"
          data-bs-dismiss="offcanvas"
        ></button>
      </div>
      <div className="offcanvas-body">
        <ul className="nav flex-column flex-grow" id="parent">
          <li className="nav-item">
            <button
              type="button"
              data-bs-target="#movies"
              data-bs-toggle="collapse"
              className="nav-link link"
            >
              Movies
            </button>
            <ul
              className="nav flex-column collapse ms-3"
              data-bs-parent="#parent"
              id="movies"
            >
              <li className="nav-item" data-bs-dismiss='offcanvas' role='button'>
                <Link  className='nav-link' to="movies/popular">Popular</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to="movies/nowPlaying">Now Playing</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to="movies/topRated">Top Rated</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to="movies/upcoming">Upcoming</Link>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <button
              type="button"
              data-bs-target="#tvshows"
              data-bs-toggle="collapse"
              className="nav-link link"
            >
              TV shows
            </button>
            <ul
              className="nav flex-column collapse ms-3"
              data-bs-parent="#parent"
              id="tvshows"
            >
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to="tvShows/popular">Popular</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to="tvShows/nowPlaying">Now Playing</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to="tvShows/topRated">Top Rated</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to="/tvShows/upcoming">Upcoming</Link>
              </li>
            </ul>
          </li>
          <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
          <Link to='peoples' className="nav-link link">Peoples</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OnHIde;