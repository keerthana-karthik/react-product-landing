import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { render } from "react-dom";
import ButtonComponent from "../../components/ButtonComponent";
import PriceComponent from "../../components/PriceComponent";
import productContainerClasses from "./ProductsContainer.module.css";
import indexClasses from "../../index.module.css";
import { any } from "prop-types";

interface Product {
  id: string;
  name: string;
  hero: { href: string };
  sellingPrice: number;
}
class ProductsContainer extends Component {
  state = {
    productArray: [{ id: "", name: "", hero: { href: "" }, sellingPrice: 0 }],
  };
  componentDidMount() {
    let fetchedproducts: Product[] = [];
    let selP: number = 0;
    axios
      .get(
        "https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json"
      )
      .then((res) => {
        for (let key in res.data.groups) {
          if (res.data.groups[key].price) {
            selP = res.data.groups[key].price.selling;
          }
          fetchedproducts.push({
            ...res.data.groups[key],
            id: key,
            sellingPrice: selP,
          });
        }
        this.setState({ productArray: fetchedproducts });
      })
      .catch((error) => {
        fetchedproducts = [];
      });
  }
  onAddToCart = () => {};
  render() {
    let productArray = this.state.productArray;
    const products = productArray.map((product) => {
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
                productContainerClasses.productBox,
              ].join(" ")}
            >
              <Link
                key={"Link" + product.id}
                to={{ pathname: "/viewItem/" + "/" + product.id }}
              >
                <img
                  src={product.hero.href}
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
                  {product.sellingPrice}
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
