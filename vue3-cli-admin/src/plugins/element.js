import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import '@/assets/styles/elui/index.css'

export default app => {
  app.use(ElementPlus, { size: 'small' })
}
