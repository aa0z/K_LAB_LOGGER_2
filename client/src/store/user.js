import Vue from "vue";
import {
  RESPONSE_ERROR,
  WRONG_RESPONSE,
  WRONG_RESPONSE_DATA
} from "@/constants/alerts/en";
import { validResponse, validResponseData, isLoggedIn } from "@/validator";

const state = {
  isLoggedIn: false
};

const actions = {
  async login({ commit, dispatch }) {
    await Vue.axios
      .get("/login")
      .then(response => {
        if (!validResponse(response)) {
          dispatch("alert", { message: WRONG_RESPONSE });
          return false;
        }
        if (!validResponseData(response)) {
          dispatch("alert", { message: WRONG_RESPONSE_DATA });
          return false;
        }
        if (isLoggedIn(response)) {
          commit("loggedIn");
        }
      })
      .catch(() => {
        dispatch("alert", { message: RESPONSE_ERROR });
      });
  }
};

const mutations = {
  loggedIn(state) {
    state.isLoggedIn = true;
  }
};

export default {
  state,
  actions,
  mutations
};
