import { useState, useRef, useEffect, useReducer } from "react";
import { util, Pagination, Fetch, Filter } from ".";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";
const reducer = (state, { type, payload }) => {
  switch (type) {
    case "routeChanged":
      return{...payload};
    case "sort_by":
      return { ...state, sort_by: payload };
    case "watch_region":
      return { ...state, watch_region: payload };
    case "with_watch_providers":
      if (state.with_watch_providers.includes(payload)) {
        let localProviders = [...state.with_watch_providers];
        localProviders.splice(localProviders.indexOf(payload), 1);
        return {
          ...state,
          with_watch_providers: localProviders,
        };
      }
      return {
        ...state,
        with_watch_providers: [...state.with_watch_providers, payload],
      };
    case "language":
      return { ...state, with_origin_language: payload };
    case "genres":
      if (state.with_genre.includes(payload)) {
        let localGenre = [...state.with_genre];
        localGenre.splice(localGenre.indexOf(payload), 1);
        return {
          ...state,
          with_genre: localGenre,
        };
      }
      return {
        ...state,
        with_genre: [...state.with_genre, payload],
      };
    case "lowerScore":
      return { ...state, lowerScore: payload };
    case "upperScore":
      return { ...state, upperScore: payload };
    case "minUserVotes":
      return { ...state, minUserVotes: payload };
    case "minDuration":
      return { ...state, minDuration: payload };
    case "maxDuration":
      return { ...state, maxDuration: payload };
    case "keyCastAdd":
      let localState;
      if (payload.param === "keywords")
        localState = { ...state, keywords: [...state.keywords, payload.data] };
      if (payload.param === "cast")
        localState = { ...state, cast: [...state.cast, payload.data] };
      return localState;
    case "removeData":
      if (payload.param === "keywords") {
        let keywordArr = [...state.keywords];
        keywordArr.splice(payload.ind,1);
        return { ...state, keywords: keywordArr };
      }
      if (payload.param === "cast") {
        let castArr = [...state.cast];
        castArr.splice(payload.ind,1);
        return { ...state, cast: castArr };
      }
      break;
    case "release_region":
      return { ...state, release_region: payload };
    case "release":
      if (payload.param === "release_date_gte")
        return { ...state, release_date_gte: payload.data };
      if (payload.param === "release_date_lte")
        return { ...state, release_date_lte: payload.data };
      break;
    default:
      return state;
  }
};

function CategorySearch() {
  const { category,heading } = useParams();
  const location = useLocation();
  const { paramsObj } = location.state
  const {
    r_type,
    defaultGenre,
    defaultSort,
    defaultVotes,
    defaultInitialRelease,
    defaultFinalRelease,
    defaultOriginLanguage,
    defaultReleaseRegion,
    defaultLowerScore,
    defaultWatchProviders
  } = paramsObj;

  const [page, setPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [searchFlag, setSearchFlag] = useState(false);

  const initialFilters = {
    minUserVotes: defaultVotes ? defaultVotes : "0",
    lowerScore: defaultLowerScore ? defaultLowerScore : "0",
    upperScore: "10",
    cast: [],
    keywords: [],
    watch_region: "",
    with_genre: defaultGenre ? defaultGenre : [],
    sort_by: defaultSort ? defaultSort : "popularity.desc",
    with_origin_language: defaultOriginLanguage ? defaultOriginLanguage : "",
    minDuration: "0",
    maxDuration: "400",
    with_watch_providers: defaultWatchProviders ? defaultWatchProviders : [],
    release_date_gte: defaultInitialRelease ? defaultInitialRelease : "",
    release_date_lte: defaultFinalRelease ? defaultFinalRelease : "",
    release_region: defaultReleaseRegion ? defaultReleaseRegion : "",
    release_type: r_type,
  };

  const [filter, dispatch] = useReducer(reducer, initialFilters);
  const totalPages = useRef();
  const { config,formQueryString } = util();

  useEffect(()=>{
    page !== 1 ? setPage(1) : setSearchFlag(val=>!val);
    dispatch({type:"routeChanged",payload:initialFilters})
  },[location])

  useEffect(() => {
    console.log("changed route")
    Fetch(
      `discover/${category}`,
      `${page}`,
      "GET",
      `${formQueryString(filter,category,heading)}`
    ).then((response) => {
      setDataList(response.results);
      totalPages.current = response.total_pages;
    });
  }, [page,searchFlag]);

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center gap-4">
        <div className="col-11">
          <h1>{heading}</h1>
        </div>
        <div className="col-lg-3 col-11">
          <Filter media={category} setPage={setPage} setSearchFlag={setSearchFlag} state={filter} dispatch={dispatch} />
        </div>
        <div className="col-lg-8 col-11">
          <div className="card-body d-flex gap-3 gap-sm-4 justify-content-center flex-wrap">
            {
            dataList[0] ? (dataList.map((val) => (
              <Link key={val.id} state={{mediaType:category}} to={`/${val.id}`}>
                <div
                  className="card media-card-body"
                  style={{ maxWidth: "min-content" }}
                >
                  <div className="card-body flex-grow-0">
                    <img
                      src={
                        val.poster_path || val.profile_path
                          ? `${config}/${
                              window.innerWidth > 768 ? "w154" : "w92"
                            }/${val.poster_path ?? val.profile_path}`
                          : require(window.innerWidth > 768
                              ? "../assets/placeholder2.jpg"
                              : "../assets/placeholder4.jpg")
                      }
                      alt="slide_for_trending"
                      className="media-img shadow-sm"
                    />
                    {val?.media_type && (
                      <span className="media-type">{val.media_type}</span>
                    )}
                  </div>
                  <div className="card-footer mt-2">
                    <h3>{val?.title ?? val?.name}</h3>
                    <h4>{val.first_air_date ?? val.release_date}</h4>
                  </div>
                </div>
              </Link>
            ))) : <h2>No results found for your search</h2>
            }
          </div>
        </div>
        <div className="col-11">
          <Pagination
            total_pages={totalPages.current}
            setPage={setPage}
            page={page}
          />
        </div>
      </div>
    </div>
  );
}

export default CategorySearch;
