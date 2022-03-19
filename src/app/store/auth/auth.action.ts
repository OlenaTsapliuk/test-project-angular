import { createAction, props } from '@ngrx/store';

 
export const loginRequest = createAction(
  '[Auth] Login request',
  props<{ credentials: {email:string, password:string} }>()
);

export const loginSuccess = createAction(
  '[Auth] Login success',
  props<{ loginSuccessResponse: any }>()
);

export const loginFail = createAction(
  '[Auth] Login fail',
  props<{ error:string }>()
);


export const checkAuthComplete = createAction(
  '[Auth] checkAuthComplete',
  props<{ isLoggedIn: boolean }>()
);

export const logout = createAction('[Auth] logout');
export const logoutComplete = createAction('[Auth] logoutComplete');



