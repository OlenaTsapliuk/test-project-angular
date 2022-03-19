import { Component, OnInit, Input,ViewChild } from '@angular/core';

import { Dish } from 'src/app/models/dishes.interface';
import { CounterComponent } from '../counter/counter.component';
import { ModalComponent } from '../modal/modal.component';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-single-dish',
  templateUrl: './single-dish.component.html',
  styleUrls: ['./single-dish.component.scss']
})
export class SingleDishComponent implements OnInit {

 

  @Input() dish: Dish = {
    id: '',
    name: "",
    description: "",
    price: 0,
    imageURL: '',
    ingredients: [],
    category: [],
  };

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }



}
