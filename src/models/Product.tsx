export interface Product {
  id: string;
  name: string;
  hero: { href: string };
  sellingPrice?: number;
  sellingPriceHigh?: number;
  sellingPriceLow?: number;
  images: [{ href: string }];
}
