import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/app-state.interface';
import {AuthStateInterface} from '../types/auth-state.interface';

export const authFeatureSelectors =
  createFeatureSelector<AppStateInterface, AuthStateInterface>('auth');

export const isSubmittingSelector =
  createSelector(authFeatureSelectors, (authState: AuthStateInterface) => authState.isSubmitting);

export const validationErrorsSelector =
  createSelector(authFeatureSelectors, (authState: AuthStateInterface) => authState.validationErrors);

export const isLoggedInSelector = createSelector(authFeatureSelectors,
  (authState: AuthStateInterface) => authState.isLoggedIn);

export const isAnonymousSelector = createSelector(authFeatureSelectors,
  (authState: AuthStateInterface) => authState.isLoggedIn === false);

export const currentUserSelector = createSelector(authFeatureSelectors,
  (authState: AuthStateInterface) => authState.currentUser);
