import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CounterComponent } from './counter/counter.component';
import { ModalComponent } from './modal/modal.component';
import { SingleDishComponent } from './single-dish/single-dish.component';


@NgModule({
  declarations: [
      SingleDishComponent,
      ModalComponent,
      CounterComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
  ],
  exports:[SingleDishComponent, ModalComponent, CounterComponent]
})
export class SharedModule { }
