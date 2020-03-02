import Vue from "vue";
import VueRouter from "vue-router";
import Register from "../views/Register.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "register",
    component: Register
  },
  {
    path: "/game/:gameId",
    name: "game",
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: "about" */ "../views/Game.vue"),
    props: true
  },
  {
    path: "/leaderboard",
    name: "leaderboard",
    component: () => import("../views/Leaderboard")
  },
  {
    path: "/home",
    name: "home",
    component: () => import("../views/Home")
  },
  {
    path: "/login",
    name: "login",
    component: () => import("../views/Login")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
