import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Product } from '../../models/product';
import { ProductService } from '../../core/services/product';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-products',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './admin-products.html',
  styleUrl: './admin-products.scss',
})
export class AdminProducts implements OnInit {

  products: Product[] = [];
  form: FormGroup;
  editingId: string | null = null;

  constructor(
    private productService: ProductService,
    private auth: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      title: ['', [Validators.required]],
      price: [0, [Validators.required, Validators.min(0)]],
      stock: [0, [Validators.required, Validators.min(0)]],
      category: ['', [Validators.required]],
      cover: ['', [Validators.required]],
      desc: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    if (!this.auth.isAdmin()) {
      this.router.navigateByUrl('/');
      return;
    }

    this.productService.productsChanges()
      .subscribe(p => this.products = p);
  }

  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    if (this.editingId) {
      this.productService.update(this.editingId, this.form.value);
    } else {
      this.productService.add(this.form.value);
    }

    this.cancel();
  }

  edit(product: Product): void {
    this.editingId = product.id;
    this.form.patchValue(product);
  }

  delete(product: Product): void {
    if (!confirm(`¿Eliminar el producto "${product.title}"?`)) return;
    this.productService.remove(product.id);
    if (this.editingId === product.id) {
      this.cancel();
    }
  }

  cancel(): void {
    this.editingId = null;
    this.form.reset({
      price: 0,
      stock: 0
    });
  }

  get isEditing(): boolean {
    return !!this.editingId;
  }
}
