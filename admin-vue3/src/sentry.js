/*
 * @Description: 用户状态控制
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 17:17:21
 */

import store from '@/store/index.js'
import { GET_meInfo } from '@/api/'
import { asyncRouterMap } from '@/router/routes'
import router from '@/router'
import { getURLParams } from '@/utils/tools.js'

GET_meInfo().then(({ code, data, message }) => {
  if (!code) {
    asyncRouterMap.forEach(router.addRoute)
    const { permissions, roles, user } = data
    store.commit('SET_USER_INFO', user)
    store.commit('SET_USER_PERMISSIONS', permissions)
    store.commit('SET_USER_ROLES', roles)

    const nowPath = location.hash.slice(1)
    const isexist = router.getRoutes().some(item => item.path === nowPath.split('?')[0])
    const query = getURLParams(nowPath)
    const _toPath = { path: !isexist ? asyncRouterMap[0].path : nowPath }
    query && (_toPath.query = query)
    router.replace(_toPath)
  } else {
    router.replace({ path: '/404' })
  }
})

store.commit('SET_USER_INFO', [])
