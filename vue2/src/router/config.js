/*
 * @Description:routes
 * @Author: yijian
 * @Version: 0.1.0
 * @Date: 2021-12-01 16:44:56
 */
const home = () => import("@/views/home.vue");
const login = () => import("@/views/login.vue");
const page404 = () => import("@/views/page404.vue");
const Layout = () => import("@/views/Layout.vue");

const routes = [
  {
    path: "/",
    component: Layout,
    meta: { title: "" },
    // hidden: true,
    children: [
      {
        path: "/home",
        name: "home",
        meta: { title: "home" },
        component: home,
      },
    ],
  },
  {
    path: "/login",
    name: "login",
    component: login,
  },
  {
    path: "*",
    name: "404",
    component: page404,
  },
];
export default routes;
