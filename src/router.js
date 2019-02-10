import Vue from "vue";
import Router from "vue-router";
import Log from "./views/Log";
import About from "./views/About";
import Donate from "./views/Donate";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    { path: "/", name: "Log", component: Log, alias: "/log" },
    { path: "/about", name: "about", component: About },
    { path: "/donate", name: "donate", component: Donate }
  ]
});
