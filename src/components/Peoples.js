import { useState, useRef, useEffect } from "react";
import { util, Pagination, Fetch } from ".";
import { Link } from "react-router-dom";
function Peoples() {
  const [page, setPage] = useState(1);
  const [peoplesList, setPeoplesList] = useState([]);
  const totalPages = useRef();
  const { config, Badge } = util();

  useEffect(() => {
    Fetch(
      "person/popular",
      `${page}`,
      "GET",
      `language=en-US`
    ).then((response) => {
      console.log(response);
      setPeoplesList(response.results);
      totalPages.current = response.total_pages;
    });
  }, [page]);

  return (
    <div className="container-fluid py-5">
      <div className="row justify-content-center gap-5">
        <div className="col-11">
          <div>
            <Badge>Popular People</Badge>
            <h3 className="mt-3">Total pages {totalPages.current}</h3>
          </div>
        </div>
        <div className="col-11">
          <div className="card-body d-flex gap-3 gap-sm-4 gap-md-5 justify-content-center flex-wrap">
            {peoplesList.map((val) => (
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
                    <h4>{val.known_for_department}</h4>
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

export default Peoples;
