import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";
import { expect } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import Alert from "@/components/Notification/Alert.vue";
import { notifications } from "../../mocks";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("Alert.vue", () => {
  it("it renders Alert", () => {
    let store = new Vuex.Store({
      state: {
        notifications: notifications.withAlert
      }
    });
    const wrapper = mount(Alert, {
      localVue,
      store
    });
    let { message, variant } = notifications.withAlert.alert;
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.find("div").exists()).to.be.true;
    expect(wrapper.html()).contain(message);
    expect(wrapper.vm.variant).contain(variant);
    expect(wrapper.vm.show).to.be.true;
  });
  it("it doesn't render Alert", () => {
    let store = new Vuex.Store({
      state: {
        notifications: notifications.withInitialState
      }
    });
    const wrapper = mount(Alert, {
      localVue,
      store
    });
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.find("div").exists()).to.be.false;
    expect(wrapper.vm.show).to.be.false;
  });
});
