/*
 * @Description: routes 配置
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 11:36:58
 */
const page404 = () => import('@/pages/404.vue')
const layout = () => import('@/pages/layout/index.vue')

export const asyncRouterMap = [
  {
    path: '/business',
    name: 'business',
    meta: { title: '商家管理' },
    component: layout,
    children: [
      {
        path: 'list',
        name: 'business list',
        meta: { title: 'business list' },
        component: () => import('@/pages/business/list.vue')
      },
      {
        path: 'frozen',
        name: 'business frozen',
        meta: { title: 'business frozen' },
        component: () => import('@/pages/business/frozen.vue')
      },
      {
        path: 'settled',
        name: 'business settled',
        meta: { title: 'business settled' },
        component: () => import('@/pages/business/settled.vue')
      }
    ]
  },
  {
    path: '/KYC',
    name: 'KYC',
    meta: { title: 'KYC管理' },
    component: layout,
    children: [
      {
        path: 'list',
        name: 'KYC list',
        meta: { title: 'KYC list' },
        component: () => import('@/pages/kYC/list.vue')
      }
    ]
  },
  {
    path: '/power',
    name: 'power',
    meta: { title: '权限管理' },
    component: layout,
    children: [
      {
        path: 'userlist',
        name: 'userlist',
        meta: { title: 'userlist' },
        component: () => import('@/pages/power/userList.vue')
      }
    ]
  }
]

const routes = [
  {
    path: '',
    redirect: '/business/list'
  },
  ...asyncRouterMap,
  {
    path: '/:catchAll(.*)',
    name: '404',
    component: page404
  }
]

export default routes
