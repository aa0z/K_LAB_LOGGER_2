import BootstrapVue from "bootstrap-vue";
import { expect } from "chai";
import { createLocalVue, mount } from "@vue/test-utils";
import Link from "@/components/SideBar/Link.vue";
import { sideBar } from "../../mocks";

const localVue = createLocalVue();
localVue.use(BootstrapVue);

describe("Link.vue", () => {
  it("renders Link props", () => {
    const { path, title } = sideBar[0];
    const variant = "disable";
    const wrapper = mount(Link, {
      localVue,
      propsData: { path, title, variant }
    });
    const button = wrapper.find("button");
    expect(wrapper.vm.path).contain(path);
    expect(button.html()).contain(title);
    expect(wrapper.vm.variant).contain(variant);
  });
  it("renders Link default props", () => {
    const { path, title } = sideBar[0];
    const variant = "link";
    const wrapper = mount(Link, {
      localVue,
      propsData: { path, title }
    });
    expect(wrapper.vm.variant).contain(variant);
  });
});
