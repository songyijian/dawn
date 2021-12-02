import store from "@/store";
import { Logger } from "./tools";
// import router from "@/router";

const loginRedirect = (_) => console.log("去登陆");
const lodingCount = new Logger((n) => {
  store.commit("setAjaxLoading", !!n);
});

////// Response
const request = (config) => {
  // const { url: URL } = config;
  lodingCount.up();
  return config;
};

const requestError = (error) => Promise.reject(error);

////// Response
const response = (response) => {
  // const { url: URL } = response.config;
  lodingCount.down();
  const resData = response ? response.data : null;
  const islogin = " 判断登陆状态 ";
  if (islogin) loginRedirect();
  return response;
};

const responseError = (error) => {
  console.error(error);
  lodingCount.down();
  // Toast("server error"); 提示失败
  return Promise.reject(error.response || error);
};

export { request, requestError, response, responseError };
