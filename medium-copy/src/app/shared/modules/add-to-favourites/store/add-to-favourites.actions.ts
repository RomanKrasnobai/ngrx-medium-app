import {createAction, props} from '@ngrx/store';
import {ActionTypes} from './actionTypes';
import {ArticleInterface} from '../../../types/article.interface';

export const addToFavouritesAction = createAction(
  ActionTypes.ADD_TO_FAVOURITES,
  props<{ isFavourited: boolean, slug: string }>()
);

export const addToFavouritesSuccessAction = createAction(
  ActionTypes.ADD_TO_FAVOURITES_SUCCESS,
  props<{ article: ArticleInterface }>()
);

export const addToFavouritesFailureAction = createAction(
  ActionTypes.ADD_TO_FAVOURITES_FAILURE,
);
