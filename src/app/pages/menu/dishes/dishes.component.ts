import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { Dish } from 'src/app/models/dishes.interface';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { DishesService } from 'src/app/services/dishes.service';
import { combineLatest, Observable, Subject, takeUntil } from 'rxjs';
import { Store } from '@ngrx/store';
import *as DishesAction from '../../../store/dish/dish.action'
import * as fromDishes from '../../../store/dish/dish.selector';


@Component({
  selector: 'app-dishes',
  templateUrl: './dishes.component.html',
  styleUrls: ['./dishes.component.scss']
})
export class DishesComponent implements OnInit, OnDestroy {
  @ViewChild('modal', {static: true}) modal!: ModalComponent;
  public dishes:Dish[]=[];
  public selectedDish!: Dish;
 
  public dishesFromStore!: Dish[];
  selectDishes$: Observable<Dish[] | null> = this.store.select(fromDishes.selectDish);
 


  constructor(private activatedRoute: ActivatedRoute, private dishesService: DishesService,
  private store: Store) {

   }
  notifier = new Subject();
  
  ngOnInit(): void {
console.log(this.selectDishes$);

    this.getData();

  }

  ngOnDestroy(): void {
    takeUntil(this.notifier)
  }
  
  
  getData() {
    this.store.dispatch(DishesAction.dishRequest());
    this.selectDishes$.subscribe((data) => {
      if(data)
        this.dishesFromStore = data;

    })

    combineLatest([
      this.selectDishes$,
      this.activatedRoute.params
    ])
      .pipe(takeUntil(this.notifier))
      .subscribe(([dishes, params]) => {
        this.dishes = dishes ? params['id'] ? dishes.filter(
          (dish) => dish.category?.includes(params['id'])
        ) : dishes : [];
      });
    
  }

  selectDish(dish: Dish): void { 
    this.selectedDish = dish;
    this.modal.showModal();
  }

}

// export const uploadedDish = ( state: AppState) => state.dishState;
// export const uploadedCategories = ( state: AppState) => state.categoryState;

// export const filteredDish = createSelector(
//   uploadedDish,
//   uploadedCategories,
//   (uploadedDish: DishState, uploadedCategories: CategoryState, props: string) => {
//     console.log(uploadedDish, uploadedCategories);
    
//     const idForFilter = uploadedCategories.category.find((category: Category) => category.url === props)?.id || '';
//     return uploadedDish.dish.filter((dish: Dish) => dish.category.includes(idForFilter));
//   }
// );