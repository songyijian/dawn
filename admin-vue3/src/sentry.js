/*
 * @Description: 哨兵 用户权限控制
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-02 17:17:21
 */

import store from '@/store/index.js'
import { GET_tree } from '@/api/index.js'

GET_tree().then(res => {
  store.commit('SET_USER_INFO', res)
})
