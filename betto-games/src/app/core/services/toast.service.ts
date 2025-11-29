import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface ToastMessage {
  text: string;
  type: 'success' | 'error' | 'info' | 'warning';
  duration?: number; // ms
}

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  private toast$ = new BehaviorSubject<ToastMessage | null>(null);

  toastChanges() {
    return this.toast$.asObservable();
  }

  show(text: string, type: ToastMessage['type'] = 'info', duration = 3000) {
    this.toast$.next({ text, type, duration });

    setTimeout(() => {
      this.toast$.next(null);
    }, duration);
  }
}