import Vue from "vue";
import {
  RESPONSE_ERROR,
  WRONG_RESPONSE,
  WRONG_RESPONSE_DATA,
  NO_LOGS,
  INFO
} from "@/constants/alerts/en";
import {
  validResponse,
  validResponseData,
  isNotEmptyDataArray
} from "@/validator";

const state = {
  items: []
};

const actions = {
  getLogs({ commit, dispatch }) {
    Vue.axios
      .get("/logs")
      .then(response => {
        if (!validResponse(response)) {
          dispatch("alert", { message: WRONG_RESPONSE });
          return false;
        }
        if (!validResponseData(response)) {
          dispatch("alert", { message: WRONG_RESPONSE_DATA });
          return false;
        }
        if (isNotEmptyDataArray(response)) {
          commit("logs", response.data);
        } else {
          dispatch("alert", { message: NO_LOGS, variant: INFO });
        }
      })
      .catch(() => {
        dispatch("alert", { message: RESPONSE_ERROR });
      });
  }
};

const mutations = {
  logs(state, data) {
    state.items = data;
  }
};

export default {
  state,
  actions,
  mutations
};
