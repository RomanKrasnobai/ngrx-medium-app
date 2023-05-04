import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../../types/app-state.interface';
import {PopularTagsStateInterface} from '../types/popular-tags-state.interface';


export const popularTagsFeatureSelectors =
  createFeatureSelector<AppStateInterface, PopularTagsStateInterface>('popularTags');

export const isLoadingSelector = createSelector(
  popularTagsFeatureSelectors,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.isLoading
);

export const errorSelector = createSelector(
  popularTagsFeatureSelectors,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.error
);

export const popularTagsSelector = createSelector(
  popularTagsFeatureSelectors,
  (popularTagsState: PopularTagsStateInterface) => popularTagsState.data
);
