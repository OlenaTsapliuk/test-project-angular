import { createAction, props } from '@ngrx/store';
import { UserType } from 'src/app/models/user.interface';

 
export const registerRequest = createAction(
  '[Auth] Register request',
  props<{ credentials: {email:string, password:string, name:string, type:UserType} }>()
);

export const registerSuccess = createAction(
  '[Auth] Register success',
  props<{ registerSuccessResponse: any }>()
);

export const registerFail = createAction(
  '[Auth] Register fail',
  props<{ error:string }>()
);

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



