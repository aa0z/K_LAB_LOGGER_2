import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";
import { expect } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import DataTable from "@/components/Data/DataTable.vue";
import { data } from "../../mocks";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("DataTable.vue", () => {
  it("renders DataTable", () => {
    let store = new Vuex.Store({
      state: {
        data: {
          items: []
        }
      }
    });
    const wrapper = mount(DataTable, {
      localVue,
      store
    });
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.find("table").exists()).to.be.true;
  });
  it("renders DataTable data", () => {
    const { title, text } = data.withItems.items[0];
    let store = new Vuex.Store({
      state: {
        data: {
          items: [{ title, text }]
        }
      }
    });
    const wrapper = mount(DataTable, {
      localVue,
      store
    });
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.find("table").exists()).to.be.true;
    expect(wrapper.html()).contain(title);
    expect(wrapper.html()).contain(text);
  });
});
