import { Injectable } from "@angular/core";
import { Router } from "@angular/router";
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, of, map, tap, exhaustMap } from "rxjs";
import { AuthService } from "src/app/services/auth.service";
import * as AuthActions from './auth.action';


@Injectable()

export class AuthEffects {


  constructor( private actions$: Actions, private authService: AuthService,private router: Router){}

  loginRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.loginRequest),
        exhaustMap((action) => {
            return this.authService
            .login(action.credentials.email, action.credentials.password)
            .pipe(
                map((loginSuccessResponse) => {
                    return AuthActions.loginSuccess({ loginSuccessResponse })
                }
                ),
                catchError((error) => of(AuthActions.loginFail({ error })))
                )
            }
      )
    )
    );
    
  loginSuccess$ = createEffect(
     () => {
         return this.actions$.pipe(
           ofType(AuthActions.loginSuccess),
           tap(({ loginSuccessResponse }) => {
             this.authService.setToLocalStorage(loginSuccessResponse)
             this.authService.setUserType(loginSuccessResponse.type)
             
             this.router.navigate(['/']);
           })
         )
    },
    { dispatch: false }
  );

  registerRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.registerRequest),
        exhaustMap((action) => {
          return this.authService
            .register(action.credentials)
            .pipe(
              map((registerSuccessResponse) => {
                return AuthActions.registerSuccess({ registerSuccessResponse })
              }
              ),
              catchError((error) => of(AuthActions.registerFail({ error })))
                )
            }
      )
    )
    );
    
 registerSuccess$ = createEffect(
     () => {
         return this.actions$.pipe(
           ofType(AuthActions.registerSuccess),
           tap(({ registerSuccessResponse }) => {
             this.authService.setToLocalStorage(registerSuccessResponse)
             this.authService.setUserType(registerSuccessResponse.type)
             this.router.navigate(['/']);
           })
         )
    },
    { dispatch: false }
  );

//      logout$ = createEffect(() =>
//     this.actions$.pipe(
//       ofType(AuthActions.logout),
//       tap(() => this.authService.isLoggedOut()),
//       map(() => AuthActions.logoutComplete())
//     )
//   );

//   logoutComplete$ = createEffect(
//     () =>
//       this.actions$.pipe(
//         ofType(AuthActions.logoutComplete),
//       ),
//     { dispatch: false }
//   );
 
}

