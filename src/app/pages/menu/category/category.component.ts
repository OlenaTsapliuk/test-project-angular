import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/models/category.interface';
import *as CategoriesActions from '../../../store/category/category.action';
import *as fromCategories from '../../../store/category/category.selector';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {
  public selectCategories$ = this.store.select(fromCategories.selectCategory);
  
  constructor(private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.categoryRequest())
  }

}

