import { Component, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../models/basket.interface';
import { AuthService } from '../services/auth.service';
import { BasketService } from '../services/basket.service';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  public basket$: BehaviorSubject<Basket>;
  public isLoginStatus$: BehaviorSubject<boolean>;
  constructor( private basketService: BasketService, private authService: AuthService ) {
    this.basket$ = this.basketService.basketSub$;
    this.isLoginStatus$ = this.authService.isLoggedIn$;
  
  }
  

  ngOnInit(): void {
   
  }

  
}
