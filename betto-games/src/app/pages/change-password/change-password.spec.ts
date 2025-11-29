import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ChangePassword } from './change-password';
import { AuthService } from '../../core/services/auth';
import { ToastService } from '../../core/services/toast.service';

describe('ChangePassword', () => {
  beforeEach(async () => {
    const authMock = {
      me: () => ({ id: '1', name: 'Test', email: 'test@test.cl', role: 'user' }),
      changePassword: () => ({ ok: true })
    };

    const toastMock = { show: () => {} };

    await TestBed.configureTestingModule({
      imports: [ChangePassword, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: ToastService, useValue: toastMock }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(ChangePassword);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
