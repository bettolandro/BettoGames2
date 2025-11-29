import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Storage } from './storage';
import { User } from '../../models/user';

export interface SessionInfo {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'cliente';
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private readonly SESSION_KEY = 'session';
  private readonly USERS_KEY = 'users';

  private session$ = new BehaviorSubject<SessionInfo | null>(null);

  constructor(private storage: Storage) {
    const storedSession = this.storage.get<SessionInfo | null>(this.SESSION_KEY, null);
    if (storedSession) this.session$.next(storedSession);

    const users = this.storage.get<User[]>(this.USERS_KEY, []);
    if (users.length === 0) {
      this.storage.set<User[]>(this.USERS_KEY, [
        {
          id: crypto.randomUUID(),
          name: 'Admin Betto',
          email: 'admin@vg.cl',
          pass: 'Admin123!',
          role: 'admin'
        },
        {
          id: crypto.randomUUID(),
          name: 'Gamer Demo',
          email: 'gamer@vg.cl',
          pass: 'Gamer123!',
          role: 'cliente'
        }
      ]);
    }
  }

  sessionChanges(): Observable<SessionInfo | null> {
    return this.session$.asObservable();
  }

  me(): SessionInfo | null {
    return this.session$.value;
  }

  isLogged(): boolean {
    return !!this.session$.value;
  }

  isAdmin(): boolean {
    return this.session$.value?.role === 'admin';
  }

  login(email: string, pass: string): { ok: boolean; msg?: string } {
    const users = this.storage.get<User[]>(this.USERS_KEY, []);
    const user = users.find(
      u => u.email.toLowerCase() === email.toLowerCase() && u.pass === pass
    );

    if (!user) return { ok: false, msg: 'Credenciales inválidas' };

    const session: SessionInfo = {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role
    };

    this.storage.set(this.SESSION_KEY, session);
    this.session$.next(session);

    return { ok: true };
  }

  logout(): void {
    this.storage.set(this.SESSION_KEY, null);
    this.session$.next(null);
  }

  register(user: Omit<User, 'id' | 'role'> & { role?: 'admin' | 'cliente' }): { ok: boolean; msg?: string } {
    const users = this.storage.get<User[]>(this.USERS_KEY, []);
    if (users.some(u => u.email.toLowerCase() === user.email.toLowerCase())) {
      return { ok: false, msg: 'El email ya está registrado' };
    }

    const newUser: User = {
      id: crypto.randomUUID(),
      name: user.name,
      email: user.email,
      pass: user.pass,
      role: user.role ?? 'cliente'
    };

    users.push(newUser);
    this.storage.set(this.USERS_KEY, users);

    return { ok: true };
  }

  // ACTUALIZAR PERFIL
  updateProfile(id: string, data: Partial<Omit<User, 'id' | 'role'>>): void {
    const users = this.storage.get<User[]>(this.USERS_KEY, []);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return;

    users[idx] = { ...users[idx], ...data };
    this.storage.set(this.USERS_KEY, users);

    // Actualizar sesión activa
    const updated = users[idx];
    this.session$.next({
      id: updated.id,
      name: updated.name,
      email: updated.email,
      role: updated.role
    });
    this.storage.set(this.SESSION_KEY, this.session$.value);
  }

  // CAMBIAR CONTRASEÑA
  changePassword(id: string, oldPass: string, newPass: string): { ok: boolean; msg?: string } {
    const users = this.storage.get<User[]>(this.USERS_KEY, []);
    const idx = users.findIndex(u => u.id === id);
    if (idx === -1) return { ok: false, msg: 'Usuario no encontrado' };

    if (users[idx].pass !== oldPass) {
      return { ok: false, msg: 'La contraseña actual es incorrecta' };
    }

    users[idx].pass = newPass;
    this.storage.set(this.USERS_KEY, users);

    return { ok: true };
  }
}