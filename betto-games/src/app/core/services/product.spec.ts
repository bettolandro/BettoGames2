import { TestBed } from '@angular/core/testing';

import { ProductService } from './product';

describe('ProductService', () => {
  let service: ProductService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('StorageService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: storageSpy },
        ProductService
      ]
    });

    service = TestBed.inject(ProductService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});
