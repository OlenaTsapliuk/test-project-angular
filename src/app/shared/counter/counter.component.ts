import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';


@Component({
  selector: 'app-counter',
  templateUrl: './counter.component.html',
  styleUrls: ['./counter.component.scss']
})
export class CounterComponent implements OnInit {
  @Input() counter = 1;
  @Output() counterChange = new EventEmitter<number>();

  constructor() { }

  ngOnInit(): void {
  }

  increment() {
    this.counter++;
    this.counterChange.emit(this.counter);
  }

  decrement() {
    if (this.counter > 1) this.counter--;
    this.counterChange.emit(this.counter);
  }

}
