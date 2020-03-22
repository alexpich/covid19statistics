import Home from "./components/Home.vue";
import Faq from "./components/Faq.vue";
import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

export const router = new VueRouter({
  routes: [
    { path: "", component: Home },
    { path: "/", component: Home },
    { path: "/faq", component: Faq }
  ]
});
