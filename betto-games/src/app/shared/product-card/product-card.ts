import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Product } from '../../models/product';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-product-card',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-card.html',
  styleUrl: './product-card.scss',
})
export class ProductCard {
  @Input() product!: Product;
  constructor(
    private cart: CartService,
    private router: Router
  ) {}

  addToCart(): void {
    this.cart.add(this.product.id);
  }

  goToDetail(): void {
    this.router.navigate(['/product', this.product.id]);
  }
}
