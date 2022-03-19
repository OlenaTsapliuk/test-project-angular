import { createReducer, on, Action } from '@ngrx/store';
import * as categoryActions from './category.action';
import { Category } from 'src/app/models/category.interface';



export interface CategoryState {
  categories: Category[] | null,
}


export const initialCategoryState: CategoryState = {
    categories:null,
    
};

export const categoryReducerInternal = createReducer(
    initialCategoryState,
  on(categoryActions.categoryRequest, (state) => {
  
    return {
      ...state
    };
    }),
  on(categoryActions.categorySuccess, (state, { categories }) => {

    return {
      ...state,
      categories  
    };
   }),
 
);
export function categoryReducer(state: CategoryState | undefined, action: Action) {
  return categoryReducerInternal(state, action);
}