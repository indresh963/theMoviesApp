import React from "react";
import "./Navbar.css";
import { useState } from "react";
import RightNavbar from "./RightNavbar";
import LeftNavbar from "./LeftNavbar";
function Navbar() {
  const [hide, setHide] = useState(window.innerWidth < 768);
  window.onresize = () => {
    if (window.innerWidth > 768 && hide) {
      setHide(false);
    } else if (window.innerWidth < 768 && !hide) {
      setHide(true);
    }
  };

  return (
    <>
      <nav>
        <div className="container-fluid py-2 px-sm-5 px-2 d-flex gap-3">
          <RightNavbar hide={hide} />
          <LeftNavbar hide={hide} />
        </div>
      </nav>
      <div
        className="collapse m-2"
        id="searchBox"
      >
        <div className="d-flex align-items-center gap-3">
        <input type="search" className="form-control " />
        <button className="btn-close " data-bs-toggle='collapse' data-bs-target='#searchBox'></button>
        </div>
      </div>
    </>
  );
}

export default Navbar;
