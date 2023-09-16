import "./App.css";
import "./ResponsiveApp.css";
import { Fragment, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { CategorySearch, Feed, Peoples, MediaInfo, Navbar, SearchFeed } from "./components";
function App() {

  const location = useLocation();
  
  useEffect(()=>{
    window.scrollTo({
      top:0,
      left:0,
      behavior:'smooth'
    })
  },[location])
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path="/categorySearch/:category/:heading/" element={<CategorySearch />} />
        <Route path="/peoples" element={<Peoples />} />
        <Route path="/:mediaId" element={<MediaInfo />} />
        <Route path="/searchFeed" element={<SearchFeed />} />
      </Routes>
    </Fragment>
  );
}

export default App;
