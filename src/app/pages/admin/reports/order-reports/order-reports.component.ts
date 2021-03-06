import { Component, OnInit } from '@angular/core';
import { Observable, take } from 'rxjs';
import { Order } from 'src/app/models/orders.interface';
import { OrderService } from 'src/app/services/order.service';

@Component({
  selector: 'app-order-reports',
  templateUrl: './order-reports.component.html',
  styleUrls: ['./order-reports.component.scss']
})
export class OrderReportsComponent implements OnInit {
  public orders: Order[] = [];
  public orderList2$ = new Observable<Order[]>();

  constructor(private orderService: OrderService) {
    this.orderList2$ = this.orderService.getOrders();
    
  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
  }

  deleteOrder(order: Order) {
    this.orders = this.orders.filter(o => o !== order);
    const deleteOrder = this.orderService.deleteOrder(order.id).pipe(take(1)).subscribe(() => {
    });
    this.orderList2$ = this.orderService.getOrders();
    
  }


}
