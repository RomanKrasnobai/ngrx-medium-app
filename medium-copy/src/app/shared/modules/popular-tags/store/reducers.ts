import {PopularTagsStateInterface} from '../types/popular-tags-state.interface';
import {Action, createReducer, on} from '@ngrx/store';
import {
  getPopularTagsAction,
  getPopularTagsFailureAction,
  getPopularTagsSuccessAction
} from './actions/popular-tags.actions';


const initState: PopularTagsStateInterface = {
  isLoading: false,
  error: null,
  data: null,
};

const popularTagsReducer = createReducer(
  initState,
  on(getPopularTagsAction, (state): PopularTagsStateInterface => ({
    ...state,
    isLoading: true
  })),
  on(getPopularTagsSuccessAction, (state, action): PopularTagsStateInterface => ({
      ...state,
      isLoading: false,
      data: action.popularTags
    })),
  on(
    getPopularTagsFailureAction, (state): PopularTagsStateInterface => ({
      ...state,
      isLoading: false
    })
  )
);

export function reducers(state: PopularTagsStateInterface, action: Action) {
  return popularTagsReducer(state, action);
}
