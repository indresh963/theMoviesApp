import React from "react";
import { Link } from "react-router-dom";
import { util } from "./";
function Genres() {


  const { Badge,genres } = util();
  return (
    <section className="mt-5 mb-4">
      <div className="d-flex flex-column gap-4">
        <div className="ms-3">
          <Badge>Genres</Badge>
        </div>
        <div className="genre-body px-3 pb-4">
          {genres.map((val) => (
            <Link key={val.genreId} to={`/genreMedia/${val.genreId}`}>
              <div className="card">
                <div className="card-body">
                  <img
                    src={val.img}
                    alt="genre_category"
                    className="img-fluid"
                  />
                </div>
                <div className="card-footer">
                  <h3>{val.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Genres;
