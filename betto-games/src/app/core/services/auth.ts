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
    if (storedSession) {
      this.session$.next(storedSession);
    }

    // Seed de usuarios demo si no existen (como en app.js)
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

    if (!user) {
      return { ok: false, msg: 'Credenciales inválidas' };
    }

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
    this.storage.set<SessionInfo | null>(this.SESSION_KEY, null);
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
}
