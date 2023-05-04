import {CreateArticleStateInterface} from '../types/create-article-state.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  createArticleAction,
  createArticleFailureAction,
  createArticleSuccessAction
} from './actions/create-action.actions';

const initState: CreateArticleStateInterface = {
  isSubmitting: false,
  validationErrors: null
};

const createArticleReducer = createReducer(
  initState,
  on(createArticleAction, (state): CreateArticleStateInterface => ({
    ...state,
    isSubmitting: true
  })),
  on(createArticleSuccessAction, (state): CreateArticleStateInterface => ({
    ...state,
    isSubmitting: false
  })),
  on(createArticleFailureAction, (state, action): CreateArticleStateInterface => ({
    ...state,
    isSubmitting: false,
    validationErrors: action.errors
  }))
);

export function reducers(state: CreateArticleStateInterface, action: Action) {
  return createArticleReducer(state, action);
}
