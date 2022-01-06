import http from 'axios'
import { logger } from '@/utils/tools'
import store from '@/store/index.js'
import { ElMessage } from 'element-plus'

export const loginRedirect = () => {
  if (process.env.NODE_ENV !== 'development') {
    location.href = `https://sso-new.opayweb.com/login?redirectUrl=${encodeURI(
      location.href
    )}`
  }
}

const lodingCount = logger(n => store.commit('SET_AJAX_LODING', !!n))

const _axios = http.create({
  // baseURL: "",
  headers: {
    post: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
    'Content-Type': 'application/json;charset=UTF-8'
  },
  timeout: 60000
})

const request = config => {
  lodingCount.up()
  return config
}

const requestError = error => Promise.reject(error)

const response = ({ data: res }) => {
  lodingCount.down()
  res.code === 5 && loginRedirect()
  return res
}

const responseError = error => {
  lodingCount.down()
  ElMessage.error(error.toString())
  return Promise.reject(error.response || error)
}

const ajaxShowMessage = res => {
  const { code, data, message } = res
  code && ElMessage.error(code + ' : ' + message)
  return res
}

_axios.interceptors.request.use(request, requestError)
_axios.interceptors.response.use(response, responseError)
_axios.interceptors.response.use(ajaxShowMessage)

const axiosPlugins = {
  install: app => {
    app.config.globalProperties.$axios = _axios
  }
}

export const installAxios = app => {
  app.use(axiosPlugins)
  return app
}

export default _axios
