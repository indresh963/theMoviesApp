import { Link } from "react-router-dom";
import { util } from "./";
function Trailer({
  data,
  heading,
}) {
  const { config, Badge } = util();
  console.log(data);
  return (
    <section className="my-4">
      <div className="card media">
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <Badge>{heading}</Badge>
          </div>
        </div>
        <div className="card-body d-flex gap-4 media_section">
          {data.map((val) => (
            <Link key={val.id} to={`${val.id}`}>
              <div className="card flex-shrink-0 media-card-body">
                <div className="card-body flex-grow-0">
                  <img
                    src={`${config}/w300/${val.backdrop_path}`}
                    alt="slide_for_trending"
                    className="media-img shadow-sm"
                  />
                </div>
                <div className="card-footer mt-2 text-center">
                  <h3>{val?.title ?? val?.name}</h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}


export default Trailer