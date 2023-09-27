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
    },
    {
      img: require("../assets/history.png"),
      name: "History",
      genreId: 36,
    },
  ];

  const config = "https://image.tmdb.org/t/p/";

  function Badge({ children }) {
    return (
      <span id="cbadge-container">
        <span className="cbadge">{children}</span>
      </span>
    );
  }

  function formQueryString(filter, media, cat) {
    let query = `language=en-US&include_video=false`;

    if (filter.with_origin_language)
      query += `&with_original_language=${filter.with_origin_language}`;

    if (filter.sort_by) query += `&sort_by=${filter.sort_by}`;

    if (filter.minUserVotes) query += `&vote_count.gte=${filter.minUserVotes}`;

    if (filter.lowerScore) query += `&vote_average.gte=${filter.lowerScore}`;

    if (filter.upperScore) query += `&vote_average.lte=${filter.upperScore}`;

    if (filter.watch_region) query += `&watch_region=${filter.watch_region}`;

    if (filter.minDuration) query += `&with_runtime.gte=${filter.minDuration}`;

    if (filter.maxDuration) query += `&with_runtime.lte=${filter.maxDuration}`;

    if (media === "movie") {
      if (filter.release_date_gte)
        query += `&primary_release_date.gte=${filter.release_date_gte}`;

      if (filter.release_date_lte)
        query += `&primary_release_date.lte=${filter.release_date_lte}`;
    } else {
      if (cat === "TV Shows Airing Today") {
        if (filter.release_date_gte)
          query += `&first_air_date.gte=${filter.release_date_gte}`;

        if (filter.release_date_lte)
          query += `&first_air_date.lte=${filter.release_date_lte}`;
      } else {
        if (filter.release_date_gte)
          query += `&air_date.gte=${filter.release_date_gte}`;

        if (filter.release_date_lte)
          query += `&air_date.lte=${filter.release_date_lte}`;
      }
    }

    if (filter.release_type)
      query += `&with_release_type=${filter.release_type}`;

    if (filter.release_region) query += `&region=${filter.release_region}`;

    if (filter.keywords[0])
      query += `&with_keywords=${filter.keywords
        .map((val) => val.id)
        .join(",")}`;

    if (filter.cast[0])
      query += `&with_cast=${filter.cast.map((val) => val.id).join(",")}`;

    if (filter.with_genre[0])
      query += `&with_genres=${filter.with_genre.join(",")}`;

    if (filter.with_watch_providers[0])
      query += `&with_watch_providers=${filter.with_watch_providers.join("|")}`;

    return query;
  }

  return { config, Badge, genres, formQueryString };
}
