/*
 * @Description:
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-01-07 16:32:57
 */
/*
 * @Description: test router config 和生产无关
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2022-01-07 15:57:28
 */

const routes = [
  {
    path: '/_test_',
    name: '_test_',
    meta: { title: '_test_', menu: false },
    component: () => import('@/views/__test__/index.vue')
  }
]

export default routes
