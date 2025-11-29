import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductCard } from './product-card';
import { Product } from '../../models/product';

describe('ProductCard', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductCard, RouterTestingModule]
    }).compileComponents();
  });

  it('should create with input product', () => {
    const fixture = TestBed.createComponent(ProductCard);
    const comp = fixture.componentInstance;

    const mockProduct: Product = {
      id: 'game-1',
      title: 'Elden Ring',
      desc: 'Un RPG de prueba',
      price: 49990,
      stock: 10,
      cover: 'elden-ring.jpg',
      category: 'RPG'
      // todos los demás campos requeridos
    };

    comp.product = mockProduct;
    fixture.detectChanges();

    expect(comp).toBeTruthy();
  });
});