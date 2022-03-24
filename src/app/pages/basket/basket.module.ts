import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BasketComponent } from './basket/basket.component';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [
    BasketComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    SharedModule,
    ReactiveFormsModule
  ],
   exports:[BasketComponent]
})
export class BasketModule { }
