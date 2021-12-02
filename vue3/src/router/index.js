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

export default router
