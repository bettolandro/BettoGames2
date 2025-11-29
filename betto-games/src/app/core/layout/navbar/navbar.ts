import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService, SessionInfo } from '../../services/auth';
import { Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule,FormsModule, RouterLinkActive],
  templateUrl: './navbar.html',
  styleUrl: './navbar.scss',
})
export class Navbar implements OnInit, OnDestroy{
session: SessionInfo | null = null;
  sub?: Subscription;

  constructor(private auth: AuthService) {}

  ngOnInit(): void {
    this.sub = this.auth.sessionChanges().subscribe(s => this.session = s);
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  logout(): void {
    this.auth.logout();
  }
}
