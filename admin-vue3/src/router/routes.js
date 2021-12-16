/*
 * @Description: routes 配置
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 11:36:58
 */
// const page403 = () => import('@/views/error/403.vue')
const page404 = () => import('@/views/error/404.vue')
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
        path: 'create',
        name: 'createMerchantAccounts',
        meta: { title: 'Create merchant accounts', menu: false },
        component: () => import('@/views/merchants/create.vue')
      },
      {
        path: 'audit',
        name: 'auditMerchantAccounts',
        meta: { title: 'audit merchant accounts', menu: false },
        component: () => import('@/views/merchants/audit.vue')
      }
    ]
  },
  {
    path: '/KYC',
    name: 'KYC',
    meta: { title: 'KYC management', menu: true },
    component: layout,
    children: [
      { path: '', redirect: '/KYC/list', meta: { title: 'KYC list', menu: false } },
      {
        path: 'list',
        name: 'KYClist',
        meta: { title: 'KYC list', menu: true },
        component: () => import('@/views/KYC/list.vue')
      },
      {
        path: 'details',
        name: 'KYCdetails',
        meta: { title: 'KYC details', menu: false },
        component: () => import('@/views/KYC/details.vue')
      }
    ]
  },
  {
    path: '/role',
    name: 'role',
    meta: { title: 'Authority management', menu: true },
    component: layout,
    children: [
      { path: '', redirect: '/role/list', meta: { title: 'list', menu: false } },
      {
        path: 'list',
        name: 'roleUserlist',
        meta: { title: 'list', menu: true },
        component: () => import('@/views/role/userList.vue')
      }
    ]
  }
]

export const defaultRouter = [
  // {
  //   path: '/403',
  //   name: '403',
  //   meta: { title: '403', menu: false },
  //   hidden: true,
  //   component: page403
  // },
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
