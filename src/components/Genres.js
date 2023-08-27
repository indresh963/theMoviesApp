import React from "react";
import { Link } from "react-router-dom";
import { util } from "./";
function Genres() {
  const genres = [
    {
      img: require("../assets/action.png"),
      name: "Action",
      genre: "action",
    },
    {
      img: require("../assets/adventure.png"),
      name: "Adventure",
      genre: "adventure",
    },
    {
      img: require("../assets/anime.png"),
      name: "Animation",
      genre: "animation",
    },
    {
      img: require("../assets/comedy.png"),
      name: "Comedy",
      genre: "comedy",
    },
    {
      img: require("../assets/crime.png"),
      name: "Crime",
      genre: "crime",
    },
    {
      img: require("../assets/drama.png"),
      name: "Drama",
      genre: "drama",
    },
    {
      img: require("../assets/family.png"),
      name: "Family",
      genre: "family",
    },
    {
      img: require("../assets/horror.png"),
      name: "Horror",
      genre: "horror",
    },
    {
      img: require("../assets/romance.png"),
      name: "Romance",
      genre: "romance",
    },
    {
      img: require("../assets/sci-fi.png"),
      name: "Sci-Fi",
      genre: "sci-fi",
    },
    {
      img: require("../assets/thriller.png"),
      name: "Thriller",
      genre: "thriller",
    },
    {
      img: require("../assets/war.png"),
      name: "War",
      genre: "war",
    },
  ];

  const { Badge } = util();
  return (
    <section className="mt-5 mb-4">
      <div className="d-flex flex-column gap-4">
        <div className="ms-3">
          <Badge>Genres</Badge>
        </div>
        <div className="genre-body px-3">
          {genres.map((val) => (
            <Link key={val.genre} to={`/genreMedia/${val.genre}`}>
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
