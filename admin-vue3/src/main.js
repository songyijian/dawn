import '@/assets/styles/reset.scss'
import '@/sentry.js'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import { installAxios } from '@/plugins/axios.js'
import installElementPlus from '@/plugins/element.js'


const app = createApp(App)
installAxios(app)
installElementPlus(app)
app.use(router)
app.use(store)
app.mount('#app')
