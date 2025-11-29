import { Component } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { AuthService } from '../../core/services/auth';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';


// Validador de fuerza de contraseña
function passwordStrength(ctrl: AbstractControl): ValidationErrors | null {
  const value = ctrl.value as string;
  if (!value) return null;

  const errors: any = {};
  if (value.length < 8) errors.minLength = true;
  if (value.length > 16) errors.maxLength = true;
  if (!/[A-Z]/.test(value)) errors.uppercase = true;
  if (!/[a-z]/.test(value)) errors.lowercase = true;
  if (!/[0-9]/.test(value)) errors.number = true;
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(value)) errors.special = true;

  return Object.keys(errors).length ? errors : null;
}

// Validador de coincidencia de contraseñas
function passwordsMatch(group: AbstractControl): ValidationErrors | null {
  const pass = group.get('pass')?.value;
  const confirm = group.get('confirmPass')?.value;
  return pass === confirm ? null : { mismatch: true };
}

@Component({
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.html',
  styleUrl: './register.scss',
})
export class Register {
  form: FormGroup;
  serverMsg = '';
  successMsg = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      passwordGroup: this.fb.group({
        pass: ['', [Validators.required, passwordStrength]],
        confirmPass: ['', [Validators.required]]
      }, { validators: passwordsMatch })
    });
  }

  submit(): void {
    this.serverMsg = '';
    this.successMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const { name, email, passwordGroup } = this.form.value;

    const result = this.auth.register({
      name,
      email,
      pass: passwordGroup.pass
    });

    if (!result.ok) {
      this.serverMsg = result.msg ?? 'Error al registrar usuario.';
      return;
    }

    this.successMsg = 'Cuenta creada correctamente. Ahora puedes iniciar sesión.';
    setTimeout(() => this.router.navigateByUrl('/login'), 1500);
  }

  // Getters para HTML
  get name() { return this.form.get('name'); }
  get email() { return this.form.get('email'); }
  get passwordGroup() { return this.form.get('passwordGroup'); }
  get pass() { return this.passwordGroup?.get('pass'); }
  get confirmPass() { return this.passwordGroup?.get('confirmPass'); }
}
