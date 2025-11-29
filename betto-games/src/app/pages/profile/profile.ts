import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AuthService, SessionInfo } from '../../core/services/auth';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
/**
 * Página de perfil del usuario.
 * Muestra información básica de la cuenta (nombre, correo y rol)
 * y ofrece accesos a las acciones de edición de perfil y cambio de clave.
 */
export class Profile implements OnInit {

  session: SessionInfo | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.session = this.auth.me();
  }
/**
   * Navega a la página de edición de perfil.
   */
  goToEdit(): void {
    this.router.navigateByUrl('/edit-profile');
  }
/**
   * Navega a la página de cambio de contraseña.
   */
  goToChangePass(): void {
    this.router.navigateByUrl('/change-password');
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
