import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";
import { expect } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import AddData from "@/views/AddData.vue";
import { user, sideBar, data, notifications } from "../../mocks";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("AddData view", () => {
  it("it renders form", () => {
    let store = new Vuex.Store({
      state: {
        data: data.formInitialState,
        user: user.loggedIn,
        notifications: notifications.withInitialState
      },
      actions: {
        login: () => {},
        updateTitle: () => {},
        updateText: () => {}
      }
    });
    const wrapper = mount(AddData, {
      localVue,
      store
    });
    let title = wrapper.find("#title");
    title.setValue("title");
    expect(store.state.data.title).contain("title");
    let text = wrapper.find("#text");
    text.setValue("text");
    expect(store.state.data.text).contain("text");
    wrapper.vm.$emit("click");
    expect(wrapper.emitted().click.length).to.equal(1);
  });
  it("it renders alert", () => {
    let store = new Vuex.Store({
      state: {
        data: data.formInitialState,
        user: user.loggedIn,
        notifications: notifications.withAlert
      },
      actions: {
        login: () => {},
        updateTitle: () => {},
        updateText: () => {}
      }
    });
    const wrapper = mount(AddData, {
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
        data: data.formInitialState,
        user: user.loggedIn,
        notifications: notifications.withInitialState
      },
      actions: {
        login: () => {}
      }
    });
    const wrapper = mount(AddData, {
      localVue,
      store
    });
    let { title, variant } = sideBar[0];
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.html()).contain(title);
    expect(wrapper.html()).contain(variant);
  });
});
