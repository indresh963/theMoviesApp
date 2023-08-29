import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Fetch, util } from "./";
function MediaTable({param,title}) {
  const [listContent, setListContent] = useState([]);
  const { config } = util();
  useEffect(() => {
    Fetch(
      `discover/tv`,
      1,
      "GET",
      param
    ).then(({ results }) => {
      setListContent(results.slice(0, 5));
    });
  }, []);
  console.log(listContent);

  return (
    <ul className="popular-list d-flex flex-column justify-content-between">
          <li>{title}</li>
          {
            listContent.map( val => (
              <li key={val.id}>
                <Link to={`${val.id}`} className="d-flex gap-4">
                <img src={`${config}/w92/${val.poster_path}`} alt='list_img' />
                <div>
                  <h5>{val?.name ?? val?.original_name}</h5>
                  <ul className="stats-list" >
                    <li className="d-flex gap-3" >
                      <div><i className="fa-solid fa-star me-1"></i>{val.vote_average}</div>
                      <div><i className="fa-solid fa-square-poll-vertical me-2"></i>{val.vote_count}</div>
                    </li>
                    <li>{val.first_air_date}</li>
                  </ul>
                </div>
                </Link>
              </li>
            ))
          }
          <li>
            View more <i className="fa-solid fa-angle-right ms-2"></i>
          </li>
        </ul>
  );
}

export default MediaTable;
