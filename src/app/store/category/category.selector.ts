import { createFeatureSelector, createSelector } from '@ngrx/store';
import { CategoryState } from './category.reducer'; 

const categoryStateSelector = createFeatureSelector<CategoryState>('category');

export const selectCategory = createSelector(
 categoryStateSelector,
  (state) => state.categories
);
