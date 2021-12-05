import http from "axios";
import { request, requestError, response, responseError } from "./axios.config";

const _axios = http.create({
  // baseURL: "",
  headers: {
    post: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    "Content-Type": "application/json;charset=UTF-8",
  },
  timeout: 60000,
});

_axios.interceptors.request.use(request, requestError);
_axios.interceptors.response.use(response, responseError);

const axiosPlugins = {
  install: (app) => {
    app.config.globalProperties.$axios = _axios
  }
}

export const installAxios = (app) => {
  app.use(axiosPlugins)
  return app
}

export default _axios;
