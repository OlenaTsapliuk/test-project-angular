import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute} from '@angular/router';
import { Dish } from 'src/app/models/dishes.interface';
import { ModalComponent } from 'src/app/shared/modal/modal.component';
import { combineLatest, Observable, Subject, take, takeUntil } from 'rxjs';
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
  public selectDishes$: Observable<Dish[] | null> = this.store.select(fromDishes.selectDish);
  public notifier = new Subject();

  constructor(private activatedRoute: ActivatedRoute, private store: Store) {
  }
  
  ngOnInit(): void {
    this.getData();
  }

  ngOnDestroy(): void {
    this.notifier.complete();
  }

  getData() {
    this.store.dispatch(DishesAction.dishRequest());
    this.selectDishes$.pipe(take(1)).subscribe((data) => {
      if(data)
        this.dishesFromStore = data;
    })

    combineLatest([
      this.selectDishes$,
      this.activatedRoute.params
    ])
      .pipe(takeUntil(this.notifier))
      .subscribe(([dishes, params]) => {
        this.dishes = dishes ? params['id'] ? dishes.filter((dish) => dish.category?.includes(params['id'])) : dishes : [];
      });
    
  }

  selectDish(dish: Dish): void { 
    this.selectedDish = dish;
    this.modal.showModal();
  }

}

