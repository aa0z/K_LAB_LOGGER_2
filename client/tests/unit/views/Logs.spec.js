import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";
import { expect } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import Logs from "@/views/Logs.vue";
import { user, sideBar, logs, notifications } from "../../mocks";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("Logs view", () => {
  it("it renders logs", () => {
    let store = new Vuex.Store({
      state: {
        user: user.loggedIn,
        logs: logs.withItems,
        notifications: notifications.withInitialState
      },
      actions: {
        login: () => {},
        getLogs: () => {}
      }
    });
    const wrapper = mount(Logs, {
      localVue,
      store
    });
    const { eventType, date } = logs.withItems.items[0];
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.find("table").exists()).to.be.true;
    expect(wrapper.html()).contain(eventType);
    expect(wrapper.html()).contain(date);
  });
  it("it renders alert", () => {
    let store = new Vuex.Store({
      state: {
        user: user.loggedIn,
        logs: logs.withInitialState,
        notifications: notifications.withAlert
      },
      actions: {
        login: () => {},
        getLogs: () => {}
      }
    });
    const wrapper = mount(Logs, {
      localVue,
      store
    });
    const { message, variant } = notifications.withAlert.alert;
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.html()).contain(message);
    const alert = wrapper.find(".alert").html();
    expect(alert).to.have.string(variant);
  });
  it("it renders sidebar", () => {
    let store = new Vuex.Store({
      state: {
        user: user.loggedIn,
        logs: logs.withItems,
        notifications: notifications.withInitialState
      },
      actions: {
        login: () => {},
        getLogs: () => {}
      }
    });
    const wrapper = mount(Logs, {
      localVue,
      store
    });
    let { title, variant } = sideBar[0];
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.html()).contain(title);
    expect(wrapper.html()).contain(variant);
  });
});
