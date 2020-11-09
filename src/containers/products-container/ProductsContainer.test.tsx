import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProductsContainer from "./ProductsContainer";
import { findByTestAtrr } from "../../testHelpers/testHelper";
interface Props {}

configure({ adapter: new Adapter() });
const setUp = (props: Props) => {
  const component = shallow(<ProductsContainer {...props} />);
  return component;
};

describe("Test ProductsContainer with product", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setUp({});
    wrapper.setState({
      productArray: [
        {
          id: "string",
          name: "string",
          hero: { href: "string" },
          sellingPrice: 0,
          images: [{ href: "string" }],
        },
      ],
      loading: false,
    });
    wrapper.update();
  });
  it("ProductComponent renders 1 time", () => {
    const ProductComponentTag = wrapper.find("ProductComponent");
    // console.log(wrapper.debug());
    expect(ProductComponentTag.length).toBe(1);
  });
});
describe("Test ProductsContainer without product", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setUp({});
    wrapper.setState({ productArray: [], loading: false });
    wrapper.update();
  });
  it("ProductComponent renders 0 time", () => {
    const ProductComponentTag = wrapper.find("ProductComponent");
    // console.log(wrapper.debug());
    expect(ProductComponentTag.length).toBe(0);
  });
  it("Display Technical Error", () => {
    const wrapdiv = findByTestAtrr(wrapper, "techError");
    expect(wrapdiv.length).toBe(1);
  });
});
describe("Test ProductsContainer while still loading", () => {
  let wrapper: any;
  beforeEach(() => {
    wrapper = setUp({});
    wrapper.setState({ loading: true });
    wrapper.update();
  });
  it("ProductComponent renders 0 time", () => {
    const ProductComponentTag = wrapper.find("ProductComponent");
    // console.log(wrapper.debug());
    expect(ProductComponentTag.length).toBe(0);
  });
  it("Display Loading GIF", () => {
    const wrapdiv = findByTestAtrr(wrapper, "loadingGif");
    expect(wrapdiv.length).toBe(1);
  });
});
