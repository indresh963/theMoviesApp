import React from "react";
import { Link } from 'react-router-dom';
import { useDateSetter } from "../";

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
                <Link  className='nav-link' to={`/categorySearch/movie/Popular Movies`} state={{ paramsObj: { defaultSort: "popularity.desc" } }}>Popular</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/movie/Now Playing Movies`} state={{
              paramsObj: {
                defaultSort: "popularity.desc",
                r_type: "2|3",
                defaultInitialRelease: useDateSetter("before", 25),
                defaultFinalRelease: useDateSetter("before", 0),
              },
            }}>Now Playing</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/movie/Top Rated Movies`} state={{
              paramsObj: {
                defaultSort: "vote_average.desc",
                defaultVotes: "200",
              },
            }}>Top Rated</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/movie/Upcoming Movies`} state={{
              paramsObj:{defaultSort: "popularity.desc",
              r_type: "2|3",
              defaultInitialRelease: useDateSetter("after", 5)}
            }}>Upcoming</Link>
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
                <Link className='nav-link' to={`/categorySearch/tv/Poplar TV Shows`} state={{
              paramsObj:{
                defaultSort:"popularity.desc",
              }
            }}>Popular</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/tv/Currently Airing TV Shows`} state={{
              paramsObj:{
                defaultSort:"popularity.desc",
                defaultInitialRelease: useDateSetter("after", 0),
                defaultFinalRelease: useDateSetter("after", 0),
              }
            }}>On TV</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/tv/Top Rated TV Shows`} state={{
              paramsObj: {
                defaultSort: "vote_average.desc",
                defaultVotes: "200",
              },
            }}>Top Rated</Link>
              </li>
              <li data-bs-dismiss='offcanvas' role='button' className="nav-item">
                <Link className='nav-link' to={`/categorySearch/tv/TV Shows Airing Today`} state={{
              paramsObj:{
                defaultSort:"popularity.desc",
                defaultInitialRelease: useDateSetter("after", 0),
                defaultFinalRelease: useDateSetter("after", 0),
              }
            }}>Airing Today</Link>
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
