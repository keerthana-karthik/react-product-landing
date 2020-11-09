import React from "react";
import { configure, shallow, mount } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import CarouselComponent from "./CarouselComponent";
import { Carousel } from "react-responsive-carousel";
interface Props {
  selectedProductImages: any[];
}

configure({ adapter: new Adapter() });
const setUp = (props: Props) => {
  const component = shallow(<CarouselComponent {...props} />);
  return component;
};

describe("Has atleast 1 Carousel", () => {
  let wrapper: any;
  beforeEach(() => {
    const props = {
      selectedProductImages: [{ href: "string1" }],
    };
    wrapper = setUp(props);
  });
  it("Carousel renders 2 time", () => {
    const CarouselTag = wrapper.find(Carousel);
    expect(CarouselTag.length).toBe(1);
  });
});
