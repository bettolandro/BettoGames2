import { Routes } from '@angular/router';
import { Catalog } from './pages/catalog/catalog';
import { Login } from './pages/login/login';
import { Register } from './pages/register/register';
import { ForgotPassword } from './pages/forgot-password/forgot-password';
import { Profile } from './pages/profile/profile';
import { AdminProducts } from './pages/admin-products/admin-products';
import { OrderHistory } from './pages/order-history/order-history';
import { Cart } from './pages/cart/cart';
import { ProductDetail } from './pages/product-detail/product-detail';
import { EditProfile } from './pages/edit-profile/edit-profile';
import { ChangePassword } from './pages/change-password/change-password';



export const routes: Routes = [
  { path: '', component: Catalog },

  // Perfil
  { path: 'profile', component: Profile },
  { path: 'edit-profile', component: EditProfile },
  { path: 'change-password', component: ChangePassword },

  // Auth
  { path: 'login', component: Login },
  { path: 'register', component: Register },
  { path: 'forgot-password', component: ForgotPassword },

  // eCommerce
  { path: 'cart', component: Cart },
  { path: 'orders', component: OrderHistory },
  { path: 'product/:id', component: ProductDetail },

  // Admin
  { path: 'admin', component: AdminProducts },

  // 404
  { path: '**', redirectTo: '' }
];