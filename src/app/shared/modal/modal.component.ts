import { AfterViewInit, Component, HostListener, Input, OnDestroy, OnInit,ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { Dish, FullDish} from 'src/app/models/dishes.interface';
import { BasketService } from 'src/app/services/basket.service';
import { CounterComponent } from '../counter/counter.component';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.scss']
})
export class ModalComponent {
  @Input() dish!: Dish;
  public count: number = 1;
  @HostListener('window:keydown', ['$event'])
   onKeyDownHandler(event: KeyboardEvent) {

    if (event.key === 'Escape') {
      this.hideModal();
    }
  }

  public shown: boolean = false

  constructor(private basketService: BasketService) { }

  public showModal() { 
    this.shown = true;
  }

  public hideModal() { 
    this.shown = false;
  }
  
  addCart() {
    const dish: FullDish = {
      ...this.dish,
      count: this.count
    };
    this.basketService.addToBasket(dish);
    this.count = 1;
    this.hideModal();
   
  }
  
  
 }

 
  


