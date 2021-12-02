import http from "axios";
import { request, requestError, response, responseError } from "./axios.config";

const axios = http.create({
  // baseURL: "",
  headers: {
    post: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    "Content-Type": "application/json;charset=UTF-8",
  },
  timeout: 60000,
});

axios.interceptors.request.use(request, requestError);
axios.interceptors.response.use(response, responseError);

export default axios;
