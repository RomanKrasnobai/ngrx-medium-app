import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/app-state.interface';
import {UserProfileStateInterface} from '../types/user-profile-state.interface';

export const userProfileFeatureSelectors =
  createFeatureSelector<AppStateInterface, UserProfileStateInterface>('userProfile');

export const isLoadingSelector = createSelector(
  userProfileFeatureSelectors,
  (userProfileState: UserProfileStateInterface) => userProfileState.isLoading
);

export const errorSelector = createSelector(
  userProfileFeatureSelectors,
  (userProfileState: UserProfileStateInterface) => userProfileState.error
);

export const userProfileSelector = createSelector(
  userProfileFeatureSelectors,
  (userProfileState: UserProfileStateInterface) => userProfileState.data
);
