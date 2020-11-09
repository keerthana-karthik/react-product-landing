import React from "react";
import priceClasses from "./PriceComponent.module.css";
interface Props {
  sellingPrice?: number;
  sellingPriceHigh?: number;
  sellingPriceLow?: number;
}
const PriceComponent: React.SFC<Props> = (props) => {
  return props.sellingPrice ? (
    <div test-attr="price" className={priceClasses.priceWrapper}>
      <span className={priceClasses.priceSymbol}>$</span>
      <span className={priceClasses.price}>{props.sellingPrice}</span>
    </div>
  ) : (
    <div test-attr="priceRange" className={priceClasses.priceWrapper}>
      (<span className={priceClasses.priceSymbol}>$</span>
      <span className={priceClasses.price}>{props.sellingPriceHigh}</span>
      <span className={priceClasses.priceSymbol}> - </span>
      <span className={priceClasses.priceSymbol}>$</span>
      <span className={priceClasses.price}>{props.sellingPriceLow}</span>)
    </div>
  );
};

export default PriceComponent;
