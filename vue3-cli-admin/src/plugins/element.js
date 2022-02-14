// import { ElButton } from 'element-plus'
// import { ElMessage } from 'element-plus'
// import lang from 'element-plus/lib/locale/lang/zh-cn'
// import locale from 'element-plus/lib/locale'

import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/elui/index.css'

export default (app) => {
  // locale.use(lang)
  app.use(ElementPlus, { size: 'small' })
}
