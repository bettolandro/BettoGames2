import { Product } from './product';

export interface CartItem {
  productId: string;
  quantity: number;
}

export interface CartItemDetail extends CartItem {
  product: Product;
}