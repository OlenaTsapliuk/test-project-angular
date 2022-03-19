import { createFeatureSelector, createSelector } from '@ngrx/store';
import { DishState } from './dish.reducer';

const categoryStateSelector = createFeatureSelector<DishState>('dish');

export const selectDish = createSelector(
 categoryStateSelector,
  (state) => { 
    return state.dishes
  }
  
);
