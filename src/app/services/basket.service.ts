import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { Basket } from '../models/basket.interface';
import { Dish, FullDish } from '../models/dishes.interface';

@Injectable({
  providedIn: 'root'
})
export class BasketService {
  private basket: Basket = {
    dishes: [],
    totalPrice: 0,
    calcCount:0
  };
  public basketService$ = new BehaviorSubject<Basket>(this.basket);

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
    this.basketService$.next(this.basket);
  }
  
  calcTotalPrice() {
    this.basket.totalPrice = this.basket.dishes.reduce((total, {count,price}) => {
      return total+(count*price)
    }, 0)
  }
  
  deleteDish(id:string) {
    this.basket.dishes = this.basket.dishes.filter(item => item.id !== id);
    
    this.calcTotalPrice();
    
    this.basketService$.next(this.basket);
  
  }


  addDish(id: string) {
    
    for (let dish of this.basket.dishes) {
      if (dish.id === id) {
        dish.count += 1;
      }
    }

    this.calcTotalPrice();
    this.basketService$.next(this.basket);
    
  }

  calcCountInBasket() {

    this.basket.calcCount = this.basket.dishes.reduce((total, { count })=> {
      return total + count
      
    }, 0)
    this.basketService$.next(this.basket);
    console.log(this.basket)
  }

  resetBasket() {
    this.basket={
    dishes: [],
    totalPrice: 0,
    calcCount:0
  }
    this.basketService$.next(this.basket);
  }
  

}

