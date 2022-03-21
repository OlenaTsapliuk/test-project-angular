import { identifierName } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import {  FormBuilder } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject, Subscription } from 'rxjs';
import { CategoriesType, categoriesListOption, Category } from 'src/app/models/category.interface';
import { AdminService } from 'src/app/services/admin.service';

import { CategoriesService } from 'src/app/services/categories.service';
import { DishesService } from 'src/app/services/dishes.service';

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
 
 


  
  constructor( private fb: FormBuilder,
   
    private router: Router,
    private adminService: AdminService,
    private categoriesService: CategoriesService,
    private dishesService:DishesService
  ) { 
   
  }
 

  ngOnInit(): void {

    
    
  }

  
  }
 

