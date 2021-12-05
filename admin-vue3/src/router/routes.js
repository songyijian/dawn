/*
 * @Description: routes 配置
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 11:36:58
 */
const page404 = () => import('@/views/error/404.vue')
const page403 = () => import('@/views/error/403.vue')
const layout = () => import('@/views/layout/index.vue')
const RouterBox = () => import('@/components/RouterBox.vue')

export const asyncRouterMap = [
  {
    path: '/',
    component: layout,
    // redirect: '/business/list',
    children: [
      { path: '', redirect: '/business/list' },
      {
        path: 'business',
        component: RouterBox, //() => import('@/views/business/index.vue'),
        children: [
          { path: '', redirect: '/business/list' },
          {
            path: 'list',
            name: 'list',
            meta: { title: 'business list' },
            component: () => import('@/views/business/list.vue')
          },
          {
            path: 'frozen',
            name: 'frozen',
            meta: { title: 'business frozen' },
            component: () => import('@/views/business/frozen.vue')
          },
          {
            path: 'settled',
            name: 'settled',
            meta: { title: 'business settled' },
            component: () => import('@/views/business/settled.vue')
          }
        ]
      },
      {
        path: 'KYC',
        name: 'KYC',
        meta: { title: 'KYC管理' },
        component: RouterBox,
        children: [
          { path: '', redirect: '/KYC/list' },
          {
            path: 'list',
            name: 'list',
            meta: { title: 'KYC list' },
            component: () => import('@/views/kYC/list.vue')
          }
        ]
      },
      // {
      //   path: '',
      //   name: 'role',
      //   meta: { title: '权限管理' },
      //   component: RouterBox,
      //   children: [
      //     { path: '', redirect: '/role/userlist' },
      //     {
      //       path: 'userlist',
      //       name: 'userlist',
      //       meta: { title: 'userlist' },
      //       component: () => import('@/views/role/userList.vue')
      //     }
      //   ]
      // }
    ]
  },
]

const routes = [
  ...asyncRouterMap,
  {
    path: '/403',
    name: '403',
    component: page403
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: page404
  }
]

export default routes
