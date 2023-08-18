import "./App.css";
import { Fragment } from "react";
import { Navbar } from "./components/index";
import { Routes, Route } from "react-router-dom";
import { CategorySearch, Feed, Peoples } from "./components";
function App() {
  return (
    <Fragment>
      <Navbar />
      <Routes>
        <Route path="/" element={<Feed />} />
        <Route path=":form/:cat" element={<CategorySearch />} />
        <Route path="peoples" element={<Peoples />} />
      </Routes>
    </Fragment>
  );
}

export default App;
