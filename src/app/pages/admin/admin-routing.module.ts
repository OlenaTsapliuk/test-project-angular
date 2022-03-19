import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';
import { CategoriesReportsComponent } from './reports/categories-reports/categories-reports.component';
import { DishesReportsComponent } from './reports/dishes-reports/dishes-reports.component';
import { OrderReportsComponent } from './reports/order-reports/order-reports.component';
import { UserReportsComponent } from './reports/user-reports/user-reports.component';

const routes: Routes = [
  {
    path: 'orders',
    component: OrderReportsComponent,
    },
    {
    path: 'dishes',
    component: DishesReportsComponent,
    },
    {
    path: 'users',
    component: UserReportsComponent,
    },

    {
    path: 'categories',
    component: CategoriesReportsComponent,
    },

    {
    path: '',
    component: AdminComponent
    }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }