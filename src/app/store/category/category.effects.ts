import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, map, tap, exhaustMap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { CategoriesService } from "src/app/services/categories.service";
import * as CategoryActions from './category.action';


@Injectable()

export class CategoriesEffects {

    categoryRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(CategoryActions.categoryRequest),
        exhaustMap((action) => {
            return this.categoryService
            .getCategories()
            .pipe(
                map((categories) => {
                    return CategoryActions.categorySuccess({ categories })
                }
                ),
                catchError((error) => of(CategoryActions.categoryFail({ error })))
                )
            }
      )
    )
    );
    




    constructor( private actions$: Actions, private categoryService: CategoriesService,private router: Router){}
}

