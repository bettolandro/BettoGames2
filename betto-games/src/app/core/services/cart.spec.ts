import { TestBed } from '@angular/core/testing';

import { CartService } from './cart';

describe('CartService', () => {
  let service: CartService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('StorageService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: storageSpy },
        CartService
      ]
    });

    service = TestBed.inject(CartService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});
