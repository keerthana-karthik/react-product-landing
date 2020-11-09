import React, { Component } from "react";
import axios from "axios";
import ProductComponent from "../../components/ProductComponent";
import CarouselComponent from "../../components/CarouselComponent";
import productContainerClasses from "./ProductsContainer.module.css";
import indexClasses from "../../index.module.css";

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
  onImgClickHandler = (images: any[]) => {
    this.setState({ selectedProductImages: images });
  };
  componentDidMount() {
    let fetchedproducts: Product[] = [];
    let product: Product;
    this.setState({ loading: true });
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
            res.data.groups[key].images.length === 0
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
          <ProductComponent
            key={"ProductComponent" + product.id}
            product={product}
            onImgClick={this.onImgClickHandler}
          ></ProductComponent>
        );
      });
    } else if (this.state.loading) {
      products = (
        <div>
          <img
            alt="loading"
            className={productContainerClasses.centerLoading}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
        </div>
      );
    } else {
      products = (
        <h4 style={{ textAlign: "center" }}>
          Sorry. We couldn't load the products. Please try again after some
          time.
        </h4>
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
        <CarouselComponent
          key={"CarouselComponent1"}
          selectedProductImages={this.state.selectedProductImages}
        ></CarouselComponent>
      </div>
    );
  }
}
export default ProductsContainer;
