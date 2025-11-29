import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { AuthService, SessionInfo } from '../../core/services/auth';

@Component({
  selector: 'app-profile',
  imports: [CommonModule],
  templateUrl: './profile.html',
  styleUrl: './profile.scss',
})
export class Profile {
session: SessionInfo | null;

  constructor(private auth: AuthService) {
    this.session = this.auth.me();
  }
}
