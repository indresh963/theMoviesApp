import React from "react";
import { Link } from "react-router-dom";
import { util } from "./";
function Genres() {
  const genres = [
    {
      img: require("../assets/action.png"),
      name: "Action",
      genreId: 28,
    },
    {
      img: require("../assets/adventure.png"),
      name: "Adventure",
      genreId: 12,

    },
    {
      img: require("../assets/anime.png"),
      name: "Animation",
      genreId: 16,
    },
    {
      img: require("../assets/comedy.png"),
      name: "Comedy",
      genreId: 35,

    },
    {
      img: require("../assets/crime.png"),
      name: "Crime",
      genreId: 80,
    },
    {
      img: require("../assets/drama.png"),
      name: "Drama",
      genreId: 18,
    },
    {
      img: require("../assets/family.png"),
      name: "Family",
      genreId: 10751,
    },
    {
      img: require("../assets/horror.png"),
      name: "Horror",
      genreId: 27,
    },
    {
      img: require("../assets/romance.png"),
      name: "Romance",
      genreId: 10749,
    },
    {
      img: require("../assets/sci-fi.png"),
      name: "Sci-Fi",
      genreId: 878,
    },
    {
      img: require("../assets/thriller.png"),
      name: "Thriller",
      genreId: 53,
    },
    {
      img: require("../assets/war.png"),
      name: "War",
      genreId: 10752,
    },
    {
      img: require("../assets/mystery.png"),
      name: "Mystery",
      genreId: 9648,
    },
    {
        img: require("../assets/fantasy.png"),
        name: "Fantasy",
        genreId: 14,
      },
      {
        img: require("../assets/music.png"),
        name: "Music",
        genreId: 10402,
      },{
        img: require("../assets/history.png"),
        name: "History",
        genreId: 36,
      },
  ];

  const { Badge } = util();
  return (
    <section className="mt-5 mb-4">
      <div className="d-flex flex-column gap-4">
        <div className="ms-3">
          <Badge>Genres</Badge>
        </div>
        <div className="genre-body px-3 pb-4">
          {genres.map((val) => (
            <Link key={val.genre} to={`/genreMedia/${val.genreId}`}>
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
