import Vue from "vue";
import {
  RESPONSE_ERROR,
  WRONG_REQUEST_DATA,
  WRONG_RESPONSE,
  WRONG_RESPONSE_DATA,
  DATA_HAS_BEEN_ADDED,
  NO_DATA,
  SUCCESS,
  INFO
} from "@/constants/alerts/en";
import {
  validResponse,
  validResponseData,
  isNotEmptyDataArray,
  isDataAdded
} from "@/validator";

const state = {
  items: [],
  title: "",
  text: ""
};

const actions = {
  updateTitle({ commit }, title) {
    commit("updateTitle", title);
  },
  updateText({ commit }, text) {
    commit("updateText", text);
  },
  getData({ commit, dispatch }) {
    Vue.axios
      .get("/")
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
          commit("items", response.data);
        } else {
          dispatch("alert", { message: NO_DATA, variant: INFO });
        }
      })
      .catch(() => {
        dispatch("alert", { message: RESPONSE_ERROR });
      });
  },
  addData({ state, dispatch }) {
    let { title, text } = state;
    if (title === "" || text === "") {
      dispatch("alert", { message: WRONG_REQUEST_DATA });
      return;
    }
    Vue.axios
      .post("/addData", { title, text })
      .then(response => {
        if (!validResponse(response)) {
          dispatch("alert", { message: WRONG_RESPONSE });
          return false;
        }
        if (!validResponseData(response)) {
          dispatch("alert", { message: WRONG_RESPONSE_DATA });
          return false;
        }
        if (isDataAdded(response)) {
          dispatch("alert", {
            message: DATA_HAS_BEEN_ADDED,
            variant: SUCCESS
          });
          dispatch("resetForm");
        } else {
          dispatch("alert", { message: WRONG_REQUEST_DATA });
        }
      })
      .catch(() => {
        dispatch("alert", { message: RESPONSE_ERROR });
      });
  },
  resetForm({ commit }) {
    commit("updateTitle", "");
    commit("updateText", "");
  }
};

const mutations = {
  items(state, data) {
    state.items = data;
  },
  updateTitle(state, title) {
    state.title = title;
  },
  updateText(state, text) {
    state.text = text;
  }
};

export default {
  state,
  actions,
  mutations
};
