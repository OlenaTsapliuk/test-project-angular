import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, map, Observable, of } from 'rxjs';
import { environment } from 'src/environments/environment';
import { FullDish } from '../models/dishes.interface';
import { Order } from '../models/orders.interface';
import { User } from '../models/user.interface';

@Injectable({
  providedIn: 'root'
})
  
export class OrderService {
  public user!: User;
  public dish!: FullDish;
  public orders: Order[] = [];

  constructor(private http: HttpClient ) { }

  
  public addOrders(order: Order): Observable<Order> {
    
    return this.http.post<Order>(`${environment.API_URL}orders`, order).pipe(
      map((res) => {
        return res;
      })
    )
  };

  private handleError<T>(operation = 'operation', result?: T) {
  return (error: any): Observable<T> => {
    console.error(error); // log to console instead
    return of(result as T);
  };
  }
  
  public getOrders(): Observable<Order[]> { 
    return this.http.get<Order[]>(environment.API_URL + 'orders').pipe(
      catchError(this.handleError<Order[]>('getOrders', []))
    );;
  }

  public deleteOrder(id:string): Observable<boolean>{
    return this.http.delete<boolean>(`${environment.API_URL}orders/${id}`).pipe(
    catchError(this.handleError<boolean>('deleteOrder'))
  );
  }

  
}


