// export type Products = {
//   id: number;
//   categories: { name: string };
//   image_url: string;
//   name: string;
//   price: number;
// };

export type Product = {
  id: number;
  name: string;
  // price: number;
  image_url: string;
  categories: { name: string };
  options: ProductOptions;
  productGallery: string[];
};

export type AddProduct = {
  name: string;
  // price: number;
  description: string;
  category_id: number;
  options: ProductOptions;
  productGallery: string[];
};

export type GroupedProducts = {
  category: string;
  items: {
    id?: number;
    name: string;
    amount: number;
    imageUrl: string;
  }[];
};

export type FlattenedProduct = {
  id: number;
  name: string;
  // price?: number;
  image_url: string;
  category: string;
  options?: ProductOptions;
  productGallery?: string[];
};

export type Categories = {
  id: string;
  name: string;
  image_url: string;
};

export type ProductInfo = {
  id: number;
  name: string;
  // price: number;
  image_url: string;
  description: string;
  category_id: number;
  options?: ProductOptions;
  productGallery: string[];
};

export type OptionValue = string | number | boolean;

export interface OptionVariant {
  [key: string]: OptionValue;
}

export interface PriceOption {
  id: number;
  label: string;
  price: number;
}

export interface ProductOptions {
  prices: PriceOption[];
}
