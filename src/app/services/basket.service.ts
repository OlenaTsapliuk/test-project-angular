import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Basket } from '../models/basket.interface';
import { FullDish } from '../models/dishes.interface';

@Injectable({
  providedIn: 'root'
})
  
export class BasketService {
  private basket: Basket = {
    dishes: [],
    totalPrice: 0,
    calcCount:0
  };
  public basketSub$ = new BehaviorSubject<Basket>(this.basket);

  constructor() { }

  public addToBasket(dish: FullDish) { 
    const matchDish = this.basket.dishes.find(item => item.id === dish.id);
    if (matchDish) {
      this.basket.dishes = this.basket.dishes.map(item => ({
        ...item,
         count: item.id === dish.id ? dish.count + item.count : item.count
        }))
    }
    else {
      this.basket.dishes.push(dish);
    }
    this.calcTotalPrice();
    this.calcCountInBasket();
    this.basketSub$.next(this.basket);
  }
  
  public calcTotalPrice() {
    this.basket.totalPrice = this.basket.dishes.reduce((total, {count,price}) => {
      return total+(count*price)
    }, 0)
  }
  
  public deleteDish(id:string) {
    this.basket.dishes = this.basket.dishes.filter(item => item.id !== id);
    this.calcTotalPrice();
    this.basketSub$.next(this.basket);
  
  }

  public addDish(id: string) {
    
    for (let dish of this.basket.dishes) {
      if (dish.id === id) {
        dish.count += 1;
      }
    }
    this.calcTotalPrice();
    this.basketSub$.next(this.basket);
    
  }

  public calcCountInBasket() {
    this.basket.calcCount = this.basket.dishes.reduce((total, { count })=> {
      return total + count
    }, 0)
    this.basketSub$.next(this.basket);
  }

  public resetBasket() {
    this.basket={
    dishes: [],
    totalPrice: 0,
    calcCount:0
  }
    this.basketSub$.next(this.basket);
  }
  

}

