import { HttpClient } from '@angular/common/http';
import { isNgTemplate } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Basket } from '../models/basket.interface';
import { Dish, FullDish } from '../models/dishes.interface';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  public dish: Dish[] = [];

  constructor(private http: HttpClient) { }

   
    

    
}

