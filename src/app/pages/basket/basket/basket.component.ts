import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { mergeMap, Subscription, take } from 'rxjs';
import { Basket } from 'src/app/models/basket.interface';
import { FullDish } from 'src/app/models/dishes.interface';
import { Order } from 'src/app/models/orders.interface';
import { User } from 'src/app/models/user.interface';
import { AuthService } from 'src/app/services/auth.service';
import { BasketService } from 'src/app/services/basket.service';
import { OrderService } from 'src/app/services/order.service';
import { v4 as uuid } from 'uuid';

@Component({
  selector: 'app-basket',
  templateUrl: './basket.component.html',
  styleUrls: ['./basket.component.scss']
})
export class BasketComponent implements OnInit, OnDestroy {
  public basketList!: Basket;
  public subscription!: Subscription;
  public show: boolean = false;
  public shoppingCartForm!: FormGroup;
  public user!: User;
  public dish!: FullDish;

  constructor(private basketService: BasketService, private fb: FormBuilder,
    private authService: AuthService, private orderService: OrderService, private router: Router) { }
  
  ngOnInit(): void {

    this.subscription = this.basketService.basketSub$.pipe(take(1)).subscribe(data => {
      this.basketList = data;
    })
    
    this.initForm();
    this.user = this.authService.getFromLocalStorage(); 
  }

  initForm() {

    this.shoppingCartForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      tel: ['', [Validators.required]],
      address: ['', [Validators.required]]
    });
  
    this.shoppingCartForm.patchValue(this.authService.getFromLocalStorage())
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  deleteFromBasket(id: string) {
    this.basketService.deleteDish(id);
    this.basketService.calcCountInBasket();

  }

  editTotalPrice() {
    this.basketService.calcCountInBasket();
    this.basketService.calcTotalPrice();
  }

  toggleButton() {
  this.show = !this.show
  }

  addOrdersToDb() {
  
    this.user = {...this.user, ...this.shoppingCartForm.value }
    this.authService.updateUser(this.user).pipe(
      take(1),
      mergeMap(() => {
      const order: Order = {
      id: uuid(),
      userName:this.user.name,
      userEmail: this.user.email,
      userAddress: this.user.address,
      userTel:this.user.tel,
      positions: this.basketList.dishes,
      calcTotalPrice:this.basketList.totalPrice
    };
    return this.orderService.addOrders(order)
      }
      )).subscribe(() => {
     
      this.router.navigate(['/']);
        this.authService.setToLocalStorage(this.user);
        this.basketService.resetBasket();
    });

  }
  

}