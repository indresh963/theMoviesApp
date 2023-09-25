import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import { Fetch, util } from ".";

const gender = ["Not Specified", "Female", "Male", "Non-Binary"];
function Person() {
  const { personId } = useLocation().state;
  const [personData, setPersonData] = useState([]);
  const [readMore, setReadMore] = useState(false);
  const [credits, setCredits] = useState([]);
  const [images, setImages] = useState([]);
  const [mediaList, setMediaList] = useState([]);
  const [mediaType, setMediaType] = useState("movie");
  const { config, Badge } = util();

  useEffect(() => {
    Fetch(`person/${personId}`, 1, "GET", "language=en-US").then((response) => {
      setPersonData(response);
    });

    Fetch(
      `person/${personId}/combined_credits`,
      1,
      "GET",
      "language=en-US"
    ).then((response) => {
      setCredits(response.cast.slice(0, 20));
    });

    Fetch(`person/${personId}/images`, 1, "GET", "language=en-US").then(
      (response) => {
        setImages(response.profiles);
      }
    );
  }, [personId]);

  useEffect(()=>{
    Fetch(
      `person/${personId}/${mediaType}_credits`,
      1,
      "GET",
      "language=en-US"
    ).then((response) => {
      console.log(response);
      setMediaList(response.cast);
    });
  },[mediaType])

  return (
    <section>
      <div className="container-fluid py-5">
        <div className="row gap-4 justify-content-center">
          <div className="col-lg-3 col-11">
            <div className="row gap-4 justify-content-center">
              <div className="col-lg-12 col-md-5 col-8 text-center">
                <img
                  id="person"
                  src={
                    personData.profile_path
                      ? `${config}/original/${personData.profile_path}`
                      : require("../assets/placeholder.jpg")
                  }
                  className="img-fluid"
                  alt="person_profile"
                />
              </div>
              <div className="col-lg-12 col-md-6 col-10 py-md-3 py-lg-0 py-0">
                <div className="row gap-3 justify-content-end justify-content-md-start">
                  <div className="col-12">
                    <h1 className="mb-0 text-center text-md-start">
                      {personData.name}
                    </h1>
                  </div>
                  <div className="col-12">
                    <h2 className="mb-0 text-center text-md-start">
                      Personal Information
                    </h2>
                  </div>
                  <div className="col-lg-12 col-6 d-flex flex-column gap-3">
                    <div>
                      <h3 className="person_sub_heading">Known for</h3>
                      <h4 className="person_para">
                        {personData.known_for_department}
                      </h4>
                    </div>
                    <div>
                      <h3 className="person_sub_heading">Gender</h3>
                      <h4 className="person_para">
                        {gender[personData.gender]}
                      </h4>
                    </div>
                    <div>
                      <h3 className="person_sub_heading">Place of Birth</h3>
                      <h4 className="person_para">
                        {personData.place_of_birth}
                      </h4>
                    </div>
                  </div>
                  <div className="col-lg-12 col-5 d-flex flex-column gap-3">
                    <div>
                      <h3 className="person_sub_heading">Birthday</h3>
                      {personData.birthday && (
                        <h4 className="person_para">
                          {personData.birthday} &#40;
                          {parseInt(
                            (new Date() - new Date(personData.birthday)) /
                              (365 * 24 * 60 * 60 * 1000)
                          )}{" "}
                          years old &#41;
                        </h4>
                      )}
                    </div>
                    {personData.deathday && (
                      <div>
                        <h3 className="person_sub_heading">Deathday</h3>
                        <h4 className="person_para">{personData.deathday}</h4>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-lg-8 col-11 d-flex flex-column gap-5">
            <article>
              <h2>Biography</h2>
              <p id="bio">
                {readMore
                  ? personData.biography
                  : personData.biography?.substring(0, 700)}
                {!personData.biography &&
                  `We don't have a biography for ${personData.name}`}
              </p>
              {personData.biography?.length > 700 && (
                <button
                  type="button"
                  className="view_btn"
                  onClick={() => setReadMore((val) => !val)}
                >
                  ...{readMore ? "Read less" : "Read more"}
                </button>
              )}
            </article>
            <div>
              <Badge>Known For</Badge>
              <div className="mt-4 d-flex gap-4 media_section">
                {credits.map((val) => (
                  <Link
                    key={val.id}
                    to={`/${val.id}`}
                    state={{ mediaType: val.media_type || "tv" }}
                  >
                    <div className="card flex-shrink-0 media-card-body">
                      <div className="card-body flex-grow-0">
                        <img
                          src={
                            val.poster_path
                              ? `${config}/w154/${val.poster_path}`
                              : require("../assets/placeholder2.jpg")
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
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <Badge>Images</Badge>
              <div className="mt-4 d-flex gap-4 media_section pb-2">
                {images[0] ? (
                  images.map((val, ind) => (
                    <div
                      key={ind}
                      className="card flex-shrink-0 media-card-body"
                    >
                      <div className="card-body flex-grow-0">
                        <img
                          src={
                            val.file_path
                              ? `${config}/original/${val.file_path}`
                              : require("../assets/placeholder2.jpg")
                          }
                          alt="slide_for_trending"
                          className="media-img shadow-sm"
                          style={{ width: "250px" }}
                        />
                      </div>
                    </div>
                  ))
                ) : (
                  <p>{`We don't have images for ${personData.name}`}</p>
                )}
              </div>
            </div>
            <div>
              <div className="d-flex justify-content-between align-items-center">
                <Badge>Movies & Tv</Badge>
                <div className="btn-container">
                  <input
                    type="radio"
                    onChange={(e) => {
                      setMediaType(e.target.value);
                    }}
                    checked={mediaType === "movie"}
                    id="movie"
                    value="movie"
                    name="mediaType"
                  />
                  <label htmlFor="movie">Movies</label>
                  <input
                    type="radio"
                    onChange={(e) => {
                      setMediaType(e.target.value);
                    }}
                    checked={mediaType === "tv"}
                    id="tv"
                    value="tv"
                    name="mediaType"
                  />
                  <label htmlFor="tv">Tv</label>
                </div>
              </div>
              <ul className="list-group mt-4">
                {mediaList.map((val) => (
                  <li key={val.id} className="list-group-item">
                    <Link
                      to={`/${val.id}`}
                      state={{ mediaType: mediaType }}
                    >
                      <div className="d-flex gap-3">
                      <img
                          src={
                            val.poster_path
                              ? `${config}/w154/${val.poster_path}`
                              : require("../assets/placeholder2.jpg")
                          }
                          alt="slide_for_trending"
                          id="person_media"
                        />
                        <div>
                          <h3>{val.original_title ?? val.title ?? val.name ?? val.original_name}</h3>
                          <h4><b>character:</b>{val.character}</h4>
                          <h4 className="person_media_release_date">{val.release_date ?? val.first_air_date}</h4>
                          <div><i className="fa-solid fa-star me-1 shadow" style={{color:"yellow"}}></i><span className="rating">{val.vote_average}</span></div>
                        </div>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Person;
