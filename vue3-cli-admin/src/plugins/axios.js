import http from "axios";
import { logger } from "@/utils/tools";
import store from "@/store/index.js";
import { ElMessage } from "element-plus";

export const loginRedirect = () => {
  if (process.env.NODE_ENV !== "development") {
    location.href = `https://xxx/login?redirectUrl=${encodeURI(location.href)}`;
  }
};

<<<<<<< HEAD
const lodingCount = logger((n) => store.commit("SET_AJAX_LODING", !!n));
=======
const lodingCount = logger((n) => store.commit('SET_AJAX_LODING', !!n))
>>>>>>> 95276452e1b425196a95c21eb7303c69c17f27d9

const _axios = http.create({
  // baseURL: "",
  headers: {
    post: { "Content-Type": "application/x-www-form-urlencoded;charset=UTF-8" },
    "Content-Type": "application/json;charset=UTF-8",
  },
  timeout: 60000,
});

const request = (config) => {
<<<<<<< HEAD
  lodingCount.up();
  return config;
};

const requestError = (error) => Promise.reject(error);
=======
  lodingCount.up()
  return config
}

const requestError = (error) => Promise.reject(error)
>>>>>>> 95276452e1b425196a95c21eb7303c69c17f27d9

const response = ({ data: res }) => {
  lodingCount.down();
  res.code === 5 && loginRedirect();
  return res;
};

const responseError = (error) => {
<<<<<<< HEAD
  lodingCount.down();
  ElMessage.error(error.toString());
  return Promise.reject(error.response || error);
};

const ajaxShowMessage = (res) => {
  const { code, data, message } = res;
  code && ElMessage.error(code + " : " + message);
  return res;
};
=======
  lodingCount.down()
  ElMessage.error(error.toString())
  return Promise.reject(error.response || error)
}

const ajaxShowMessage = (res) => {
  const { code, message } = res
  code && ElMessage.error(code + ' : ' + message)
  return res
}
>>>>>>> 95276452e1b425196a95c21eb7303c69c17f27d9

_axios.interceptors.request.use(request, requestError);
_axios.interceptors.response.use(response, responseError);
_axios.interceptors.response.use(ajaxShowMessage);

const axiosPlugins = {
  install: (app) => {
<<<<<<< HEAD
    app.config.globalProperties.$axios = _axios;
  },
};

export const installAxios = (app) => {
  app.use(axiosPlugins);
  return app;
};
=======
    app.config.globalProperties.$axios = _axios
  }
}

export const installAxios = (app) => {
  app.use(axiosPlugins)
  return app
}
>>>>>>> 95276452e1b425196a95c21eb7303c69c17f27d9

export default _axios;
