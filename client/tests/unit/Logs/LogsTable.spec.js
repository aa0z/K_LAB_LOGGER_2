import BootstrapVue from "bootstrap-vue";
import Vuex from "vuex";
import { expect } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import LogsTable from "@/components/Logs/LogsTable.vue";
import { logs } from "../../mocks";

const localVue = createLocalVue();
localVue.use(BootstrapVue);
localVue.use(Vuex);

describe("LogsTable.vue", () => {
  it("renders LogsTable", () => {
    let store = new Vuex.Store({
      state: {
        logs: logs.withInitialState
      }
    });
    const wrapper = mount(LogsTable, {
      localVue,
      store
    });
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.find("table").exists()).to.be.true;
  });
  it("renders LogsTable data", () => {
    let store = new Vuex.Store({
      state: {
        logs: logs.withItems
      }
    });
    const wrapper = mount(LogsTable, {
      localVue,
      store
    });
    let { eventType, date } = logs.withItems.items[0];
    expect(wrapper.isVueInstance()).to.be.true;
    expect(wrapper.find("table").exists()).to.be.true;
    expect(wrapper.html()).contain(eventType);
    expect(wrapper.html()).contain(date);
  });
});
