import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";
import { expect } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import Data from "@/views/Data.vue";
import { user, sideBar, data, notifications } from "../../mocks";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("Data view", () => {
  it("it renders data", () => {
    let store = new Vuex.Store({
      state: {
        user: user.loggedIn,
        data: data.withItems,
        notifications: notifications.withInitialState
      },
      actions: {
        login: () => {},
        getData: () => {}
      }
    });
    const wrapper = mount(Data, {
      localVue,
      store
    });
    const { title, text } = data.withItems.items[0];
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.find("table").exists()).to.be.true;
    expect(wrapper.html()).contain(title);
    expect(wrapper.html()).contain(text);
  });
  it("it renders alert", () => {
    let store = new Vuex.Store({
      state: {
        user: user.loggedIn,
        data: data.withInitialState,
        notifications: notifications.withAlert
      },
      actions: {
        login: () => {},
        getData: () => {}
      }
    });
    const wrapper = mount(Data, {
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
        data: data.withItems,
        notifications: notifications.withInitialState
      },
      actions: {
        login: () => {},
        getData: () => {}
      }
    });
    const wrapper = mount(Data, {
      localVue,
      store
    });
    let { title, variant } = sideBar[0];
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.html()).contain(title);
    expect(wrapper.html()).contain(variant);
  });
});
