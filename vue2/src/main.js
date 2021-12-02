import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import "@/assets/style/reset.scss";
import EventBus from "tools-event-bus";
import axios from "@/utils/axios";

import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
import "@/assets/style/elui/theme/index.css";

Vue.use(ElementUI);

// if (process.env.NODE_ENV == "development") {
//   import("../../mock/index.js").then(({ default: opayMock }) => {
//     opayMock.use({ name: "axios", wrap: axios });
//     opayMock.use({ name: "Vue", wrap: Vue });
//     opayMock.use({ name: "router", wrap: router });
//     opayMock.use({ name: "store", wrap: store });
//   });
//   Vue.config.devtools = true;
// }

Vue.prototype.$bus = new EventBus("VueEventBus");
Vue.prototype.$axios = axios;

window.app = new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount("#app");
