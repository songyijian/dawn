import { logger } from './tools'
import store from '@/store/index.js'

const loginRedirect = () => {} //(location.href = `https://sso-new.opayweb.com/login?redirectUrl=${encodeURI(location.href)}`)
const lodingCount = logger(n => store.commit('SET_AJAX_LODING', !!n))

const request = config => {
  lodingCount.up()
  return config
}

const requestError = error => Promise.reject(error)

const response = ({ data: res }) => {
  lodingCount.down()
  console.log(res)
  res.code === 5 && loginRedirect()
  return res
}

const responseError = error => {
  lodingCount.down()
  return Promise.reject(error.response || error)
}

export { request, requestError, response, responseError }
