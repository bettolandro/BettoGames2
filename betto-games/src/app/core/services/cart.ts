import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart';
import { Storage } from './storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {

  private readonly CART_KEY = 'cart';
  private items$ = new BehaviorSubject<CartItem[]>([]);

  constructor(private storage: Storage) {
    const initial = this.storage.get<CartItem[]>(this.CART_KEY, []);
    this.items$.next(initial);
  }

  itemsChanges(): Observable<CartItem[]> {
    return this.items$.asObservable();
  }

  getSnapshot(): CartItem[] {
    return this.items$.value;
  }

  private persist(items: CartItem[]): void {
    this.storage.set<CartItem[]>(this.CART_KEY, items);
    this.items$.next(items);
  }

  add(productId: string): void {
    const items = [...this.items$.value];
    const existing = items.find(i => i.productId === productId);

    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ productId, quantity: 1 });
    }

    this.persist(items);
  }

  decrement(productId: string): void {
    const items = [...this.items$.value];
    const idx = items.findIndex(i => i.productId === productId);
    if (idx === -1) return;

    if (items[idx].quantity <= 1) {
      items.splice(idx, 1);
    } else {
      items[idx].quantity -= 1;
    }

    this.persist(items);
  }

  remove(productId: string): void {
    const filtered = this.items$.value.filter(i => i.productId !== productId);
    this.persist(filtered);
  }

  clear(): void {
    this.persist([]);
  }
}
