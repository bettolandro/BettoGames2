import { CartItemDetail } from './cart';

export interface Order {
  id: string;
  userId: string;
  createdAt: string;
  items: CartItemDetail[];
  total: number;
}