import Vue from "vue";
import Router from "vue-router";
import AddData from "./views/AddData.vue";
import Data from "./views/Data.vue";
import Logs from "./views/Logs.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  base: process.env.BASE_URL,
  routes: [
    {
      path: "/addData",
      name: "addData",
      component: AddData
    },
    {
      path: "/data",
      name: "data",
      component: Data
    },
    {
      path: "/logs",
      name: "logs",
      component: Logs
    },
    {
      path: "*",
      redirect: "/addData"
    }
  ]
});
