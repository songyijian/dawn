import './plugins/axios'
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import installElementPlus from './plugins/element'
import { installAxios } from './plugins/axios'


const app = createApp(App)
installElementPlus(app)
installAxios(app)
app.use(store).use(router).mount('#app')