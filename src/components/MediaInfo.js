import { useState, useEffect, useRef } from "react";
import { useParams, Link } from "react-router-dom";
import ReactPlayer from "react-player";
import { Fetch, util } from ".";
function MediaInfo() {
  const { mediaId } = useParams();
  const [mediaData, setMediaData] = useState({});
  const [mediaVideos, setMediaVideos] = useState([]);
  const [mediaImages, setMediaImages] = useState([]);
  const [socialsParam, setSocialsParam] = useState("videos");
  const [mediaReviews, setMediaReviews] = useState([]);
  const [videoKey, setVideoKey] = useState(null);
  const [mediaRecommendaitons, setMediaRecommendaitons] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const { config, Badge } = util();

  useEffect(() => {
    Fetch(
      `movie/${mediaId}`,
      1,
      "GET",
      "include_video=false&language=en-US&append_to_response=credits"
    ).then((response) => {
      setMediaData(response);
    });

    Fetch(`movie/${mediaId}/reviews`, 1, "GET", "language=en-US").then(
      ({ results }) => {
        setMediaReviews(results);
      }
    );

    Fetch(`movie/${mediaId}/recommendations`, 1, "GET", "language=en-US").then(
      ({ results }) => {
        console.log(results);
        setMediaRecommendaitons(results);
      }
    );

    Fetch(`movie/${mediaId}/videos`, 1, "GET", "language=en-US&page=1").then(
      ({ results }) => {
        setMediaVideos(results);
      }
    );

    Fetch(`movie/${mediaId}/images`, 1, "GET", null).then((response) => {
      setMediaImages([...response.backdrops, ...response.posters]);
    });
  }, [mediaId]);

  return (
    <section>
      <div
        id="mediaInfo position-relative"
        style={{
          backgroundImage: `url(${config}/original/${mediaData.backdrop_path})`,
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          backgroundColor: "steelblue",
          backgroundBlendMode: "multiply",
        }}
        className="py-4"
      >
        <div className="container-fluid">
          <div className="row gap-4 justify-content-center align-items-center">
            <div className="col-md-3 d-md-block d-none">
              <div className="media_img_container">
                <img
                  src={`${config}/w342/${mediaData.poster_path}`}
                  alt={mediaData.id}
                  className="img-fluid"
                />
              </div>
            </div>
            <div className="col-md-8 col-11 mt-md-2">
              <div className="d-flex gap-2">
                <h1 className="media_name">
                  {mediaData.title ?? mediaData.original_title}
                </h1>
                <h1 className="media_year">
                  &#40;{mediaData.release_date?.split("-")[0]}&#41;{" "}
                </h1>
              </div>
              <ul className="media_stats">
                <li className="para">
                  {mediaData.release_date} &#40;
                  {mediaData.production_countries?.[0]?.iso_3166_1}&#41;
                </li>
                <li className="para">
                  {mediaData.genres?.map((val) => val.name).join(",  ")}
                </li>
                <li className="para">
                  {parseInt(mediaData.runtime / 60)}h {mediaData.runtime % 60}m
                </li>
              </ul>
              <ul className="media_activity">
                <li>
                  <span id="media_score">
                    {mediaData.vote_average &&
                      parseInt(mediaData.vote_average * 10)}
                  </span>
                  <span id="percent">% user score</span>
                </li>
                <li>
                  <button type="button" className="utility_icons">
                    <i className="fa-solid fa-heart"></i>
                  </button>
                </li>
                <li>
                  <button type="button" className="utility_icons">
                    <i className="fa-solid fa-bookmark"></i>
                  </button>
                </li>
                <li>
                  <button type="button" className="utility_icons">
                    <i className="fa-solid fa-star"></i>
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className="play_media"
                    onClick={() => {
                      setVideoKey(mediaVideos.filter(val=>val.name.includes('Trailer'))[0].key);
                    }}
                  >
                    <i className="fa-solid fa-play me-1"></i> Play Trailer
                  </button>
                </li>
              </ul>
              <em className="tagline">{mediaData.tagline}</em>
              <h3 className="overview">Overview</h3>
              <p className="para">{mediaData.overview}</p>
            </div>
          </div>
        </div>
      </div>


      <div className="mx-4 my-5">
        <Badge>Cast</Badge>
        <div className="card-body d-flex gap-4 mt-4 pb-3 media_section">
          {mediaData.credits?.cast?.slice(0, 15)?.map((val) => (
            <Link key={val.id} to="/person" state={{ key: val.id }}>
              <div className="card flex-shrink-0 media-card-body">
                <div className="card-body flex-grow-0" id="person_img">
                  <img
                    src={
                      val.poster_path || val.profile_path
                        ? `${config}/w154/${
                            val.poster_path ?? val.profile_path
                          }`
                        : require(window.innerWidth > 768
                            ? "../assets/placeholder2.jpg"
                            : "../assets/placeholder4.jpg")
                    }
                    alt="slide_for_trending"
                    className="media-img shadow-sm img-fluid"
                  />
                </div>
                <div className="card-footer mt-2">
                  <h3 id="cast_name">{val?.title ?? val?.name}</h3>
                  <h4 id="character_name">{val.character}</h4>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>


      <div className="mx-4 mb-5">
        <div className="d-flex justify-content-between align-items-center">
          <Badge>Media</Badge>
          <div className="btn-container">
            <input
              type="radio"
              onChange={(e) => {
                setSocialsParam(e.target.value);
              }}
              checked={socialsParam === "videos"}
              id="Videos"
              value="videos"
              name="socials"
            />
            <label htmlFor="Videos">Videos</label>
            <input
              type="radio"
              onChange={(e) => {
                setSocialsParam(e.target.value);
              }}
              checked={socialsParam === "images"}
              id="Images"
              value="images"
              name="socials"
            />
            <label htmlFor="Images">Images</label>
          </div>
        </div>
        {socialsParam === "videos" ? (
          <div
            id="carousel1"
            className="carousel slide py-5 px-2 carousel-fade"
          >
            <div className="carousel-inner" id="carousel_inner_video">
              {mediaVideos.map((val, ind) => (
                <div
                  key={val.key}
                  className={
                    ind === 0 ? "carousel-item active" : "carousel-item"
                  }
                  id="carousel_video_item"
                >
                  <ReactPlayer
                    url={`https://www.youtube.com/watch?v=${val.key}`}
                    width="100%"
                    height="100%"
                    controls={true}
                    onPlay={() => setIsPlaying(true)}
                    onPause={() => setIsPlaying(false)}
                    onBuffer={() => setIsPlaying(true)}
                  />
                  {!isPlaying && (
                    <>
                      <button
                        type="button"
                        className="carousel-control-prev"
                        data-bs-slide="prev"
                        data-bs-target="#carousel1"
                      >
                        <span className="carousel-control-prev-icon"></span>
                      </button>
                      <button
                        type="button"
                        className="carousel-control-next"
                        data-bs-slide="next"
                        data-bs-target="#carousel1"
                      >
                        <span className="carousel-control-next-icon"></span>
                      </button>
                      <p className="para media_num">
                        {ind+1}/{mediaVideos.length}
                      </p>
                    </>
                  )}
                </div>
              ))}
            </div>
          </div>
        ) : (
          <div
            id="carousel2"
            className="carousel slide py-5 px-2 carousel-fade"
          >
            <div className="carousel-inner" id="carousel_inner_image">
              {mediaImages.map((val, ind) => (
                <div
                  key={ind}
                  className={
                    ind === 0 ? "carousel-item active" : "carousel-item"
                  }
                  id="carousel_image_item"
                >
                  <img
                    src={`${config}/original/${val.file_path}`}
                    className="media_img_fluid"
                    alt="media"
                  />
                  <button
                    type="button"
                    className="carousel-control-prev"
                    data-bs-slide="prev"
                    data-bs-target="#carousel2"
                  >
                    <span className="carousel-control-prev-icon"></span>
                  </button>
                  <button
                    type="button"
                    className="carousel-control-next"
                    data-bs-slide="next"
                    data-bs-target="#carousel2"
                  >
                    <span className="carousel-control-next-icon"></span>
                  </button>
                  <p className="para media_num">
                    {ind+1}/{mediaImages.length}
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="mx-4 mb-5">
        <Badge>Recommended</Badge>
        <div className="card-body d-flex gap-4 mt-4 pb-3 media_section">
          {mediaRecommendaitons.map((val) => (
            <Link key={val.id} to={`/${val.id}`}>
              <div className="card flex-shrink-0 media-card-body">
                <div className="card-body flex-grow-0" id="recommended_img">
                  <img
                    src={
                      val.backdrop_path
                        ? `${config}/w300/${ val.backdrop_path}`
                        : require(window.innerWidth > 768
                            ? "../assets/big_placeholder.png"
                            : "../assets/placeholder_landscape.jpg")
                    }
                    alt="slide_for_trending"
                    className="media-img shadow-sm img-fluid"
                  />
                </div>
                <div className="card-footer mt-2">
                  <h3 id="cast_name">{val?.title ?? val?.name}</h3>
                </div>
              </div>
            </Link>
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
              url={`https://www.youtube.com/watch?v=${videoKey}`}
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

export default MediaInfo;
