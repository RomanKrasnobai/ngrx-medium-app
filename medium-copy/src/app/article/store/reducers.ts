import {ArticleStateInterface} from '../types/article-state.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from './actions/get-article.action';
import {routerNavigatedAction} from '@ngrx/router-store';

const initState: ArticleStateInterface = {
  isLoading: false,
  error: null,
  data: null
};

const articleReducer = createReducer(
  initState,
  on(getArticleAction, (state): ArticleStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getArticleSuccessAction, (state, action): ArticleStateInterface => ({
    ...state,
    isLoading: false,
    data: action.article
  })),
  on(getArticleFailureAction, (state): ArticleStateInterface => ({
    ...state,
    isLoading: false
  })),
  on(routerNavigatedAction, (state): ArticleStateInterface => ({
    ...state,
    isLoading: true,
    data: null
  }))
);

export function reducers(state: ArticleStateInterface, action: Action) {
  return articleReducer(state, action);
}
