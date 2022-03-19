import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, map, tap, exhaustMap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import { DishesService } from "src/app/services/dishes.service";
import * as DishActions from './dish.action';


@Injectable()

export class DishesEffects {

    categoryRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(DishActions.dishRequest),
        exhaustMap((action) => {
            return this.dishesService.getDishes()
            .pipe(
                map((dishes) => {
                    return DishActions.dishSuccess({ dishes })
                }
                ),
                catchError((error) => of(DishActions.dishFail({ error })))
                )
            }
      )
    )
    );
    




    constructor( private actions$: Actions, private dishesService: DishesService,private router: Router){}
}