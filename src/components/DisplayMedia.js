import { Link } from "react-router-dom";
import { util } from "./";
import { Fragment } from "react";

function DisplayMedia({
  data,
  heading,
  filterOptions,
  setFilter,
  currentFilter,
}) {
  const { config, Badge } = util();
  function setParam(e, func) {
    func(e.target.value);
  }

  return (
    <section className="my-4">
      <div className="card media">
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <Badge>{heading}</Badge>
            <div className="btn-container">
              {filterOptions.map((val, ind) => {
                return (
                  ind !== 0 && (
                    <Fragment key={val.id}>
                      <input
                        type="radio"
                        onChange={(e) => setParam(e, setFilter)}
                        checked={currentFilter === val.value}
                        id={val.id}
                        value={val.value}
                        name={val[0]}
                      />
                      <label htmlFor={val.id}>{val.filterName}</label>
                    </Fragment>
                  )
                );
              })}
            </div>
          </div>
        </div>
        <div className="card-body d-flex gap-4 media_section">
          {data.map((val) => (
            <Link key={val.id} to={`/${val.id}`} state={{mediaType:val.media_type || "tv"}}>
              <div className="card flex-shrink-0 media-card-body">
                <div className="card-body flex-grow-0">
                  <img
                    src={`${config}/${
                      window.innerWidth > 768 ? "w154" : "w92"
                    }/${val.poster_path}`}
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
    </section>
  );
}

export default DisplayMedia;
