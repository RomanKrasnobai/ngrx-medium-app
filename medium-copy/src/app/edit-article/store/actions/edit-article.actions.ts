import {createAction, props} from '@ngrx/store';
import {ActionTypes} from '../actionTypes';
// import {ArticleInputInterface} from '../../../shared/types/article-input.interface';
import {BackendErrorsInterface} from '../../../shared/types/backend-errors.interface';
import {ArticleInterface} from '../../../shared/types/article.interface';
import {GetArticleResponseInterface} from '../../../shared/types/get-article-response.interface';

export const updateArticleAction = createAction(
  ActionTypes.UPDATE_ARTICLE,
  props<{ slug: string, articleInput: GetArticleResponseInterface }>() // ArticleInputInterface
);

export const updateArticleSuccessAction = createAction(
  ActionTypes.UPDATE_ARTICLE_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const updateArticleFailureAction = createAction(
  ActionTypes.UPDATE_ARTICLE_FAILURE,
  props<{ errors: BackendErrorsInterface }>()
);
