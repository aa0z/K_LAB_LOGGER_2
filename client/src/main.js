import Vue from "vue";
import BootstrapVue from "bootstrap-vue";
import axios from "axios";
import App from "@/App.vue";
import router from "@/router";
import store from "@/store";
import { PROTOCOL, SERVER, PORT } from "../.env";

Vue.config.productionTip = false;
Vue.use(BootstrapVue);
Vue.axios = Vue.prototype.$http = axios.create({
  baseURL: PROTOCOL + SERVER + PORT
});

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
