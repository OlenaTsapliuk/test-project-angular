import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  public show: boolean = false;
  public showCategories: boolean = false;
  public showUsers: boolean = false;
  public showOrders: boolean = false;
 
 
  constructor() { }
 
  ngOnInit(): void {
 
  }

  
  }
 

