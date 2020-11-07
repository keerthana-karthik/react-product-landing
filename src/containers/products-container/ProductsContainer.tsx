import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import { render } from "react-dom";
import ButtonComponent from "../../components/ButtonComponent";
import PriceComponent from "../../components/PriceComponent";
import indexClasses from "../../index.module.css";

class ProductsContainer extends Component {
  onAddToCart = () => {};
  render() {
    let productArray = [
      {
        id: "1",
        name: "Doctors Without Borders Face Coverings (Set of 2)",
        price: "12.5",
        imgUrl:
          "https://assets.weimgs.com/weimgs/ab/images/wcm/products/202043/0001/doctors-without-borders-face-coverings-set-of-2-3-m.jpg",
      },
    ];
    const products = productArray.map((product) => {
      return (
        <div
          key={"div" + product.id}
          className={[
            indexClasses.responsiveCol,
            indexClasses.l4,
            indexClasses.s6,
          ].join(" ")}
        >
          <div className={indexClasses.responsiveContainer}>
            <div className={indexClasses.positionDisplayContainer}>
              <Link
                key={"Link" + product.id}
                to={{ pathname: "/viewItem/" + "/" + product.id }}
              >
                <img
                  src={product.imgUrl}
                  alt="product image"
                  className={indexClasses.width100}
                ></img>
              </Link>

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
                <PriceComponent key={"PriceComponent" + product.id}>
                  {product.price}
                </PriceComponent>
              </div>
            </div>
          </div>
        </div>
      );
    });
    return (
      <div
        className={[
          indexClasses.responsiveContainer,
          indexClasses.textLeft,
        ].join(" ")}
      >
        <header
          className={[
            indexClasses.responsiveContainer,
            indexClasses.fontSize24,
          ].join(" ")}
        >
          <p id="pageTitle" className={indexClasses.positionLeft}>
            All Products
          </p>
        </header>
        <div className={indexClasses.responsiveRow}>{products}</div>
      </div>
    );
  }
}
export default ProductsContainer;
