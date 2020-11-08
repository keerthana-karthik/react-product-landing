import React, { Component } from "react";
import { Route, NavLink, Switch, Redirect } from "react-router-dom";
import { Link } from "react-router-dom";
import axios from "axios";
import { render } from "react-dom";
import ButtonComponent from "../../components/ButtonComponent";
import PriceComponent from "../../components/PriceComponent";
import productContainerClasses from "./ProductsContainer.module.css";
import indexClasses from "../../index.module.css";
import { Carousel } from "react-responsive-carousel";
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
  openCarousel = (images: any[]) => {
    this.setState({ selectedProductImages: images });
    (document.getElementById("carouselSection") as HTMLElement).style.display =
      "block";
    (document.getElementById("carouselOverlay") as HTMLElement).style.display =
      "block";
  };
  closeCarousel = () => {
    (document.getElementById("carouselSection") as HTMLElement).style.display =
      "none";
    (document.getElementById("carouselOverlay") as HTMLElement).style.display =
      "none";
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
    if (productArray != null && productArray.length > 0) {
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
                    this.openCarousel(product.images);
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
    } else {
      products = (
        <div>
          <img
            className={productContainerClasses.centerLoading}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
        </div>
      );
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
        <div
          className={productContainerClasses.overlay}
          id="carouselOverlay"
          onClick={this.closeCarousel}
        ></div>
        <div
          className={productContainerClasses.carouselWrapper}
          id="carouselSection"
        >
          <Carousel>
            {this.state.selectedProductImages.map((image) => {
              return (
                <div>
                  <img src={image.href} />
                </div>
              );
            })}
          </Carousel>
        </div>
      </div>
    );
  }
}
export default ProductsContainer;
