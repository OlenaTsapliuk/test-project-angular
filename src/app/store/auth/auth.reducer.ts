import { createReducer, on, Action } from '@ngrx/store';
import * as authActions from './auth.action';
import { User } from "src/app/models/user.interface";



export interface AuthState {
  token:string,
  user: User | null,
  loginError?: string,
  
  
}

export const initialAuthState: AuthState = {
    token:'',
    user: null,
    
};

export const authReducerInternal = createReducer(
    initialAuthState,
  on(authActions.loginSuccess, (state, { loginSuccessResponse }) => {
   
    return {
      ...state,
      user:loginSuccessResponse.user,
      token: loginSuccessResponse.token,
    
    };
    }),
  on(authActions.loginFail, (state, { error }) => {

    return {
      ...state,
      loginError:error,
      user:null,
      token: '',
    
    };
  }),
   on(authActions.registerSuccess, (state, { registerSuccessResponse }) => {
   
    return {
      ...state,
      user:registerSuccessResponse.user,
      token: registerSuccessResponse.token,
    
    };
    }),
  on(authActions.registerFail, (state, { error }) => {

    return {
      ...state,
      registerError:error,
      user:null,
      token: '',
    
    };
   }),
 
);

export function authReducer(state: AuthState | undefined, action: Action) {
  return authReducerInternal(state, action);
}