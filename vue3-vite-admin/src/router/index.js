/*
 * @Description: router 入口
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 11:29:21
 */
import { createRouter, createWebHashHistory, useRoute } from 'vue-router'
import routes from './routes'
import store from '@/store/index.js'

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  const { name, meta } = to
  if (name !== 404) {
    meta?.btns && store.commit('SET_BTN_CONTROL', meta.btns)
  }
  next()
})

// router.onError(handler => {})

export default router
