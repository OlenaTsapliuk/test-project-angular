import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { BasketService } from 'src/app/services/basket.service';

@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() counter = 1;
  @Output() counterChange = new EventEmitter<number>();

  constructor(private basketService: BasketService) { }

  ngOnInit(): void {
  }

  // resetCounter() {
  //   this.counter = 1;
  //   console.log(this.counter);
  // }

  increment() {
    this.counter++;
    this.counterChange.emit(this.counter);
  }

  decrement() {
    if (this.counter > 1) this.counter--;
    this.counterChange.emit(this.counter);
  }

}
