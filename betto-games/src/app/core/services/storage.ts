import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
/**
 * Servicio de abstracción sobre localStorage.
 * Centraliza el acceso al almacenamiento local permitiendo
 * serializar y deserializar objetos de forma segura.
 */
export class Storage {
  /**
   * Obtiene un valor desde el almacenamiento local.
   *
   * @param key Clave donde se guardó la información.
   * @param defaultValue Valor por defecto si la clave no existe.
   * @returns Valor almacenado o el valor por defecto.
   */
  get<T>(key: string, fallback: T): T {
    try {
      const raw = localStorage.getItem(key);
      return raw ? JSON.parse(raw) as T : fallback;
    } catch (e) {
      console.error('Error en el servicio de Storage', e);
      return fallback;
    }
  }

  /**
   * Almacena un valor en formato JSON en el almacenamiento local.
   *
   * @param key   Clave bajo la cual se guardará la información.
   * @param value Valor a serializar y guardar.
   */
  set<T>(key: string, value: T): void {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
