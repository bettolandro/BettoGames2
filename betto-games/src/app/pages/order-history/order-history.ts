import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, SessionInfo } from '../../core/services/auth';
import { Order } from '../../models/order';
import { Subscription } from 'rxjs';
import { OrderService } from '../../core/services/order';

@Component({
  selector: 'app-order-history',
  imports: [CommonModule],
  templateUrl: './order-history.html',
  styleUrl: './order-history.scss',
})
/**
 * Página de historial de compras.
 * Muestra las órdenes generadas por el usuario con fecha, total
 * y listado de productos asociados.
 */
export class OrderHistory  implements OnInit, OnDestroy {

  session: SessionInfo | null = null;
  orders: Order[] = [];

  private sub?: Subscription;

  constructor(
    private orderService: OrderService,
    private auth: AuthService
  ) {
    this.session = this.auth.me();
  }
/**
   * Carga las órdenes del usuario desde el servicio correspondiente.
   */
  ngOnInit(): void {
    if (!this.session) return;

    this.sub = this.orderService.ordersChanges().subscribe(all => {
      this.orders = all
        .filter(o => o.userId === this.session!.id)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }
}
