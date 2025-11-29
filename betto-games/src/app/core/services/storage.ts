import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Storage {
  // Lee desde localStorage y parsea JSON
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : fallback;
    } catch (e) {
      console.error('Error en el servicio de Storage', e);
      return fallback;
    }
  }

  // Guarda en localStorage como JSON
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
