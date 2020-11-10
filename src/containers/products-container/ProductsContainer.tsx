import React, { Component } from "react";
import axios from "axios";
import ProductComponent from "../../components/product-component/ProductComponent";
import CarouselComponent from "../../components/carousel-component/CarouselComponent";
import productContainerClasses from "./ProductsContainer.module.css";
import indexClasses from "../../index.module.css";
import { Product } from "../../models/Product";
import { formatResponseArray } from "../../utils/CommonHelper";

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
    // "https://www.westelm.com/services/catalog/v4/category/shop/new/all-new/index.json"
    axios
      .get(
        "https://my-json-server.typicode.com/keerthana-karthik/react-product-landing"
      )
      .then((res) => {
        fetchedproducts = formatResponseArray(res);
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
        <div test-attr="loadingGif">
          <img
            alt="loading"
            className={productContainerClasses.centerLoading}
            src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"
          />
        </div>
      );
    } else {
      products = (
        <h4 test-attr="techError" style={{ textAlign: "center" }}>
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
