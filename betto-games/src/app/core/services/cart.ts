import { Injectable } from '@angular/core';
import { CartItem } from '../../models/cart';
import { Storage } from './storage';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio que administra el carrito de compras de BettoGames.
 * Permite agregar y quitar productos, limpiar el carrito y
 * expone un observable para reaccionar a los cambios.
 */
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
/**
   * Agrega un producto al carrito. Si ya existe, incrementa su cantidad.
   *
   * @param productId Identificador del producto.
   * @param quantity  Cantidad a agregar (por defecto 1).
   */
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
/**
   * Elimina un producto del carrito.
   *
   * @param productId Identificador del producto a remover.
   */
  remove(productId: string): void {
    const filtered = this.items$.value.filter(i => i.productId !== productId);
    this.persist(filtered);
  }
/**
   * Limpia completamente el carrito de compras.
   */
  clear(): void {
    this.persist([]);
  }
}
