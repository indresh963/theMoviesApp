import axios from "axios";


const FetchFromAPI = async (query,page,method,params) => {
  const access_token = process.env.REACT_APP_ACCESS_TOKEN;
  console.log(access_token);
  const options = {
    method: method,
    url: `https://api.themoviedb.org/3/${query}?page=${page}&${params}`,
    headers: {
      accept: "application/json",
      Authorization: access_token,
    },
  };
  const { data } = await axios.request(options);
  return data;
};

export default FetchFromAPI;
