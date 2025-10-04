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
  price: number;
  image_url: string;
  categories: { name: string };
};

export type AddProduct = {
  name: string;
  price: number;
  image_url: string | null;
  category_id: number;
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
  price: number;
  image_url: string;
  category: string; // 👈 string instead of object
};

export type Categories = {
  id: string;
  name: string;
  image_url: string;
};

export type ProductInfo = {
  id: number;
  name: string;
  price: number;
  image_url: string;
  description: string;
  category_id: number;
  options?: ProductOptions;
};

export type OptionValue = string | number | boolean;

export interface OptionVariant {
  [key: string]: OptionValue;
}

export interface ProductOptions {
  [key: string]: OptionValue[] | OptionVariant[];
}
