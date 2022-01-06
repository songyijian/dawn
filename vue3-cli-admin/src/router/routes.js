/*
 * @Description: routes 配置
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 11:36:58
 */
const page404 = () => import('@/views/error/404.vue')
const layout = () => import('@/views/layout/index.vue')

export const asyncRouterMap = [
  {
    path: '/role',
    name: 'role',
    meta: { title: 'Authority management', menu: true },
    component: layout,
    children: [
      {
        path: 'list',
        name: 'roleUserlist',
        meta: { title: 'User list', menu: true },
        component: () => import('@/views/role/userList.vue')
      }
    ]
  }
]

export const defaultRouter = [
  {
    path: '/:catchAll(.*)',
    name: '404',
    meta: { title: '404', menu: false },
    component: page404
  }
]

if (process.env.NODE_ENV === 'development') {
  const test = () => import('@/views/_test_.vue')
  defaultRouter.push({
    path: '/_test_',
    name: 'test',
    meta: { title: 'test', menu: false },
    component: test
  })
}

export const allRouter = [...defaultRouter, ...asyncRouterMap]

export default defaultRouter
