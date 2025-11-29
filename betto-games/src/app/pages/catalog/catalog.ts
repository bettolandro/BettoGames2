import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product';
import { ProductService } from '../../core/services/product';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ProductCard } from '../../shared/product-card/product-card';

@Component({
  selector: 'app-catalog',
  imports: [CommonModule,FormsModule, ProductCard],
  templateUrl: './catalog.html',
  styleUrl: './catalog.scss',
})
export class Catalog implements OnInit {

  products: Product[] = [];
  searchTerm: string = '';

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.productsChanges().subscribe(p => {
      this.products = p;
    });
  }

  get filteredProducts(): Product[] {
    const term = this.searchTerm.toLowerCase();
    return this.products.filter(p =>
      p.title.toLowerCase().includes(term) ||
      p.desc.toLowerCase().includes(term)
    );
  }
}
