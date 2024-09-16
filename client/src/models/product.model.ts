export interface ProductsResponse {
  data: Product[];
}

export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  views: number;
}