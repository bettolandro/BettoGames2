import { CommonModule } from '@angular/common';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Product } from '../../models/product';
import { Subscription } from 'rxjs';
import { ProductService } from '../../core/services/product';
import { CartService } from '../../core/services/cart';

@Component({
  selector: 'app-product-detail',
  imports: [CommonModule, RouterLink],
  templateUrl: './product-detail.html',
  styleUrl: './product-detail.scss',
})
export class ProductDetail  implements OnInit, OnDestroy {

  product?: Product;
  private sub?: Subscription;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private cart: CartService
  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.sub = this.productService.productsChanges()
      .subscribe(products => {
        this.product = products.find(p => p.id === id);
      });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  addToCart(): void {
    if (!this.product) return;
    this.cart.add(this.product.id);
  }
}
