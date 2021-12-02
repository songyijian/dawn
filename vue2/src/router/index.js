import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./config";

Vue.use(VueRouter);
const router = new VueRouter({
  // mode: "history",
  mode: "hash",
  scrollBehavior: (to, from, savedPosition) => savedPosition || { x: 0, y: 0 },
  routes,
});

router.beforeEach(async (to, from, next) => {
  to.meta.title && (window.document.title = to.meta.title || "");
  next();
});

export default router;
