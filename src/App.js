import "./App.css";
import "./ResponsiveApp.css";
import { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { CategorySearch, Feed, Peoples, MediaInfo,GenreMedia, Navbar, SearchFeed } from "./components";
function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/categorySearch/:param1/:param2/:heading/:filter" element={<CategorySearch />} />
        <Route path="/peoples" element={<Peoples />} />
        <Route path="/:mediaId" element={<MediaInfo />} />
        <Route path="/genreMedia/:genre" element={<GenreMedia />} />
        <Route path="/searchFeed" element={<SearchFeed />} />
      </Routes>
    </Fragment>
  );
}

export default App;
