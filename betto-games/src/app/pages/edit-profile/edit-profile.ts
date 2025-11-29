import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService, SessionInfo } from '../../core/services/auth';
import { Router, RouterLink } from '@angular/router';
import { ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-edit-profile',
  imports: [CommonModule, ReactiveFormsModule, RouterLink],
  templateUrl: './edit-profile.html',
  styleUrl: './edit-profile.scss',
})
export class EditProfile {

  form!: FormGroup;
  session: SessionInfo | null = null;

  // Para el mensaje que ya muestra tu HTML
  message = '';

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router,
    private toast: ToastService
  ) {
    // Obtenemos la sesión actual
    this.session = this.auth.me();

    // Si no hay sesión, redirigimos a login
    if (!this.session) {
      this.router.navigateByUrl('/login');
      return;
    }

    // Inicializamos el formulario con los datos actuales
    this.form = this.fb.group({
      name: [this.session.name, Validators.required],
      email: [
        this.session.email,
        [Validators.required, Validators.email]
      ]
    });
  }

  save(): void {
    if (!this.session) return;

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      this.toast.show('Revisa los campos del formulario.', 'warning');
      return;
    }

    const { name, email } = this.form.value;

    // Actualizamos en AuthService (debe tener el método updateProfile)
    this.auth.updateProfile(this.session.id, { name, email });

    // Refrescamos los datos locales
    this.session = this.auth.me();

    this.message = 'Perfil actualizado correctamente.';
    this.toast.show('Perfil actualizado correctamente.', 'success');
  }

  // Getters cómodos para el HTML
  get nameCtrl() {
    return this.form.get('name');
  }

  get emailCtrl() {
    return this.form.get('email');
  }
}
