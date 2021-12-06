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
    path: '/business',
    name: 'business',
    meta: { title: 'business', menu: true },
    component: layout,
    children: [
      { path: '', redirect: '/business/list', meta: { title: 'business', menu: false } },
      // {
      //   path: 'test',
      //   name: 'businessTest',
      //   meta: { title: 'business test', menu: true },
      //   component: () => import('@/views/business/mylist.vue'),
      //   children: [
      //     {
      //       path: 'test_list',
      //       name: 'businessList',
      //       meta: { title: 'business list', menu: true },
      //       component: () => import('@/views/business/mylist.vue')
      //     }
      //   ]
      // },
      {
        path: 'list',
        name: 'businessList',
        meta: { title: 'business list', menu: true },
        component: () => import('@/views/business/mylist.vue')
      },
      {
        path: 'frozen',
        name: 'businessFrozen',
        meta: { title: 'Frozen merchant accounts', menu: true },
        component: () => import('@/views/business/frozen.vue')
      },
      {
        path: 'settled',
        name: 'businessSettled',
        meta: { title: 'business settled', menu: true },
        component: () => import('@/views/business/settled.vue')
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
