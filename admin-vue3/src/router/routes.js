/*
 * @Description: routes 配置
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 11:36:58
 */
const page404 = () => import('@/views/error/404.vue')
const page403 = () => import('@/views/error/403.vue')
const layout = () => import('@/views/layout/index.vue')

export const asyncRouterMap = [
  {
    path: '/merchants',
    name: 'merchants',
    meta: { title: 'merchants', menu: true },
    component: layout,
    children: [
      { path: '', redirect: '/merchants/list', meta: { title: 'merchants', menu: false } },
      {
        path: 'list',
        name: 'merchantsList',
        meta: { title: 'Merchants list', menu: true },
        component: () => import('@/views/merchants/list.vue')
      },
      {
        path: 'frozen',
        name: 'merchantsFrozen',
        meta: { title: 'Frozen merchant accounts', menu: true },
        component: () => import('@/views/merchants/frozen.vue')
      },
      {
        path: 'settled',
        name: 'merchantsSettled',
        meta: { title: 'merchants settled', menu: true },
        component: () => import('@/views/merchants/settled.vue')
      },
      {
        path: 'add',
        name: 'merchantsAdd',
        meta: { title: 'Add merchant accounts', menu: false },
        component: () => import('@/views/merchants/add.vue')
      }
    ]
  },
  {
    path: '/KYC',
    name: 'KYC',
    meta: { title: 'KYC管理', menu: true },
    component: layout,
    children: [
      { path: '', redirect: '/KYC/list', meta: { title: 'KYC list', menu: false } },
      {
        path: 'list',
        name: 'KYClist',
        meta: { title: 'KYC list', menu: true },
        component: () => import('@/views/kYC/list.vue')
      }
    ]
  },
  {
    path: '/role',
    name: 'role',
    meta: { title: '权限管理', menu: true },
    component: layout,
    children: [
      { path: '', redirect: '/role/userlist', meta: { title: 'userlist', menu: false } },
      {
        path: 'userlist',
        name: 'roleUserlist',
        meta: { title: 'userlist', menu: true },
        component: () => import('@/views/role/userList.vue')
      }
    ]
  }
]

export const defaultRouter = [
  { path: '', redirect: '/403', meta: { title: '403', menu: false } },
  {
    path: '/403',
    name: '403',
    meta: { title: '403', menu: false },
    hidden: true,
    component: page403
  },
  {
    path: '/:catchAll(.*)',
    name: '404',
    meta: { title: '404', menu: false },
    hidden: true,
    component: page404
  }
]

export const allRouter = [...defaultRouter, ...asyncRouterMap]

export default defaultRouter
