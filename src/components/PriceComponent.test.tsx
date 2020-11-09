import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import { findByTestAtrr } from "../testHelpers/testHelper";
import PriceComponent from "./PriceComponent";
interface Props {
  sellingPrice?: number;
  sellingPriceHigh?: number;
  sellingPriceLow?: number;
}

configure({ adapter: new Adapter() });
const setUp = (props: Props) => {
  const component = shallow(<PriceComponent {...props} />);
  return component;
};

describe("Has 2 props", () => {
  let wrapper: any;
  beforeEach(() => {
    const props = {
      sellingPriceHigh: 10,
      sellingPriceLow: 20,
    };
    wrapper = setUp(props);
  });
  it("Should render Price Range section when price is not passed", () => {
    const wrapdiv = findByTestAtrr(wrapper, "priceRange");
    expect(wrapdiv.length).toBe(1);
  });
});
describe("Has 1 prop", () => {
  let wrapper: any;
  beforeEach(() => {
    const props = {
      sellingPrice: 10,
    };
    wrapper = setUp(props);
  });
  it("Should render Price Range section when price is not passed", () => {
    const wrapdiv = findByTestAtrr(wrapper, "price");
    expect(wrapdiv.length).toBe(1);
  });
});
