import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Order } from '../../models/order';
import { Storage } from './storage';
import { CartItemDetail } from '../../models/cart';
@Injectable({
  providedIn: 'root',
})
export class OrderService {

  private readonly ORDERS_KEY = 'orders';
  private orders$ = new BehaviorSubject<Order[]>([]);

  constructor(private storage: Storage) {
    const initial = this.storage.get<Order[]>(this.ORDERS_KEY, []);
    this.orders$.next(initial);
  }

  ordersChanges(): Observable<Order[]> {
    return this.orders$.asObservable();
  }

  private persist(orders: Order[]): void {
    this.storage.set<Order[]>(this.ORDERS_KEY, orders);
    this.orders$.next(orders);
  }

  createOrder(userId: string, items: CartItemDetail[]): void {
    const total = items.reduce(
      (sum, item) => sum + item.product.price * item.quantity,
      0
    );

    const order: Order = {
      id: crypto.randomUUID(),
      userId,
      createdAt: new Date().toISOString(),
      items,
      total
    };

    const all = [...this.orders$.value, order];
    this.persist(all);
  }
}
