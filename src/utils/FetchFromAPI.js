import axios from "axios";

const FetchFromAPI = async (query,page,method,params) => {
  const options = {
    method: method,
    url: `https://api.themoviedb.org/3/${query}?page=${page}&${params}`,
    headers: {
      accept: "application/json",
      Authorization: "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0ZTU0NmUyNzQ5NjYyYTEzNjI2ZTY1ODU1YmFjZGNmMSIsInN1YiI6IjY0ZDcxNTgzMDAxYmJkMDExZDkwMjNjYSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.R3N7hANJDN3POKUbqdu2ge3vhAhppMA5wM4dJ5AH2Kc"
    },
  };
  const { data } = await axios.request(options);
  return data;
};

export default FetchFromAPI;
