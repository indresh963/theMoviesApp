import React from "react";

function FirstPage({ setViewProject }) {
  return (
    <div id="first_page">
      <div id="bubble">
        <div id="logo_container">
          <img
            src={require("../assets/pngegg.png")}
            alt="theMoviesApp_logo"
            className="applogo"
          />
          <div className="d-flex gap-3 justify-content-center">
            <div className="flex-shrink-0">
              <h2 id="txt_1">The Movies App</h2>
              <h3 id="txt_2">powered by</h3>
            </div>
            <img
              src={require("../assets/tmdbLogo.png")}
              alt="tmdb_logo"
              className="front_logo"
            />
          </div>
          <button type='button' onClick={()=>setViewProject(true)} id='show_prjct'>See Project</button>
          <span id='credits'>
            <strong>Credit:</strong> TMDB's API & inspired UI. JustWatch for watch providers. PngEgg's logo. FlatIcon genre icons.
          </span>
        </div>
      </div>
    </div>
  );
}

export default FirstPage;
