import React from "react";

function LeftNavbar({ hide }) {
  return (
    <div className="d-inline-flex justify-content-around gap-4 align-items-center flex-md-fill">
      <button type="button">
        <i className="fa-solid fa-right-to-bracket"></i>
      </button>
      {hide ? (
        <>
          <button
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#searchBox"
            className="btn"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
        </>
      ) : (
        <div className="flex-fill">
          <div className="input-group">
            <input type="search" className="form-control" />
            <button type="button" className="input-group-text">
              <i className="fa-solid fa-magnifying-glass"></i>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LeftNavbar;
