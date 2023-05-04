import {createFeatureSelector, createSelector} from '@ngrx/store';
import {AppStateInterface} from '../../shared/types/app-state.interface';
import {ArticleStateInterface} from '../types/article-state.interface';

export const articleFeatureSelectors =
  createFeatureSelector<AppStateInterface, ArticleStateInterface>('article');

export const isLoadingSelector = createSelector(
  articleFeatureSelectors,
  (articleState: ArticleStateInterface) => articleState.isLoading
);

export const errorSelector = createSelector(
  articleFeatureSelectors,
  (articleState: ArticleStateInterface) => articleState.error
);

export const articleSelector = createSelector(
  articleFeatureSelectors,
  (articleState: ArticleStateInterface) => articleState.data
);
