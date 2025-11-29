import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Storage } from './storage';
import { Product } from '../../models/product';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly PRODUCTS_KEY = 'products';
  private products$ = new BehaviorSubject<Product[]>([]);

  constructor(private storage: Storage) {
    let products = this.storage.get<Product[]>(this.PRODUCTS_KEY, []);

    // Si no hay productos, cargamos los demo tal como en app.js
    if (products.length === 0) {
      products = [
        {
          id: crypto.randomUUID(),
          title: 'Elden Ring',
          price: 49990,
          stock: 10,
          category: 'RPG',
          cover: 'assets/img/elden-ring.jpg',
          desc: 'Un RPG de mundo abierto desafiante.'
        },
        {
          id: crypto.randomUUID(),
          title: 'Hades II',
          price: 29990,
          stock: 15,
          category: 'Roguelike',
          cover: 'assets/img/hades2.jpg',
          desc: 'Secuela del premiado roguelike.'
        },
        {
          id: crypto.randomUUID(),
          title: 'Marvel´s Spider-man 2',
          price: 59990,
          stock: 5,
          category: 'Acción',
          cover: 'assets/img/spiderman2.jpg',
          desc: 'Aventuras de Spider-man en mundo abierto.'
        },
        {
          id: crypto.randomUUID(),
          title: 'Stardew Valley',
          price: 12990,
          stock: 30,
          category: 'Simulación',
          cover: 'assets/img/stardew.jpg',
          desc: 'Granjas, amistad y muchas horas de paz pixel art.'
        }
      ];
      this.storage.set<Product[]>(this.PRODUCTS_KEY, products);
    }

    this.products$.next(products);
  }

  productsChanges() {
    return this.products$.asObservable();
  }

  private persist(products: Product[]): void {
    this.storage.set<Product[]>(this.PRODUCTS_KEY, products);
    this.products$.next(products);
  }

  add(product: Omit<Product, 'id'>): void {
    const products = [...this.products$.value];
    const newProduct: Product = { ...product, id: crypto.randomUUID() };
    products.push(newProduct);
    this.persist(products);
  }

  update(id: string, changes: Partial<Omit<Product, 'id'>>): void {
    const products = this.products$.value.map(p =>
      p.id === id ? { ...p, ...changes } : p
    );
    this.persist(products);
  }

  remove(id: string): void {
    const products = this.products$.value.filter(p => p.id !== id);
    this.persist(products);
  }
}
