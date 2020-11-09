import { Product } from "../models/Product";

const categoryDisplayNameMap = [
  { key: "cookware", value: "Cookware" },
  { key: "cutlery", value: "Cutlery" },
  { key: "electrics", value: "Electrics" },
  { key: "bakeware", value: "Bakeware" },
  { key: "food", value: "Food" },
  { key: "homekeeping", value: "Homekeeping" },
  { key: "outdoor", value: "Outdoor" },
];
export const getCategoriesMap = () => {
  return categoryDisplayNameMap;
};

export const formatResponseArray = (res: any) => {
  let fetchedproducts: Product[] = [];
  let product: Product;
  if (res && res.data && res.data.groups) {
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
        product.sellingPriceHigh = res.data.groups[key].priceRange.selling.high;
        product.sellingPriceLow = res.data.groups[key].priceRange.selling.low;
      }
      if (
        res.data.groups[key].images &&
        res.data.groups[key].images.length === 0
      ) {
        product.images = [{ href: res.data.groups[key].hero.href }];
      }
      fetchedproducts.push(product);
    }
  }
  return fetchedproducts;
};
