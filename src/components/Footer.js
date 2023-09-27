import React from "react";

function Footer() {
  return (
    <footer className="d-flex flex-column gap-2 py-3 px-4 align-items-center">
      <div className="d-flex align-items-center justify-content-center gap-2">
        <h2>A project from Indresh Chaudhary powered by</h2>
        <a href="https://www.themoviedb.org/" target="blank">
          <img src={require('../assets/tmdbLogo.png')} alt="tmdb_logo" id="tmdb_logo" />
        </a>
      </div>
      <h3>copyright © 2023 All Rights Reserved</h3>
    </footer>
  );
}

export default Footer;
