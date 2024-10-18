import axios from "axios";

const http = () => {
  let options = {
    baseURL: "https://tatafo-backend.onrender.com/api",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  };
  if (localStorage.getItem("token")) {
    options.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;
  }
  return axios.create(options);
};

export default http;
