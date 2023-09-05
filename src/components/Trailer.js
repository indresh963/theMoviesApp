import { util, Fetch } from "./";
import { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";
function Trailer({ data, heading }) {
  const { config, Badge } = util();
  const [bgImg, setBgImg] = useState(null);
  const [videoKey, setVideoKey] = useState(null);
  const [id, setid] = useState(null);

  useEffect(() => {
    data[0] && setBgImg(`${config}/original/${data[0].backdrop_path}`);
  }, [data]);

  useEffect(() => {
    id && Fetch(
      `movie/${id}`,
      1,
      "GET",
      "include_adult=false&include_video=false&language=en-US&page=1&append_to_response=videos"
    ).then(({ videos: { results } }) => {
      setVideoKey(results[0]);
    });
  }, [id]);
  return (
    <section className="my-4">
      <div
        className="card media"
        style={{
          backgroundImage: `url(${bgImg})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          transition: "background-image 700ms ease-in",
        }}
      >
        <div className="card-header">
          <div className="d-flex align-items-center justify-content-between">
            <Badge>{heading}</Badge>
          </div>
        </div>
        <div className="card-body d-flex gap-4 media_section">
          {data.map((val) => (
            <div
              key={val.id}
              className="card flex-shrink-0 media-card-body"
              style={{ background: "transparent", cursor: "pointer" }}
              onClick={() => {
                setid(val.id);
              }}
            >
              <div
                className="card-body flex-grow-0"
                id="trailerImgContainer"
                onMouseOver={() =>
                  setBgImg(`${config}/original/${val.backdrop_path}`)
                }
              >
                <img
                  src={`${config}/w300/${val.backdrop_path}`}
                  alt="slide_for_trending"
                  className="media-img shadow-sm"
                  id="trailerImg"
                />
                <button type="button" id="playButton">
                  <i className="fa-solid fa-play"></i>
                </button>
              </div>
              <div className="card-footer mt-2 text-center">
                <h3 id="trailer">{val?.title ?? val?.name}</h3>
              </div>
            </div>
          ))}
        </div>
      </div>
      {videoKey && (
        <>
          <div id="player">
            <button
              type="button"
              className="btn-close btn-close-white ms-2"
              onClick={() => setVideoKey(null)}
            ></button>
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${videoKey.key}`}
              width="100%"
              height="100%"
              controls={true}
            />
          </div>
        </>
      )}
    </section>
  );
}

export default Trailer;
