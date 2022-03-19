import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { SingleDishComponent } from 'src/app/shared/single-dish/single-dish.component';
import { CategoryComponent } from './category/category.component';
import { DishesComponent } from './dishes/dishes.component';
import { MenuRoutingModule } from './menu-routing.module';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { CounterComponent } from 'src/app/shared/counter/counter.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModule } from 'src/app/shared/shared.module';



@NgModule({
    declarations: [
      CategoryComponent,
      DishesComponent,
      
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    MenuRoutingModule,
    HttpClientModule,
    SharedModule
  ],
  exports:[DishesComponent, CategoryComponent]
})
export class MenuModule { }
