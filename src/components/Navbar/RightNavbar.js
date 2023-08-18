import React from "react";
import OnHIde from "./OnHIde";
import OnShow from "./OnShow";
import { Link } from 'react-router-dom';
function rightNavbar({ hide }) {
  return (
    <div className="d-inline-flex align-items-center flex-fill justify-content-around">
      {hide && (
        <button
          type="button"
          data-bs-toggle="offcanvas"
          data-bs-target="#navigator-menu"
          className="btn"
        >
          <i className="fa-solid fa-bars"></i>
        </button>
      )}

      <Link to='/'><img src={require('../../assets/pngegg.png')} className="img-fluid" alt='logo'/></Link>

      <OnHIde />
      {
        !hide && <OnShow />
      }
    </div>
  );
}

export default rightNavbar;
