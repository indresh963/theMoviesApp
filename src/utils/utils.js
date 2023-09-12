

export default function utils() {

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


  const config = "http://image.tmdb.org/t/p/";

  function Badge({ children }) {
    return (
      <span id="cbadge-container">
        <span className="cbadge">{children}</span>
      </span>
    );
  }


  return { config, Badge, genres };
}
