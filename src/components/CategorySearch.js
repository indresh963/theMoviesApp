import { useState, useRef, useEffect, useReducer } from "react";
import { util, Pagination, Fetch, Filter } from ".";
import { Link, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const reducer = (state,{type,payload}) =>{
  
}
function CategorySearch() {
  const initialFilters = {
    vote_count_gte:0,
    vote_count_lte:0,
    vote_average_gte:0,
    vote_average_lte:0,
    with_cast:[],
    with_keyword:[],
    watch_region:'IN',
    with_genre:[],
    with_origin_country:'',
    sort_by:'',
    with_origin_language:'',
    runtime_gte:0,
    runtime_lte:400,
    with_watch_providers:[],
    certifications:[],
    release_date_gte:'',
    release_date_lte:'',
  }
  const { param1, param2, heading } = useParams();
  const [page, setPage] = useState(1);
  const [dataList, setDataList] = useState([]);
  const [ filter, dispatch ] = useReducer(reducer,initialFilters);
  const totalPages = useRef();
  const { config } = util();
  const location = useLocation();
  useEffect(() => {
    Fetch(`${param1}/${param2}`, `${page}`, "GET", `language=en-US`).then(
      (response) => {
        setDataList(response.results);
        totalPages.current = response.total_pages;
      }
    );
  }, [page,param1,param2]);

  useEffect(()=>setPage(1),[location])

  return (
    <div className="container-fluid py-4">
      <div className="row justify-content-center gap-4">
        <div className="col-11">
          <h1>{heading}</h1>
        </div>
        <div className="col-lg-3 col-11">
          <Filter />
        </div>
        <div className="col-lg-8 col-11">
          <div className="card-body d-flex gap-3 gap-sm-4 justify-content-center flex-wrap">
            {dataList.map((val) => (
              <Link key={val.id} to={`/${val.id}`}>
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
            ))}
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
