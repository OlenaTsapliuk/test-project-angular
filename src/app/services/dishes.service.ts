import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Dish } from '../models/dishes.interface';

@Injectable({
  providedIn: 'root'
})
export class DishesService {

  constructor(private http: HttpClient) { }

  public getDishes() { 
    return this.http.get<Dish[]>(environment.API_URL + 'dishes');
  }
  
   public addDish(dish:Dish):Observable<Dish> { 
       
    return this.http.post<Dish>(environment.API_URL + 'dishes',dish);
  } 
  
  public editDish( dish: Dish): Observable<Dish> { 
       
    return this.http.put<Dish>(`${environment.API_URL}dishes/${dish.id}`, dish);
  } 
}
