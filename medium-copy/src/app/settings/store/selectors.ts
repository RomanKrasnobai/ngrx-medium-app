import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/app-state.interface';
import {SettingsStateInterface} from '../types/settings-state.interface';

export const settingsFeatureSelectors =
  createFeatureSelector<AppStateInterface, SettingsStateInterface>('settings');

export const isSubmittingSelector = createSelector(
  settingsFeatureSelectors, (settingsState: SettingsStateInterface) => settingsState.isSubmitting
);

export const validationErrorsSelector = createSelector(
  settingsFeatureSelectors, (settingsState: SettingsStateInterface) => settingsState.validationErrors
);
