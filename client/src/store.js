import Vue from "vue";
import Vuex from "vuex";
import user from "@/store/user";
import data from "@/store/data";
import logs from "@/store/logs";
import notifications from "@/store/notifications";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    user,
    data,
    logs,
    notifications
  }
});
