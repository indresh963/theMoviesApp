import axios from "axios";

const FetchFromAPI = async (query,page,method,params) => {
  const options = {
    method: method,
    url: `https://api.themoviedb.org/3/${query}?page=${page}&${params}`,
    headers: {
      accept: "application/json",
      Authorization:process.env.REACT_APP_ACCESS_TOKEN,
    },
  };
  const { data } = await axios.request(options);
  return data;
};

export default FetchFromAPI;
