import Home from "./components/Home.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [{ path: "/", component: Home }]
});
