import "./App.css";
import "./ResponsiveApp.css";
import { Fragment, useEffect, useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
  CategorySearch,
  Feed,
  Peoples,
  MediaInfo,
  Navbar,
  SearchFeed,
  Person,
  Footer,
  FirstPage,
} from "./components";
function App() {
  const location = useLocation();

  const [viewProject, setViewProject] = useState(false);

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [location]);

  return viewProject ? (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route
          path="/categorySearch/:category/:heading/"
          element={<CategorySearch />}
        />
        <Route path="/peoples" element={<Peoples />} />
        <Route path="/:mediaId" element={<MediaInfo />} />
        <Route path="/searchFeed" element={<SearchFeed />} />
        <Route path="/person" element={<Person />} />
      </Routes>
      <Footer />
    </Fragment>
  ) : (
    <FirstPage setViewProject={setViewProject} />
  );
}

export default App;
