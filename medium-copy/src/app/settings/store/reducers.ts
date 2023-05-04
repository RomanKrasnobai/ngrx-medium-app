import {SettingsStateInterface} from '../types/settings-state.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  updateCurrentUserAction, updateCurrentUserFailureAction,
  updateCurrentUserSuccessAction
} from '../../auth/store/actions/update-current-user.actions';

const initState: SettingsStateInterface = {
  isSubmitting: false,
  validationErrors: null
};

const settingsReducer = createReducer(
  initState,
  on(updateCurrentUserAction, (state): SettingsStateInterface => ({
    ...state,
    isSubmitting: true
  })),
  on(updateCurrentUserSuccessAction, (state): SettingsStateInterface => ({
    ...state,
    isSubmitting: false,
  })),
  on(updateCurrentUserFailureAction, (state, action) => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  }))
);

export function reducers(state: SettingsStateInterface, action: Action) {
  return settingsReducer(state, action);
}
