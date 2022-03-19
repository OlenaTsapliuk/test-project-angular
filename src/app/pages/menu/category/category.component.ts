import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { Category } from 'src/app/models/category.interface';
import { CategoriesService } from 'src/app/services/categories.service';
import *as CategoriesActions from '../../../store/category/category.action';
import *as fromCategories from '../../../store/category/category.selector';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.scss']
})
export class CategoryComponent implements OnInit {

  categories = [];
  selectCategories$ = this.store.select(fromCategories.selectCategory);


  constructor(private activatedRoute: ActivatedRoute, private categoriesService: CategoriesService, private store: Store) { }

  ngOnInit(): void {
    this.store.dispatch(CategoriesActions.categoryRequest())
    
    // this.categoriesService.getCategories().subscribe((data) => {
    //   this.categories!=data;
    // })
    
  }

}

