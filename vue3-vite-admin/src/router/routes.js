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
    path: '/KYC',
    name: 'KYC',
    meta: { title: 'KYC management', menu: true },
    component: layout,
    children: [
      {
        path: '',
        name: 'KYCindex',
        redirect: '/KYC/list',
        meta: { title: 'Merchant', menu: false }
      },
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

// 实验结果
import troutes from '@/views/__test__/router.js'
if (process.env.NODE_ENV === 'development') {
  troutes.forEach(element => {
    defaultRouter.push(element)
  })
}

export const allRouter = [...defaultRouter, ...asyncRouterMap]

export default defaultRouter
