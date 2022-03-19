import { createAction, props } from "@ngrx/store";
import { Dish } from "src/app/models/dishes.interface";

export const dishRequest = createAction(
  '[Dish] Dish request',
);

export const dishSuccess = createAction(
  '[Dish] Dish request',
  props<{dishes: Dish[]}>()
);
export const dishFail = createAction(
  '[Dish] Dish fail',
  props<{ error:string }>()
);