/*
 * @Description: routes 配置
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 11:36:58
 */
const home = () => import('@/pages/home.vue')
// const login = () => import('@/pages/login/index.vue')
const page404 = () => import('@/pages/404.vue')
const layout = () => import('@/pages/layout/index.vue')

const routes = [
  {
    path: '/',
    component: layout,
    meta: { title: '' },
    children: [
      {
        path: '/home',
        name: 'home',
        meta: { title: 'home' },
        component: home
      }
    ]
  },
  // {
  //   path: '/login',
  //   name: 'login',
  //   component: login
  // },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: page404
  }
]
export default routes
