/*
 * @Description: 用户Status控制
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 17:17:21
 */

import store from '@/store/index.js'
import { GET_meInfo } from '@/api/'
import { asyncRouterMap } from '@/router/routes'
import router from '@/router'
import { getURLParams } from '@/utils/tools.js'

function hasRouterMap(p = []) {
  const map = new Map()
  p.forEach(({ name, id, path, btns }) => map.set(name, { id, path, btns }))
  return map
}

function routerFilter(r, rmap) {
  return r.filter(item => {
    const { name, children } = item
    children && (item.children = routerFilter(children, rmap))
    if (rmap.has(name)) {
      const btns = rmap.get(name).btns?.map(({ name }) => name)
      item.meta.btns = new Set(btns)
      return true
    }
    return false
  })
}

// GET_meInfo().then(({ code, data, message }) => {
//   if (!code) {
//     const { permissions, roles, user, perms } = data

//     // var rolesRouter = asyncRouterMap
//     // asyncRouterMap.forEach(router.addRoute)

//     const rmap = hasRouterMap(perms)
//     const rolesRouter = routerFilter(asyncRouterMap, rmap)
//     rolesRouter.forEach(router.addRoute)
//     store.commit('SET_ROUTERS', rolesRouter)
//     store.commit('SET_USER_INFO', user)
//     store.commit('SET_USER_PERMISSIONS', permissions)
//     store.commit('SET_USER_ROLES', roles)

//     const nowPath = location.hash.slice(1)
//     const nowSrc = nowPath.split('?')[0]
//     const query = getURLParams(nowPath)
//     const isexist = router.getRoutes().some(item => item.path === nowSrc)

//     const _toPath = { path: !isexist ? rolesRouter[0].path : nowPath }
//     query && (_toPath.query = query)
//     router.replace(_toPath)
//   } else {
//     router.replace({ path: '/404' })
//   }
// })
