import "./App.css";
import "./ResponsiveApp.css";
import { Fragment } from "react";
import {  } from "./components/index";
import { Routes, Route } from "react-router-dom";
import { CategorySearch, Feed, Peoples, MediaInfo,GenreMedia, Navbar } from "./components";
function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/:form/:cat" element={<CategorySearch />} />
        <Route path="/peoples" element={<Peoples />} />
        <Route path="/:mediaId" element={<MediaInfo />} />
        <Route path="/genreMedia/:genre" element={<GenreMedia />} />
      </Routes>
    </Fragment>
  );
}

export default App;
