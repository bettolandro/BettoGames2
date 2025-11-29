import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth';

describe('AuthService', () => {
  let service: AuthService;
  let storageSpy: jasmine.SpyObj<Storage>;

  beforeEach(() => {
    storageSpy = jasmine.createSpyObj('StorageService', ['get', 'set']);

    TestBed.configureTestingModule({
      providers: [
        { provide: Storage, useValue: storageSpy },
        AuthService
      ]
    });

    service = TestBed.inject(AuthService);
  });

  it('debería crearse correctamente', () => {
    expect(service).toBeTruthy();
  });
});
