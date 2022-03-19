import { createFeatureSelector, createSelector } from '@ngrx/store';
import { AuthState } from './auth.reducer';

const authStateSelector = createFeatureSelector<AuthState>('auth');

export const selectToken = createSelector(
 authStateSelector,
  (state) => state.token
);

export const selectUser = createSelector(
 authStateSelector,
  (state) => state.user
);



