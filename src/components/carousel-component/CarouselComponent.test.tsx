import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CarouselComponent from "./CarouselComponent";

interface Props {
  selectedProductImages: any[];
}

configure({ adapter: new Adapter() });
const setUp = (props: Props) => {
  const component = shallow(<CarouselComponent {...props} />);
  return component;
};

describe("Test Carousel Section", () => {
  let wrapper: any;
  beforeEach(() => {
    const props = {
      selectedProductImages: [{ href: "string1" }, { href: "string2" }],
    };
    wrapper = setUp(props);
  });
  it("Carousel renders 1 time", () => {
    const CarouselTag = wrapper.find("Carousel");
    // console.log(wrapper.debug());
    expect(CarouselTag.length).toBe(1);
  });
  it("img renders 2 times for 2 urls", () => {
    const imgTag = wrapper.find("img");
    expect(imgTag.length).toBe(2);
  });
});
