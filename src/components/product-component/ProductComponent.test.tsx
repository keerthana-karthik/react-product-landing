import React from "react";
import { configure, shallow } from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import ProductComponent from "./ProductComponent";
import { Product } from "../../models/Product";

interface Props {
  key?: string;
  product: Product;
  onImgClick: (images: any[]) => void;
}

configure({ adapter: new Adapter() });
const setUp = (props: Props) => {
  const component = shallow(<ProductComponent {...props} />);
  return component;
};

describe("Test ProductComponent with product", () => {
  let wrapper: any;
  beforeEach(() => {
    let p: Product = {
      id: "string",
      name: "string",
      hero: { href: "string" },
      sellingPrice: 10,
      images: [{ href: "string" }],
    };
    const props = {
      product: p,
      onImgClick: function (images: any[]) {},
    };
    wrapper = setUp(props);
  });
  it("PriceComponent renders 1 time", () => {
    const PriceComponentTag = wrapper.find("PriceComponent");
    console.log(wrapper.debug());
    expect(PriceComponentTag.length).toBe(1);
  });
});
