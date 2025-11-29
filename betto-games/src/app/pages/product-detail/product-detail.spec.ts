import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ProductDetail } from './product-detail';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
describe('ProductDetail', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ProductDetail, RouterTestingModule],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            paramMap: of(new Map([['id', 'game-1']]))
          }
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ProductDetail);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
