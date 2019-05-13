import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";
import { expect } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import DataForm from "@/components/Data/DataForm.vue";
import { data } from "../../mocks";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("DataForm.vue", () => {
  it("renders DataForm", () => {
    let store = new Vuex.Store({
      state: {
        data: data.formInitialState
      },
      actions: {
        updateTitle: () => {},
        updateText: () => {}
      }
    });
    const wrapper = mount(DataForm, {
      localVue,
      store
    });
    expect(wrapper.isVueInstance()).to.be.true;
    let title = wrapper.find("#title");
    title.setValue("title");
    expect(store.state.data.title).contain("title");
    let text = wrapper.find("#text");
    text.setValue("text");
    expect(store.state.data.text).contain("text");
    wrapper.vm.$emit("click");
    expect(wrapper.emitted().click.length).to.equal(1);
  });
});
