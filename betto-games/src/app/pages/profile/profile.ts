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
export class Profile implements OnInit {

  session: SessionInfo | null = null;

  constructor(
    private auth: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.session = this.auth.me();
  }

  goToEdit(): void {
    this.router.navigateByUrl('/edit-profile');
  }

  goToChangePass(): void {
    this.router.navigateByUrl('/change-password');
  }

  goToLogin(): void {
    this.router.navigateByUrl('/login');
  }
}
