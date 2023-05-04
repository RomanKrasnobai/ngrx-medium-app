import {UserProfileStateInterface} from '../types/user-profile-state.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  getUserProfileAction,
  getUserProfileFailureAction,
  getUserProfileSuccessAction
} from './get-user-profile.actions';

const initState: UserProfileStateInterface = {
  isLoading: false,
  data: null,
  error: null
};

const userProfileReducer = createReducer(
  initState,
  on(getUserProfileAction, (state): UserProfileStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getUserProfileSuccessAction, (state, action): UserProfileStateInterface => ({
    ...state,
    isLoading: false,
    data: action.userProfile
  })),
  on(getUserProfileFailureAction, (state): UserProfileStateInterface => ({
    ...state,
    isLoading: false
  })),
);

export function reducers(state: UserProfileStateInterface, action: Action) {
  return userProfileReducer(state, action);
}
