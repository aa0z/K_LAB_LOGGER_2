import BootstrapVue from "bootstrap-vue";
import { expect } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import SideBar from "@/components/SideBar/SideBar.vue";
import { sideBar as items } from "../../mocks";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("SideBar.vue", () => {
  it("renders SideBar props", () => {
    const wrapper = mount(SideBar, {
      localVue,
      propsData: { items }
    });
    const { title } = items[0];
    const button = wrapper.find("button");
    expect(button.html()).contain(title);
    expect(wrapper.vm.items).to.be.an("array");
  });
});
