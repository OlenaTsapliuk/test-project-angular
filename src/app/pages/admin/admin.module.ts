import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { CounterComponent } from 'src/app/shared/counter/counter.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';
import { AdminComponent } from './admin.component';
import { AdminRoutingModule } from './admin-routing.module';
import { OrderReportsComponent } from './reports/order-reports/order-reports.component';
import { UserReportsComponent } from './reports/user-reports/user-reports.component';
import { CategoriesReportsComponent } from './reports/categories-reports/categories-reports.component';
import { DishesReportsComponent } from './reports/dishes-reports/dishes-reports.component';





@NgModule({
    declarations: [
    AdminComponent,
    OrderReportsComponent,
    UserReportsComponent,
    CategoriesReportsComponent,
    DishesReportsComponent
     
      
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    HttpClientModule,
    AdminRoutingModule,
    ReactiveFormsModule,
    SharedModule
  ],
  exports:[AdminComponent, OrderReportsComponent]
})
export class AdminModule { }
