export type UserRole = 'admin' | 'cliente';

export interface User {
  id: string;
  name: string;
  email: string;
  pass: string;      // Solo FrontEnd / localStorage
  role: UserRole;
}