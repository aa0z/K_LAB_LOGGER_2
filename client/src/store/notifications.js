const state = {
  alert: {
    show: false,
    msg: "",
    variant: ""
  }
};

const actions = {
  alert({ commit }, { message = "Error", variant = "danger" }) {
    commit("alert", { message, variant });
    setTimeout(() => {
      commit("alertHide");
    }, 3000);
  }
};

const mutations = {
  alert(state, { message, variant }) {
    state.alert = { show: true, message, variant };
  },
  alertHide(state) {
    state.alert = { show: false, message: "", variant: "" };
  }
};

export default {
  state,
  actions,
  mutations
};
