import { createAction, props } from "@ngrx/store";
import { Category } from "src/app/models/category.interface";


export const categoryRequest = createAction(
  '[Category] Category request',
);

export const categorySuccess = createAction(
  '[Category] Category request',
  props<{categories: Category[]}>()
);

export const categoryFail = createAction(
  '[Category] Category fail',
  props<{ error:string }>()
);