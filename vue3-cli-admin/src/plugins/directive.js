/*
 * @Description:自定义指令
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-21 15:45:59
 */
import store from '@/store/index.js'

export default app => {
  app.directive('has', {
    mounted(el, binding, vnode) {
      let val = binding.value
      const status = store.state.pageBtnControl.has(val)
      if (!status) el.remove()
    }
  })
}
