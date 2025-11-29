import { Routes } from '@angular/router';
import { Catalog } from './pages/catalog/catalog';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Profile } from './pages/profile/profile';
import { CartService } from './core/services/cart';
import { AdminProducts } from './pages/admin-products/admin-products';
import { OrderHistory } from './pages/order-history/order-history';



export const routes: Routes = [
  { path: '', component: Catalog },
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },
  { path: 'profile', component: Profile },
  { path: 'cart', component: CartService },
  { path: 'admin', component: AdminProducts },
  { path: 'orders', component: OrderHistory },
  { path: '**', redirectTo: '' }
];