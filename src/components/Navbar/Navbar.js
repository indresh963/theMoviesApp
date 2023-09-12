import React from "react";
import "./Navbar.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import RightNavbar from "./RightNavbar";
import LeftNavbar from "./LeftNavbar";

function Navbar() {
  const [hide, setHide] = useState(window.innerWidth < 768);
  const navigate = useNavigate();
  const [ query, setQuery ] = useState('');

  function handleKeyUp(e){
    if(e.key === 'Enter') handleSearch();
  }
  function handleChange(e){
    setQuery(e.target.value);
  }
  const handleSearch = () => {
    navigate('/searchFeed',{state:query})
    setQuery('');
  }
  window.addEventListener('resize',() => {
    if (window.innerWidth > 768 && hide) {
      setHide(false);
    } else if (window.innerWidth < 768 && !hide) {
      setHide(true);
    }
  })
  return (
    <>
      <nav>
        <div className="container-fluid py-1 px-sm-5 px-2 d-flex gap-3">
          <RightNavbar hide={hide} />
          <LeftNavbar hide={hide} />
        </div>
      </nav>
      <div
        className="collapse m-2"
        id="searchBox"
      >
        <div className="d-flex align-items-center gap-3">
        <div className="input-group" id='hide_search_bar'>
            <input value={query} onChange={handleChange} onKeyUp={handleKeyUp} type="search" className="form-control" />
            <button onClick={handleSearch} type="button" className="input-group-text">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Navbar;
