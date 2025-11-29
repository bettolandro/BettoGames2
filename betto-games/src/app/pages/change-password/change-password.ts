import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-change-password',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './change-password.html',
  styleUrl: './change-password.scss',
})
export class ChangePassword {

  form!: FormGroup;

  // Para mostrar mensajes en la página
  error = '';
  message = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    const session = this.auth.me();
    if (!session) {
      this.router.navigateByUrl('/login');
      return;
    }

    this.form = this.fb.group({
      oldPass: ['', Validators.required],
      newPass: ['', [Validators.required, Validators.minLength(8)]],
      confirmPass: ['', Validators.required]
    });
  }

  save(): void {
    this.error = '';
    this.message = '';

    const session = this.auth.me();
    if (!session) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show('Hay campos inválidos.', 'warning');
      return;
    }

    const { oldPass, newPass, confirmPass } = this.form.value;

    if (newPass !== confirmPass) {
      this.error = 'Las contraseñas nuevas no coinciden.';
      this.toast.show('Las contraseñas nuevas no coinciden.', 'error');
      return;
    }

    const result = this.auth.changePassword(session.id, oldPass, newPass);

    if (!result.ok) {
      this.error = result.msg ?? 'Error al cambiar contraseña.';
      this.toast.show(this.error, 'error');
      return;
    }

    this.message = 'Contraseña actualizada correctamente.';
    this.toast.show('Contraseña actualizada correctamente.', 'success');
    this.form.reset();
  }

  get oldPassCtrl() {
    return this.form.get('oldPass');
  }

  get newPassCtrl() {
    return this.form.get('newPass');
  }

  get confirmPassCtrl() {
    return this.form.get('confirmPass');
  }
}