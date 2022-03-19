import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasketComponent } from './pages/basket/basket/basket.component';
import {RegisterComponent } from './pages/register/register.component';
import { CategoryComponent } from './pages/menu/category/category.component';
import { LoginComponent } from './pages/login/login.component';
import { AuthGuard } from './services/auth.guard';
import { LogoutComponent } from './pages/logout/logout.component';
import { AdminComponent } from './pages/admin/admin.component';
import { AdminGuard } from './services/admin.guard';

const routes: Routes = [
  {
    path: 'categories',
    loadChildren: () => import('./pages/menu/menu.module').then((m) => m.MenuModule),
    canActivate: [AuthGuard]
  },
  {
    path: 'basket',
    component: BasketComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
   {
    path: 'login',
     component: LoginComponent,
    
  },
   {
    path: 'logout',
     component: LogoutComponent,
    
  },
  {
    path: 'admin',
    loadChildren: () => import('./pages/admin/admin.module').then((m) => m.AdminModule),
    canActivate: [AdminGuard]
    
  },
   
   {
    path: '',
    pathMatch: 'full',
    redirectTo: 'categories'
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
