/*
 * @Description: router 入口
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 11:29:21
 */
import { createRouter, createWebHashHistory } from 'vue-router'
import routes from './routes'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// /**
//  * 路由守卫
//  */
// router.beforeEach((to, from, next) => {
//   // beforeEach.checkAuth(to, router)
//   console.log('router.guard', to)

//   next()
// })

// /**
//  * 路由错误回调
//  */
// router.onError(handler => {
//   console.log('router.onError', handler)
//   // console.log('error:', handler)
// })

export default router
