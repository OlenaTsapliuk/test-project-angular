import { createReducer, on, Action } from '@ngrx/store';
import * as dishActions from './dish.action';
import { Dish } from 'src/app/models/dishes.interface';



export interface DishState {
  dishes: Dish[] | null,
}


export const initialDishState: DishState = {
    dishes :null,
};

export const dishReducerInternal = createReducer(
    initialDishState,
  on(dishActions.dishRequest, (state) => {
  
    return {
      ...state
    };
    }),
  on(dishActions.dishSuccess, (state, { dishes }) => {
    return {
      ...state,
      dishes
    };
   }),
 
);
export function dishReducer(state: DishState | undefined, action: Action) {
  return dishReducerInternal(state, action);
}