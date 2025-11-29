import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { EditProfile } from './edit-profile';
import { AuthService } from '../../core/services/auth';
import { ToastService } from '../../core/services/toast.service';

describe('EditProfile', () => {
  beforeEach(async () => {
    const authMock = {
      me: () => ({ id: '1', name: 'Test', email: 'test@test.cl', role: 'user' }),
      updateProfile: () => {}
    };

    const toastMock = { show: () => {} };

    await TestBed.configureTestingModule({
      imports: [EditProfile, RouterTestingModule],
      providers: [
        { provide: AuthService, useValue: authMock },
        { provide: ToastService, useValue: toastMock }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(EditProfile);
    const comp = fixture.componentInstance;
    expect(comp).toBeTruthy();
  });
});
