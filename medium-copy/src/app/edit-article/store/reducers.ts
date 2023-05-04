import {EditArticleStateInterface} from '../types/edit-article-state.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  updateArticleAction,
  updateArticleFailureAction,
  updateArticleSuccessAction
} from './actions/edit-article.actions';
import {getArticleAction, getArticleFailureAction, getArticleSuccessAction} from './actions/get-article.actions';

const initState: EditArticleStateInterface = {
  isLoading: false,
  isSubmitting: false,
  article: null,
  validationErrors: null
};

const editArticleReducer = createReducer(
  initState,
  on(updateArticleAction, (state): EditArticleStateInterface => ({
    ...state,
    isSubmitting: true
  })),
  on(updateArticleSuccessAction, (state, action): EditArticleStateInterface => ({
    ...state,
    isSubmitting: false,
    article: action.article
  })),
  on(updateArticleFailureAction, (state): EditArticleStateInterface => ({
    ...state,
    isSubmitting: false
  })),
  on(getArticleAction, (state): EditArticleStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getArticleSuccessAction, (state, action): EditArticleStateInterface => ({
    ...state,
    isLoading: false,
    article: action.article
  })),
  on(getArticleFailureAction, (state): EditArticleStateInterface => ({
    ...state,
    isLoading: false
  }))
);

export function reducers(state: EditArticleStateInterface, action: Action) {
  return editArticleReducer(state, action);
}
