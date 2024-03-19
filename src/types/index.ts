export interface Product {
  consumption: string;
  id: string;
  img: string;
  manufactured: string;
  overview: string;
  price: string;
  rating: string;
  title: string;
  type: string;
}

export type TemplateParams = {
  from_name: string;
  products: any[];
  price: Number;
  send: string;
  phone: string;
  userEmail: string;
  address: string;
  totalProducts: string;
};

export interface localBasket {
  img: string;
  title: string;
  id: string;
  count: string;
}
