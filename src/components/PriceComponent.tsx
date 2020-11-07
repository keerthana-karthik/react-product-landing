import React from "react";
import priceClasses from "./PriceComponent.module.css";
interface Props {}
const PriceComponent: React.SFC<Props> = (props) => {
  return (
    <div className={priceClasses.priceWrapper}>
      <span className={priceClasses.priceSymbol}>$</span>
      <span className={priceClasses.price}>{props.children}</span>
    </div>
  );
};

export default PriceComponent;
