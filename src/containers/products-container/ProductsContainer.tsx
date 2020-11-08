import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { render } from "react-dom";
import CarouselComponent from "../../components/CarouselComponent";
import PriceComponent from "../../components/PriceComponent";
import productContainerClasses from "./ProductsContainer.module.css";
import indexClasses from "../../index.module.css";
import { any } from "prop-types";

interface Product {
  id: string;
  name: string;
  hero: { href: string };
  sellingPrice?: number;
  sellingPriceHigh?: number;
  sellingPriceLow?: number;
  images: [{ href: string }];
}
class ProductsContainer extends Component {
  state: {
    productArray: Product[] | null;
    loading: boolean;
    selectedProductImages: any[];
  } = {
    loading: true,
    productArray: null,
    selectedProductImages: [],
  };
  onImgClick = (images: any[]) => {
    this.setState({ selectedProductImages: images });
  };
  componentDidMount() {
    let fetchedproducts: Product[] = [];
    let product: Product;
    let selP: number = 0;
    let selPHigh: number = 0;
    let selPLow: number = 0;
    this.setState({ loading: true });
    setTimeout(() => {
      axios
        .get(
          "https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json"
        )
        .then((res) => {
          for (let key in res.data.groups) {
            product = {
              ...res.data.groups[key],
              id: key,
            };
            if (res.data.groups[key].price) {
              product.sellingPrice = res.data.groups[key].price.selling;
            }
            if (
              res.data.groups[key].priceRange &&
              res.data.groups[key].priceRange.selling
            ) {
              product.sellingPriceHigh =
                res.data.groups[key].priceRange.selling.high;
              product.sellingPriceLow =
                res.data.groups[key].priceRange.selling.low;
            }
            if (
              res.data.groups[key].images &&
              res.data.groups[key].images.length == 0
            ) {
              product.images = [{ href: res.data.groups[key].hero.href }];
            }
            fetchedproducts.push(product);
          }
          this.setState({ productArray: fetchedproducts });
          this.setState({ loading: false });
        })
        .catch((error) => {
          fetchedproducts = [];
          this.setState({ productArray: fetchedproducts });
          this.setState({ loading: false });
        });
    }, 2000);
  }
  onAddToCart = () => {};
  render() {
    let productArray = this.state.productArray;
    let products;
    if (
      productArray != null &&
      productArray.length > 0 &&
      !this.state.loading
    ) {
      products = productArray.map((product) => {
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
                <img
                  src={product.hero.href}
                  alt="product image"
                  className={[
                    indexClasses.width100,
                    indexClasses.cursorPointer,
                  ].join(" ")}
                  onClick={() => {
                    this.onImgClick(product.images);
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
      });
    } else if (this.state.loading) {
      products = (
        <div>
          <img
            className={productContainerClasses.centerLoading}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
        </div>
      );
    } else {
      products = <div>Error getting data</div>;
    }

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
        <CarouselComponent
          key={"CarouselComponent1"}
          selectedProductImages={this.state.selectedProductImages}
        ></CarouselComponent>
      </div>
    );
  }
}
export default ProductsContainer;
