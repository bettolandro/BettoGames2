import { TestBed } from '@angular/core/testing';

import {  OrderService } from './order';

describe('OrderService', () => {
  let service: OrderService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('StorageService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: storageSpy },
        OrderService
      ]
    });

    service = TestBed.inject(OrderService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});
