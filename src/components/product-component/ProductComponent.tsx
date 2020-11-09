import React, { useEffect } from "react";
import PriceComponent from "../price-component/PriceComponent";
import indexClasses from "../../index.module.css";
import productComponentClasses from "./ProductComponent.module.css";
import { Product } from "../../models/Product";

interface Props {
  key?: string;
  product: Product;
  onImgClick: (images: any[]) => void;
}

const ProductComponent: React.SFC<Props> = (props) => {
  useEffect(() => {}, []);

  let product = props.product;
  return (
    <div
      key={"div" + product.id}
      className={[
        indexClasses.responsiveCol,
        indexClasses.l4,
        indexClasses.m6,
        indexClasses.s12,
      ].join(" ")}
    >
      <div className={indexClasses.responsiveContainer}>
        <div
          className={[
            indexClasses.positionDisplayContainer,
            productComponentClasses.productBox,
          ].join(" ")}
        >
          <img
            src={product.hero.href}
            alt="Product"
            className={[indexClasses.width100, indexClasses.cursorPointer].join(
              " "
            )}
            onClick={() => {
              props.onImgClick(product.images);
            }}
          ></img>

          <div
            className={[
              indexClasses.positionDisplayTopmiddle,
              indexClasses.overlayText,
            ].join(" ")}
          >
            {product.name}
          </div>
          <div
            className={[
              indexClasses.positionDisplayBottom2left1,
              indexClasses.smallDarkOverlayText,
            ].join(" ")}
          >
            {product.sellingPrice ? (
              <PriceComponent
                key={"PriceComponent" + product.id}
                sellingPrice={product.sellingPrice}
              ></PriceComponent>
            ) : null}
            {product.sellingPriceHigh ? (
              <PriceComponent
                key={"PriceComponent" + product.id}
                sellingPriceHigh={product.sellingPriceHigh}
                sellingPriceLow={product.sellingPriceLow}
              ></PriceComponent>
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductComponent;
