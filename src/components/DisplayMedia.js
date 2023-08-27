import { Link } from "react-router-dom";
import { util } from "./";

function DisplayMedia({
  data,
  heading,
  filterOptions,
  setFilter,
  currentFilter,
  posterSize
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
              <input
                type="radio"
                onChange={(e) => setParam(e, setFilter)}
                checked={currentFilter === filterOptions[1].value}
                id={filterOptions[1].id}
                value={filterOptions[1].value}
                name={filterOptions[0]}
              />
              <label htmlFor={filterOptions[1].id}>
                {filterOptions[1].filterName}
              </label>
              <input
                type="radio"
                onChange={(e) => setParam(e, setFilter)}
                checked={currentFilter === filterOptions[2].value}
                id={filterOptions[2].id}
                value={filterOptions[2].value}
                name={filterOptions[0]}
              />
              <label htmlFor={filterOptions[2].id}>
                {filterOptions[2].filterName}
              </label>
            </div>
          </div>
        </div>
        <div className="card-body d-flex gap-3 media_section">
          {data.map((val) => (
            <Link key={val.id} to={`${val.id}`}>
              <div className="card flex-shrink-0 media-card-body">
                <div className="card-body flex-grow-0">
                  <img
                    src={`${config}/${posterSize}/${val.poster_path}`}
                    alt="slide_for_trending"
                    className="media-img"
                  />
                  {val?.media_type && <span className="media-type">{val.media_type}</span>}
                </div>
                <div className="card-footer">
                  <h3>{val?.title ?? val?.name }</h3>
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
