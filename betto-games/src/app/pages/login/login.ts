import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.html',
  styleUrl: './login.scss',
})
/**
 * Página de inicio de sesión de BettoGames.
 * Permite al usuario ingresar su correo y contraseña para
 * acceder a las funcionalidades protegidas de la tienda.
 */
export class Login {
  form: FormGroup;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['', [Validators.required]]
    });
  }
/**
   * Envía el formulario de inicio de sesión.
   * Si las credenciales son válidas, redirige al catálogo;
   * en caso contrario muestra un mensaje de error.
   */
  submit(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { email, pass } = this.form.value;
    const result = this.auth.login(email, pass);

    if (!result.ok) {
      this.errorMsg = result.msg ?? 'Error al iniciar sesión';
      return;
    }

    this.router.navigateByUrl('/');
  }

  get email() { return this.form.get('email'); }
  get pass() { return this.form.get('pass'); }
}
