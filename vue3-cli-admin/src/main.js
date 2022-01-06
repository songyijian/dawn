import '@/assets/styles/reset.scss'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { installAxios } from '@/plugins/axios.js'
import installElementPlus from '@/plugins/element.js'
import installDirective from '@/plugins/directive.js'

const app = createApp(App)
installAxios(app)
installElementPlus(app)
installDirective(app)
app.use(router)
app.use(store)
app.mount('#app')
