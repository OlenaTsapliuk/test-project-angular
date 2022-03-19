import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../models/basket.interface';
import { AuthService } from '../services/auth.service';
import { BasketService } from '../services/basket.service';
import { DishesService } from '../services/dishes.service';
import { CounterComponent } from '../shared/counter/counter.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public basket$: BehaviorSubject<Basket>;
  public isLoginStatus$: BehaviorSubject<boolean>;

  constructor(private router: Router, private basketService: BasketService, private authService: AuthService ) {
    this.basket$ = this.basketService.basketService$;
    this.isLoginStatus$ = this.authService.isLoggedIn$;

  }
  
  public number = 0;

  ngOnInit(): void {
   
  }

  
}
