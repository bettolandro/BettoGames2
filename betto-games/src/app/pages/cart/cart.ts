import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router,RouterLink } from '@angular/router';
import { CartItemDetail } from '../../models/cart';
import { combineLatest, Subscription } from 'rxjs';
import { CartService } from '../../core/services/cart';
import { ProductService } from '../../core/services/product';
import { AuthService } from '../../core/services/auth';
import { OrderService } from '../../core/services/order';

@Component({
  selector: 'app-cart',
  imports: [CommonModule, RouterLink],
  templateUrl: './cart.html',
  styleUrl: './cart.scss',
})
/**
 * Página que muestra el carrito de compras del usuario.
 * Permite revisar los productos agregados, modificar cantidades
 * y proceder al pago generando una orden.
 */
export class Cart implements OnInit, OnDestroy {

  items: CartItemDetail[] = [];
  total = 0;
  msg = '';

  private sub?: Subscription;

  constructor(
    private cartService: CartService,
    private productService: ProductService,   // 👈 para actualizar stock
    private auth: AuthService,
    private orderService: OrderService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.sub = combineLatest([
      this.productService.productsChanges(),
      this.cartService.itemsChanges()
    ]).subscribe(([products, cartItems]) => {
      this.items = cartItems
        .map(ci => {
          const product = products.find(p => p.id === ci.productId);
          return product ? { ...ci, product } : undefined;
        })
        .filter((x): x is CartItemDetail => !!x);

      this.total = this.items.reduce(
        (sum, item) => sum + item.product.price * item.quantity,
        0
      );
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  inc(item: CartItemDetail): void {
    this.cartService.add(item.productId);
  }

  dec(item: CartItemDetail): void {
    this.cartService.decrement(item.productId);
  }
/**
   * Elimina un producto específico del carrito.
   *
   * @param productId Identificador del producto a eliminar.
   */
  remove(item: CartItemDetail): void {
    this.cartService.remove(item.productId);
  }

  clear(): void {
    this.cartService.clear();
  }
/**
   * Confirma la compra actual y genera una orden en el historial.
   */
  checkout(): void {
    this.msg = '';

    const session = this.auth.me();
    if (!session) {
      this.msg = 'Debes iniciar sesión antes de finalizar la compra.';
      this.router.navigateByUrl('/login');
      return;
    }

    if (this.items.length === 0) {
      this.msg = 'Tu carrito está vacío.';
      return;
    }

    // 1) Verificar stock suficiente
    const sinStock = this.items.find(item => item.quantity > item.product.stock);
    if (sinStock) {
      this.msg = `No hay stock suficiente de "${sinStock.product.title}".`;
      return;
    }

    // 2) Crear la orden
    this.orderService.createOrder(session.id, this.items);

    // 3) Descontar stock de cada producto
    this.items.forEach(item => {
      const nuevoStock = Math.max(item.product.stock - item.quantity, 0);
      this.productService.update(item.product.id, { stock: nuevoStock });
    });

    // 4) Vaciar carrito
    this.cartService.clear();

    // 5) Mensaje + redirección
    this.msg = 'Compra realizada con éxito. El stock fue actualizado.';
    this.router.navigateByUrl('/orders');
  }
}