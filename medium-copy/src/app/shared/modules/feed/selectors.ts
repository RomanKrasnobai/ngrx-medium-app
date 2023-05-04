import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../types/app-state.interface';
import {FeedStateInterface} from '../../../global-feed/types/feed-state.interface';

export const feedFeatureSelectors = createFeatureSelector<AppStateInterface, FeedStateInterface>('feed');

export const isLoadingSelector = createSelector(
  feedFeatureSelectors,
  (feedState: FeedStateInterface) => feedState.isLoading
);

export const errorSelector = createSelector(
  feedFeatureSelectors,
  (feedState: FeedStateInterface) => feedState.error
);

export const feedSelector = createSelector(
  feedFeatureSelectors,
  (feedState: FeedStateInterface) => feedState.data
);
