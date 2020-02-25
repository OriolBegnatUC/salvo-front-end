import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "home",
    component: Home
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
    path: "/login",
    name: "login",
    component: () => import("../views/Login")
  },
  {
    path: "/register",
    name: "register",
    component: () => import("../views/Register")
  }
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes
});

export default router;
