import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ToastMessage, ToastService } from '../../core/services/toast.service';

@Component({
  selector: 'app-toast.component',
  imports: [CommonModule],
  templateUrl: './toast.component.html',
  styleUrl: './toast.component.scss',
})
export class ToastComponent implements OnInit {

  message: ToastMessage | null = null;

  constructor(private toast: ToastService) {}

  ngOnInit(): void {
    this.toast.toastChanges().subscribe(msg => {
      this.message = msg;
    });
  }
}
