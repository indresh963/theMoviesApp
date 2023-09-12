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
                <Link  className='nav-link' to={`/categorySearch/movie/popular/Popular Movies/${null}`}>Popular</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/movie/now_playing/Now Playing Movies/${null}`}>Now Playing</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/movie/top_rated/Top Rated Movies/${null}`}>Top Rated</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/movie/upcoming/Upcoming Movies/${null}`}>Upcoming</Link>
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
                <Link className='nav-link' to={`/categorySearch/tv/popular/Poplar TV Shows/${null}`}>Popular</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/tv/on_the_air/Currently Airing TV Shows/${null}`}>On TV</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/tv/top_rated/Top Rated TV Shows/${null}`}>Top Rated</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/tv/airing_today/TV Shows Airing Today/${null}`}>Airing Today</Link>
              </li>
            </ul>
          </li>
          <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
          <Link to='/peoples' className="nav-link link">Peoples</Link>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default OnHIde;
