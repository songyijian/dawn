/*
 * @Description: 哨兵 用户权限控制
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 17:17:21
 */

import store from '@/store/index.js'
import { GET_meInfo } from '@/api/index.js'

import { asyncRouterMap } from '@/router/routes'
import router from '@/router'

asyncRouterMap.forEach(router.addRoute)

GET_meInfo().then(({ code, data, message }) => {
  if (!code) {
    const { permissions, roles, user } = data
    store.commit('SET_USER_INFO', user)
    store.commit('SET_USER_PERMISSIONS', permissions)
    store.commit('SET_USER_ROLES', roles)
    router.replace({ path: asyncRouterMap[0].path })
  } else {
    router.replace({ path: '/403' })
  }
})

store.commit('SET_USER_INFO', [])
